import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { pProcesses } from "./p-processes";
import { ptFields } from "./pt-fields";

export const pFields = pgTable("p_fields", {
  id: serial("id").primaryKey(),
  value: text("value").notNull(),
  pProcessId: integer("p_process_id")
    .references(() => pProcesses.id)
    .notNull(),
  ptFieldId: integer("pt_field_id")
    .references(() => ptFields.id)
    .notNull(),
});

export const pFieldsRelations = relations(pFields, ({ one, many }) => ({
  ptField: one(ptFields, {
    fields: [pFields.ptFieldId],
    references: [ptFields.id],
  }),
  pProcess: one(pProcesses, {
    fields: [pFields.pProcessId],
    references: [pProcesses.id],
  }),
}));
