package middleware

import "github.com/labstack/echo/v4"

type middleawre struct {
	engine *echo.Echo
}

type Middleware interface {
	SetCORS() echo.MiddlewareFunc
}

func NewEchoMiddleware(engine *echo.Echo) Middleware {
	return &middleawre{engine: engine}
}
