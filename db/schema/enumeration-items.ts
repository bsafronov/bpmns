import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { enumerations } from "./enumerations";
import { users } from "./users";

export const enumerationItems = pgTable("enumeration_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  enumerationId: integer("enumeration_id").notNull(),

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

export const enumerationItemsRelations = relations(
  enumerationItems,
  ({ one }) => ({
    enumeration: one(enumerations, {
      fields: [enumerationItems.enumerationId],
      references: [enumerations.id],
    }),
    createdBy: one(users, {
      fields: [enumerationItems.createdById],
      references: [users.id],
      relationName: "createdBy",
    }),
    updatedBy: one(users, {
      fields: [enumerationItems.updatedById],
      references: [users.id],
      relationName: "updatedBy",
    }),
  }),
);
