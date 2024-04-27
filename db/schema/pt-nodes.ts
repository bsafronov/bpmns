import { decimal, integer, pgTable } from "drizzle-orm/pg-core";
import { ptStages } from "./pt-stages";
import { relations } from "drizzle-orm";
import { ptTemplates } from "./pt-templates";
import { ptEdges } from "./pt-edges";

export const ptNodes = pgTable("pt_nodes", {
  ptStageId: integer("pt_stage_id")
    .notNull()
    .references(() => ptStages.id)
    .primaryKey(),
  ptTemplateId: integer("pt_template_id")
    .references(() => ptTemplates.id)
    .notNull(),
  posX: decimal("pos_x").notNull(),
  posY: decimal("pos_y").notNull(),
});

export const ptNodesRelations = relations(ptNodes, ({ one, many }) => ({
  ptTemplate: one(ptTemplates, {
    fields: [ptNodes.ptTemplateId],
    references: [ptTemplates.id],
  }),
  ptStage: one(ptStages, {
    fields: [ptNodes.ptStageId],
    references: [ptStages.id],
  }),
  ptEdgesSource: many(ptEdges, { relationName: "source" }),
  ptEdgesTarget: many(ptEdges, { relationName: "target" }),
}));
