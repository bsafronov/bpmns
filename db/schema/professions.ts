import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { ptStagesToProfessions } from "./pt-stages-to-professions";
import { usersToProfessions } from "./users-to-professions";

export const professions = pgTable("professions", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  published: boolean("published").notNull().default(true),

  // LOGS
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdById: integer("created_by_id")
    .notNull()
    .references(() => users.id),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  updatedById: integer("updated_by_id").references(() => users.id),
});

export const professionsRelations = relations(professions, ({ one, many }) => ({
  ptStagesToProfessions: many(ptStagesToProfessions),
  usersToProfessions: many(usersToProfessions),
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
