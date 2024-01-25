CREATE TABLE "todos" (
  "todo_id" serial PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" text,
  "image" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "is_solved" boolean NOT NULL DEFAULT FALSE,
  "is_deleted" boolean NOT NULL DEFAULT FALSE
);

CREATE INDEX ON "todos" ("todo_id");
