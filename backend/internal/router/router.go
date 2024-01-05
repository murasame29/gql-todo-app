package router

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/murasame29/gql-todo-app/internal/graph"
	"github.com/murasame29/gql-todo-app/internal/router/middleware"

	"github.com/labstack/echo/v4"
)

type httpRouter struct {
	engine     *echo.Echo
	middleware middleware.Middleware

	v1 *echo.Group
}

func NewEcho() http.Handler {
	engine := echo.New()
	router := &httpRouter{
		engine:     engine,
		middleware: middleware.NewEchoMiddleware(engine),
	}

	router.engine.Use(router.middleware.SetCORS())
	router.SystemAPI()
	router.pgRoute()

	{
		router.v1 = router.engine.Group("/v1")
		router.v1.GET("/query",
			echo.WrapHandler(
				handler.NewDefaultServer(
					graph.NewExecutableSchema(
						graph.Config{Resolvers: &graph.Resolver{}},
					),
				),
			),
		)
	}

	return router.engine
}

func (r *httpRouter) pgRoute() {
	r.engine.GET("/", echo.WrapHandler(playground.Handler("GraphQL playground", "/v1/query")))
}
