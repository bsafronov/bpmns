import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const professions = pgTable("professions", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdById: integer("created_by_id")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by_id").references(() => users.id),
  published: boolean("published").default(true),
});

export const professionsRelations = relations(professions, ({ one }) => ({
  createdBy: one(users, {
    fields: [professions.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updatedBy: one(users, {
    fields: [professions.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));
