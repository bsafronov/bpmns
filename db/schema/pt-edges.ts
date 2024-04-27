import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { ptNodes } from "./pt-nodes";
import { ptTemplates } from "./pt-templates";
import { ptFields } from "./pt-fields";

export const ptEdges = pgTable(
  "pt_edges",
  {
    ptTemplateId: integer("pt_template_id")
      .references(() => ptTemplates.id)
      .notNull(),
    ptNodeIdSource: integer("pt_node_id_source")
      .references(() => ptNodes.ptStageId)
      .notNull(),
    ptNodeIdTarget: integer("pt_node_id_target")
      .references(() => ptNodes.ptStageId)
      .notNull(),
    ptFieldId: integer("pt_field_id").references(() => ptFields.id),
    value: varchar("value"),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.ptNodeIdSource, t.ptNodeIdTarget, t.ptFieldId],
    }),
  }),
);

export const ptEdgesRelations = relations(ptEdges, ({ one }) => ({
  ptTemplate: one(ptTemplates, {
    fields: [ptEdges.ptTemplateId],
    references: [ptTemplates.id],
  }),
  ptNodeSource: one(ptNodes, {
    fields: [ptEdges.ptNodeIdSource],
    references: [ptNodes.ptStageId],
  }),
  ptNodeTarget: one(ptNodes, {
    fields: [ptEdges.ptNodeIdTarget],
    references: [ptNodes.ptStageId],
  }),
}));
