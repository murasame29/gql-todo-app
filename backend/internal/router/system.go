package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/murasame29/gql-todo-app/cmd/config"
)

// SystemAPI バックエンドのシステムAPI
func (r *httpRouter) SystemAPI() {
	r.health()
	r.version()
}

// health APIが生きているか確認するためのAPI
func (r *httpRouter) health() {
	r.engine.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})
}

// version バックエンドのバージョンを返すAPI
func (r *httpRouter) version() {
	r.engine.GET("/version", func(c echo.Context) error {
		return c.String(http.StatusOK, config.Config.Server.Version)
	})
}
