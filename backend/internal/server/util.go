package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/murasame29/gql-todo-app/cmd/config"
)

const (
	DefaultShutdownTimeout time.Duration = 10
)

func runWithGracefulShutdown(handler http.Handler) {
	// handler check
	if handler == nil {
		panic("server handler is nil")
	}

	// initial server setting
	serverHost := fmt.Sprintf("%s:%s", config.Config.Server.Host, config.Config.Server.Port)

	srv := &http.Server{
		Addr:    serverHost,
		Handler: handler,
	}

	// run server

	go func() {
		fmt.Printf("server starting at %s\n", serverHost)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			panic("Listen And Serve error : " + err.Error())
		}
	}()

	// graceful shutdown
	var shutDownTimeout = DefaultShutdownTimeout
	if config.Config.Server.ShutDownTimeout != 0 {
		shutDownTimeout = config.Config.Server.ShutDownTimeout
	}

	q := make(chan os.Signal, 1)

	signal.Notify(q, os.Interrupt, os.Kill)

	<-q

	// timeout setting
	ctx, cancel := context.WithTimeout(context.TODO(), shutDownTimeout*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		panic("server shutdown error : " + err.Error())
	}
}
