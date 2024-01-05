package todo

import (
	"context"
	"io"
	"io/fs"
	"os"
	"path"
	"time"

	"github.com/murasame29/gql-todo-app/internal/graph/model"
	"github.com/murasame29/gql-todo-app/internal/models"
	"github.com/murasame29/gql-todo-app/internal/repository"
)

type todoService struct {
	repo repository.Todo
}

type TodoService interface {
	CreateTodo(ctx context.Context, arg *model.TodoInput) (*model.Todo, error)
	GetTodos(ctx context.Context, solved *bool, pageSize *int, pageID *int) ([]*model.Todo, error)
	GetTodoByID(ctx context.Context, todoID int) (*model.Todo, error)
	UpdateTodo(ctx context.Context, todoID int, arg *model.TodoUpdateInput) (*model.Todo, error)
}

func NewTodoService(repo repository.Todo) TodoService {
	return &todoService{
		repo: repo,
	}
}

func (t *todoService) CreateTodo(ctx context.Context, arg *model.TodoInput) (*model.Todo, error) {
	const (
		fileDirName string      = "images"
		filePerm    fs.FileMode = 0o666
	)

	// 画像の保存処理
	file, err := io.ReadAll(arg.Image.File)
	if err != nil {
		return nil, err
	}

	filePath := path.Join(fileDirName, arg.Image.Filename)
	if _, err := os.Create(filePath); err != nil {
		return nil, err
	}
	if err := os.WriteFile(filePath, file, filePerm); err != nil {
		return nil, err
	}
	pwd, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	image := path.Join(pwd, filePath)
	err = t.repo.Create(&models.Todo{
		Title:       arg.Title,
		Description: *arg.Description,
		Image:       image,
	})

	return &model.Todo{
		Title:       arg.Title,
		Description: arg.Description,
		Image:       &image,
		CreatedAt:   time.Now().String(),
		UpdatedAt:   time.Now().String(),
		IsSolved:    false,
		IsDeleted:   false,
	}, err
}

func (t *todoService) GetTodos(ctx context.Context, solved *bool, pageSize *int, pageID *int) ([]*model.Todo, error) {
	result, err := t.repo.ReadAll(*pageSize, *pageID)
	if err != nil {
		return nil, err
	}
	todos := make([]*model.Todo, len(result))
	for i, todo := range result {
		todos[i] = &model.Todo{
			TodoID:      todo.TodoID,
			Title:       todo.Title,
			Description: &todo.Description,
			Image:       &todo.Image,
			CreatedAt:   todo.CreatedAt.String(),
			UpdatedAt:   todo.UpdatedAt.String(),
			IsSolved:    todo.IsSolved,
			IsDeleted:   todo.IsDeleted,
		}
	}

	return todos, nil

}

func (t *todoService) GetTodoByID(ctx context.Context, todoID int) (*model.Todo, error) {
	todo, err := t.repo.ReadA(todoID)
	if err != nil {
		return nil, err
	}
	return &model.Todo{
		TodoID:      todo.TodoID,
		Title:       todo.Title,
		Description: &todo.Description,
		Image:       &todo.Image,
		CreatedAt:   todo.CreatedAt.String(),
		UpdatedAt:   todo.UpdatedAt.String(),
		IsSolved:    todo.IsSolved,
		IsDeleted:   todo.IsDeleted,
	}, nil
}
func (t *todoService) UpdateTodo(ctx context.Context, todoID int, arg *model.TodoUpdateInput) (*model.Todo, error) {
	const (
		fileDirName string      = "images"
		filePerm    fs.FileMode = 0o666
	)
	var (
		image string
		err   error
	)

	// idをもとに取得
	oldTodo, err := t.repo.ReadA(todoID)
	if err != nil {
		return nil, err
	}

	// 画像に更新があった場合画像の保存処理
	if arg.Image != nil {
		file, err := io.ReadAll(arg.Image.File)
		if err != nil {
			return nil, err
		}

		filePath := path.Join(fileDirName, arg.Image.Filename)
		if _, err := os.Create(filePath); err != nil {
			return nil, err
		}
		if err := os.WriteFile(filePath, file, filePerm); err != nil {
			return nil, err
		}
		pwd, err := os.Getwd()
		if err != nil {
			return nil, err
		}
		image = path.Join(pwd, filePath)
	} else {
		image = oldTodo.Image
	}

	err = t.repo.Update(&models.Todo{
		TodoID:      todoID,
		Title:       arg.Title,
		Description: *arg.Description,
		Image:       image,
		UpdatedAt:   time.Now(),
		IsSolved:    *arg.IsSolved,
	})

	return &model.Todo{
		Title:       arg.Title,
		Description: arg.Description,
		Image:       &image,
		CreatedAt:   oldTodo.CreatedAt.String(),
		UpdatedAt:   time.Now().String(),
		IsSolved:    *arg.IsSolved,
		IsDeleted:   oldTodo.IsDeleted,
	}, err
}
