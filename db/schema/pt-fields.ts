import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { enumerations } from "./enumerations";
import { ptTemplates } from "./pt-templates";
import { users } from "./users";

export const ptFieldTypes = pgEnum("pt_field_type", [
  "enum",
  "text",
  "rich_text",
  "number",
  "boolean",
  "date",
  "file",
]);

export const ptFields = pgTable("pt_fields", {
  id: serial("id").primaryKey(),
  ptTemplateId: integer("pt_template_id")
    .references(() => ptTemplates.id)
    .notNull(),
  enumerationId: integer("enumeration_id").references(() => enumerations.id),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  published: boolean("published").notNull().default(false),
  type: ptFieldTypes("type").notNull().default("text"),

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

export const ptFieldsRelations = relations(ptFields, ({ one, many }) => ({
  enumeration: one(enumerations, {
    fields: [ptFields.enumerationId],
    references: [enumerations.id],
  }),
  ptTemplate: one(ptTemplates, {
    fields: [ptFields.ptTemplateId],
    references: [ptTemplates.id],
  }),
  createdBy: one(users, {
    fields: [ptFields.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updatedBy: one(users, {
    fields: [ptFields.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));
