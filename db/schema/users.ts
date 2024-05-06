import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { sessions } from "./sessions";
import { professions } from "./professions";
import { ptTemplates } from "./pt-templates";
import { products } from "./products";
import { ptStages } from "./pt-stages";
import { ptFields } from "./pt-fields";
import { pProcesses } from "./p-processes";
import { usersToProfessions } from "./users-to-professions";
import { enumerations } from "./enumerations";
import { enumerationItems } from "./enumeration-items";

export const userRoleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  role: userRoleEnum("role").default("user"),
  hashedPassword: varchar("hashed_password").notNull(),
  published: boolean("published").default(true),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  usersToProfessions: many(usersToProfessions),
  createdEnumerations: many(enumerations, { relationName: "createdBy" }),
  updatedEnumerations: many(enumerations, { relationName: "updatedBy" }),
  createdEnumerationItems: many(enumerationItems, {
    relationName: "createdBy",
  }),
  updatedEnumerationItems: many(enumerationItems, {
    relationName: "updatedBy",
  }),
  createdProfessions: many(professions, { relationName: "createdBy" }),
  updatedProfessions: many(professions, { relationName: "updatedBy" }),
  createdProducts: many(products, { relationName: "createdBy" }),
  updatedProducts: many(products, { relationName: "updatedBy" }),
  createdTemplates: many(ptTemplates, { relationName: "createdBy" }),
  updatedTemplates: many(ptTemplates, { relationName: "updatedBy" }),
  createdPtStages: many(ptStages, { relationName: "createdBy" }),
  updatedPtStages: many(ptStages, { relationName: "updatedBy" }),
  createdPtFields: many(ptFields, { relationName: "createdBy" }),
  updatedPtFields: many(ptFields, { relationName: "updatedBy" }),
  createdPProcesses: many(pProcesses, { relationName: "createdBy" }),
  updatedPProcesses: many(pProcesses, { relationName: "updatedBy" }),
}));
