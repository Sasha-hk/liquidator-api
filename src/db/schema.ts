import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('Users', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 320 }).unique().notNull(),
  username: varchar({ length: 15 }).unique().notNull(),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  password: varchar().notNull(),
  dateCreated: timestamp('date_created').defaultNow().notNull(),
  dateUpdated: timestamp('date_updated'),
});
