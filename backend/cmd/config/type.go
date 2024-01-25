package config

import (
	"time"
)

type config struct {
	Server struct {
		Port            string        `env:"SERVER_PORT" envDefault:"8080"`
		Host            string        `env:"SERVER_HOST" envDefault:"localhost"`
		Version         string        `env:"SERVER_VERSION" envDefault:"v:0.0.0"`
		ShutDownTimeout time.Duration `env:"SERVER_SHUTDOWN_TIMEOUT" envDefault:"10s"`
		CorsMode        string        `env:"SERVER_CORS_MODE" envDefault:"allow-all"`
	}
}

var Config *config
