import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { professions } from "./professions";
import { relations } from "drizzle-orm";

export const usersToProfessions = pgTable(
  "users_to_professions",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    professionId: integer("profession_id")
      .notNull()
      .references(() => professions.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.professionId] }),
  }),
);

export const usersToProfessionsRelations = relations(
  usersToProfessions,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToProfessions.userId],
      references: [users.id],
    }),
    profession: one(professions, {
      fields: [usersToProfessions.professionId],
      references: [professions.id],
    }),
  }),
);
