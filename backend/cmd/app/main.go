package main

import (
	"github.com/murasame29/gql-todo-app/cmd/config"
	"github.com/murasame29/gql-todo-app/internal/router"
	"github.com/murasame29/gql-todo-app/internal/server"
)

func init() {
	config.LoadEnv()
}

func main() {
	server.New().Run(router.NewEcho())
}
