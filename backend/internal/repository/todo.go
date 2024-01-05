package repository

import "github.com/murasame29/gql-todo-app/internal/models"

type Todo interface {
	Create(*models.Todo) error
	ReadA(int) (*models.Todo, error)
	ReadAll(int, int) ([]*models.Todo, error)
	Update(*models.Todo) error
	Delete(int) error
}
