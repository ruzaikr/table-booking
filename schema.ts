import { pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Define the "dining_tables" table
export const diningTables = table(
   "dining_tables",
   {
     id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
     name: t.varchar("name", { length: 50 }).notNull(),
     capacity: t.integer("capacity").notNull(),
   }
);

// Define the "reservations" table
export const reservations = table(
   "reservations",
   {
     id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
     diningTableId: t.integer("dining_table_id")
        .notNull()
        .references(() => diningTables.id, { onDelete: 'cascade' }),
     name: t.varchar("name", { length: 100 }).notNull(),
     email: t.varchar("email", { length: 255 }).notNull(),
     notes: t.varchar("notes", { length: 255 }),
     reservationDate: t.date("reservation_date").notNull(),
     startTime: t.time("start_time").notNull(),
     endTime: t.time("end_time").notNull(),
     createdAt: t.timestamp("created_at", { mode: 'date' }).$defaultFn(() => new Date()),
   },
   (table) => {
     return {
       // Unique constraint for email and reservation date
       emailDateIndex: t.uniqueIndex("unique_email_active_idx").on(table.email, table.reservationDate),

       // Check constraints using SQL template literals
       dateCheck: t.check(
          'check_date_within_20_days',
          sql`reservation_date
          >= CURRENT_DATE AND reservation_date <= CURRENT_DATE + INTERVAL '20 days'`
       ),

       mondayCheck: t.check(
          'check_not_monday',
          sql`EXTRACT(DOW FROM reservation_date) <> 1`
       ),

       startTimeCheck: t.check(
          'check_allowed_start_times',
          sql`start_time
          IN ('18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00')`
       ),

       endTimeCheck: t.check(
          'check_end_time',
          sql`(start_time, end_time)
              IN (('18:00','20:00'), ('18:30','20:30'), ('19:00','21:00'), ('19:30','21:30'), ('20:00','22:00'), ('20:30','22:30'), ('21:00','23:00'))`
       )

     };
   }
);
