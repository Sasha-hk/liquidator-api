CREATE TABLE IF NOT EXISTS "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"username" varchar(15) NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"password" varchar NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp,
	CONSTRAINT "Users_email_unique" UNIQUE("email"),
	CONSTRAINT "Users_username_unique" UNIQUE("username")
);
