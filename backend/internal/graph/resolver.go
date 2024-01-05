package graph

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
import (
	"github.com/murasame29/gql-todo-app/internal/service/todo"
)

type Resolver struct {
	todo todo.TodoService
}
