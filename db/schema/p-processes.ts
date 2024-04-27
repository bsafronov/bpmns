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
import { ptTemplates } from "./pt-templates";
import { products } from "./products";

export const pProcesses = pgTable("p_processes", {
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

export const pProcessesRelations = relations(pProcesses, ({ one, many }) => ({
  product: one(products, {
    fields: [pProcesses.id],
    references: [products.id],
  }),
  ptTemplate: one(ptTemplates, {
    fields: [pProcesses.id],
    references: [ptTemplates.id],
  }),
  createdBy: one(users, {
    fields: [pProcesses.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updatedBy: one(users, {
    fields: [pProcesses.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));
