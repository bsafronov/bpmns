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
import { ptStages } from "./pt-stages";
import { ptFields } from "./pt-fields";
import { ptNodes } from "./pt-nodes";
import { ptEdges } from "./pt-edges";

export const ptTemplates = pgTable("pt_templates", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  published: boolean("published").notNull().default(false),

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

export const ptTemplatesRelations = relations(ptTemplates, ({ one, many }) => ({
  ptStages: many(ptStages),
  ptFields: many(ptFields),
  ptNodes: many(ptNodes),
  ptEdges: many(ptEdges),
  createdBy: one(users, {
    fields: [ptTemplates.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updatedBy: one(users, {
    fields: [ptTemplates.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));
