import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const userModel = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userAccountModel = pgTable('user_accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => userModel.id).notNull(),
  profilePicture: text('profile_picture'),
  bio: text('bio'),
  displayName: text('display_name'),
  location: text('location'),
  website: text('website'),
  socialLinks: jsonb('social_links'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  followersCount: integer('followers_count').default(0),
  followingCount: integer('following_count').default(0),
  postsCount: integer('posts_count').default(0),
  isPrivate: boolean('is_private').default(false),
  status: text('status'),
  coverPhoto: text('cover_photo'),
});
