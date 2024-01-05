package todo

import (
	"github.com/murasame29/gql-todo-app/internal/repository"
)

type todoService struct {
	repo repository.Todo
}

type TodoService interface {
}

func NewTodoService(repo repository.Todo) TodoService {
	return &todoService{
		repo: repo,
	}
}
