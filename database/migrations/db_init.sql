CREATE TYPE "status" AS ENUM (
  'active',
  'inactive'
);

CREATE TYPE "transaction_status" AS ENUM (
  'pending',
  'completed',
  'cancelled'
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(30) UNIQUE NOT NULL,
  "password" VARCHAR(72) NOT NULL,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) UNIQUE NOT NULL,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "user_roles" (
  "id" SERIAL,
  "user_id" INT NOT NULL,
  "role_id" INT NOT NULL,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("user_id", "role_id")
);

CREATE TABLE "user_infos" (
  "id" SERIAL,
  "user_id" INT PRIMARY KEY NOT NULL,
  "first_name" VARCHAR(40) NOT NULL,
  "last_name" VARCHAR(40) NOT NULL,
  "dob" DATE NOT NULL,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(40) NOT NULL,
  "description" TEXT,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(40) NOT NULL,
  "description" TEXT,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "brand_id" INT NOT NULL,
  "category_id" INT NOT NULL,
  "code" VARCHAR(40) UNIQUE NOT NULL,
  "name" VARCHAR(40) NOT NULL,
  "description" TEXT,
  "price" NUMERIC(6,2) NOT NULL,
  "stock" INT NOT NULL DEFAULT 1,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "wishlists" (
  "id" SERIAL,
  "product_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("product_id", "user_id")
);

CREATE TABLE "carts" (
  "id" SERIAL,
  "user_id" INT NOT NULL,
  "product_id" INT NOT NULL,
  "quantity" INT NOT NULL DEFAULT 1,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("user_id", "product_id")
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "total_amount" NUMERIC(6,2) DEFAULT 0,
  "discount_amount" NUMERIC(6,2) DEFAULT 0,
  "final_amount" NUMERIC(6,2) DEFAULT 0,
  "transaction_status" transaction_status DEFAULT 'pending',
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "transaction_items" (
  "id" SERIAL PRIMARY KEY,
  "transaction_id" INT NOT NULL,
  "product_id" INT NOT NULL,
  "price" NUMERIC(6,2) NOT NULL,
  "quantity" INT DEFAULT 1,
  "total_price" NUMERIC(6,2) NOT NULL,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP
);

CREATE TABLE "reviews" (
  "id" SERIAL,
  "transaction_item_id" INT NOT NULL,
  "product_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "review" TEXT,
  "score" INT NOT NULL,
  "status" status DEFAULT 'active',
  "created_at" TIMESTAMP DEFAULT 'now()',
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("transaction_item_id", "product_id", "user_id")
);

COMMENT ON COLUMN "user_roles"."id" IS 'มีไว้ เพราะ ง่ายต่อการ update และ delete โดยตรง';

COMMENT ON COLUMN "user_infos"."id" IS 'มีไว้ เพราะ ง่ายต่อการ update และ delete โดยตรง';

COMMENT ON COLUMN "wishlists"."id" IS 'มีไว้ เพราะ ง่ายต่อการ update และ delete โดยตรง';

COMMENT ON COLUMN "carts"."id" IS 'มีไว้ เพราะ ง่ายต่อการ update และ delete โดยตรง';

COMMENT ON COLUMN "reviews"."id" IS 'มีไว้ เพราะ ง่ายต่อการ update และ delete โดยตรง';

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "user_infos" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "products" ADD FOREIGN KEY ("brand_id") REFERENCES "brands" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "wishlists" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "wishlists" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "carts" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transaction_items" ADD FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transaction_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON UPDATE CASCADE;

ALTER TABLE "reviews" ADD FOREIGN KEY ("transaction_item_id") REFERENCES "transaction_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "reviews" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
