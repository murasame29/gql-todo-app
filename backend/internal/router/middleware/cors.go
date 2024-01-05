package middleware

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/murasame29/gql-todo-app/cmd/config"
)

type CorsMode string

const (
	CorsAllowAll    CorsMode = "allow-all"
	CorsAllowAny    CorsMode = "allow-any"
	CorsAllowOrigin CorsMode = "allow-origin"
)

// corsの設定を行う
// TODO: 其々の設定をyamlから読み込むようにする
var corsConfig = map[CorsMode]middleware.CORSConfig{
	CorsAllowAll: {
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	},

	CorsAllowAny: {
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	},

	CorsAllowOrigin: {
		AllowOrigins: []string{"localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	},
}

// SetCORS CORSの設定を行う
func (m *middleawre) SetCORS() echo.MiddlewareFunc {
	return middleware.CORSWithConfig(corsConfig[CorsMode(config.Config.Server.CorsMode)])
}

func init() {
	// TODO: ここでyamlから読み込むようにする
}
