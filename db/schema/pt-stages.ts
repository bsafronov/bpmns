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
import { ptStagesToPtFields } from "./pt-stages-to-pt-fields";
import { ptStagesToProfessions } from "./pt-stages-to-professions";
import { ptNodes } from "./pt-nodes";

export const ptStages = pgTable("pt_stages", {
  id: serial("id").primaryKey(),
  ptTemplateId: integer("pt_template_id")
    .references(() => ptTemplates.id)
    .notNull(),
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

export const ptStagesRelations = relations(ptStages, ({ one, many }) => ({
  ptTemplate: one(ptTemplates, {
    fields: [ptStages.ptTemplateId],
    references: [ptTemplates.id],
  }),
  ptNode: one(ptNodes, {
    fields: [ptStages.id],
    references: [ptNodes.ptStageId],
  }),
  ptStagesToPtFields: many(ptStagesToPtFields),
  ptStagesToProfessions: many(ptStagesToProfessions),
  createdBy: one(users, {
    fields: [ptStages.createdById],
    references: [users.id],
    relationName: "createdBy",
  }),
  updatedBy: one(users, {
    fields: [ptStages.updatedById],
    references: [users.id],
    relationName: "updatedBy",
  }),
}));
