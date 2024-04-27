import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { ptFields } from "./pt-fields";
import { ptStages } from "./pt-stages";

export const ptStagesToPtFields = pgTable(
  "pt_stages_to_pt_fields",
  {
    ptFieldId: integer("pt_field_id")
      .notNull()
      .references(() => ptFields.id),
    ptStageId: integer("pt_stage_id")
      .notNull()
      .references(() => ptStages.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.ptFieldId, t.ptStageId] }),
  }),
);

export const ptStagesToPtFieldsRelations = relations(
  ptStagesToPtFields,
  ({ one }) => ({
    ptField: one(ptFields, {
      fields: [ptStagesToPtFields.ptFieldId],
      references: [ptFields.id],
    }),
    ptStage: one(ptStages, {
      fields: [ptStagesToPtFields.ptStageId],
      references: [ptStages.id],
    }),
  }),
);
