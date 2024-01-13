// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"github.com/99designs/gqlgen/graphql"
)

type Mutation struct {
}

type Query struct {
}

type Todo struct {
	TodoID      int     `json:"todo_id"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	Image       *string `json:"image,omitempty"`
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string  `json:"updated_at"`
	IsSolved    bool    `json:"is_solved"`
	IsDeleted   bool    `json:"is_deleted"`
}

type TodoInput struct {
	Title       string          `json:"title"`
	Description *string         `json:"description,omitempty"`
	Image       *graphql.Upload `json:"image,omitempty"`
}

type TodoUpdateInput struct {
	Title       string          `json:"title"`
	Description *string         `json:"description,omitempty"`
	Image       *graphql.Upload `json:"image,omitempty"`
	IsSolved    *bool           `json:"is_solved,omitempty"`
}
