import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { sessions } from "./sessions";

export const userRoleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  role: userRoleEnum("role").default("user"),
  hashedPassword: varchar("hashed_password").notNull(),
  published: boolean("published").default(true),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));
