FROM golang:1.21.4 AS builder 
WORKDIR /build

COPY . .

RUN go mod tidy
RUN go build -o main cmd/app/main.go

FROM alpine:3.13 AS runner
WORKDIR /app
COPY --from=builder /build/main /app/

ENV SERVER_PORT=8080
ENV SERVER_HOST=0.0.0.0
ENV SERVER_VERSION=
ENV SERVER_SHUTDOWN_TIMEOUT=
ENV SERVER_CORS_MODE=

EXPOSE 8080

CMD ["./app/main"]