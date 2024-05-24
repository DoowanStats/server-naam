-- If Exists Table Drop
DROP TABLE IF EXISTS users cascade;

-- ================
--   TABLE [users]
-- ================
-- create users table
CREATE TABLE users(
    "id" UUID PRIMARY KEY,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT NOT NULL
    "email" VARCHAR(32) UNIQUE NOT NULL,
    "password" VARCHAR(48) NOT NULL,
);