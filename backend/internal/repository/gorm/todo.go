package gorm

import (
	"github.com/murasame29/gql-todo-app/internal/models"
	"github.com/murasame29/gql-todo-app/internal/repository"
	"gorm.io/gorm"
)

type Todo struct {
	db *gorm.DB
}

func NewTodoRepository(db *gorm.DB) repository.Todo {
	return &Todo{
		db: db,
	}
}

func (t *Todo) Create(todo *models.Todo) error {
	return t.db.Create(todo).Error
}

func (t *Todo) ReadA(todoID int) (*models.Todo, error) {
	var todo models.Todo
	if err := t.db.First(&todo, todoID).Error; err != nil {
		return nil, err
	}
	return &todo, nil
}

func (t *Todo) ReadAll(limit, offset int) ([]*models.Todo, error) {
	var todos []*models.Todo
	if err := t.db.Limit(limit).Offset(offset).Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}

func (t *Todo) Update(todo *models.Todo) error {
	return t.db.Save(todo).Error
}

func (t *Todo) Delete(todoID int) error {
	return t.db.Delete(&models.Todo{}, todoID).Error
}
