import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { ptTemplates } from "./pt-templates";
import { ptStages } from "./pt-stages";
import { professions } from "./professions";

export const ptStagesToProfessions = pgTable(
  "pt_stages_to_professions",
  {
    ptStageId: integer("pt_stage_id")
      .notNull()
      .references(() => ptStages.id),
    professionId: integer("profession_id")
      .notNull()
      .references(() => professions.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.ptStageId, t.professionId] }),
  }),
);

export const ptStagesToProfessionsRelations = relations(
  ptStagesToProfessions,
  ({ one }) => ({
    ptStage: one(ptStages, {
      fields: [ptStagesToProfessions.ptStageId],
      references: [ptStages.id],
    }),
    profession: one(ptTemplates, {
      fields: [ptStagesToProfessions.professionId],
      references: [ptTemplates.id],
    }),
  }),
);
