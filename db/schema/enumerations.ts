import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { enumerationItems } from "./enumeration-items";
import { ptFields } from "./pt-fields";
import { users } from "./users";

export const enumerations = pgTable("enumerations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),

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

export const enumerationsRelations = relations(
  enumerations,
  ({ many, one }) => ({
    items: many(enumerationItems),
    ptFields: many(ptFields),
    createdBy: one(users, {
      fields: [enumerations.createdById],
      references: [users.id],
      relationName: "createdBy",
    }),
    updatedBy: one(users, {
      fields: [enumerations.updatedById],
      references: [users.id],
      relationName: "updatedBy",
    }),
  }),
);
