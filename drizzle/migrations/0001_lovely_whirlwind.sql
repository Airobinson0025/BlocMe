CREATE TABLE IF NOT EXISTS "user_account" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"profile_picture" text,
	"bio" text,
	"display_name" text,
	"location" text,
	"website" text,
	"social_links" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"followers_count" integer DEFAULT 0,
	"following_count" integer DEFAULT 0,
	"posts_count" integer DEFAULT 0,
	"is_private" boolean DEFAULT false,
	"status" text,
	"cover_photo" text
);
--> statement-breakpoint
DROP TABLE "user_accounts";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_account" ADD CONSTRAINT "user_account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
