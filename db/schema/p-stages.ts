import { relations } from "drizzle-orm";
import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { pProcesses } from "./p-processes";
import { ptStages } from "./pt-stages";

export const pStages = pgTable("p_stages", {
  id: serial("id").primaryKey(),
  ptStageId: integer("pt_stage_id")
    .references(() => ptStages.id)
    .notNull(),
  pProcessId: integer("p_process_id")
    .references(() => pProcesses.id)
    .notNull(),
});

export const pFieldsRelations = relations(pStages, ({ one, many }) => ({
  ptStage: one(ptStages, {
    fields: [pStages.ptStageId],
    references: [ptStages.id],
  }),
  pProcess: one(pProcesses, {
    fields: [pStages.pProcessId],
    references: [pProcesses.id],
  }),
}));
