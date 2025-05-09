import { desc } from "drizzle-orm";
import { uuid, varchar,text,integer, pgTable, pgEnum, date, timestamp } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum('status', ['PENDING','APPROVED','REJECTED']);
export const ROLE_ENUM = pgEnum('role', ['USER','ADMIN']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable('users', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar('full_name', {length: 255}).notNull(),
    email: text('email').notNull().unique(),
    universityId: integer('university_id').notNull().unique(),
    password: text('password').notNull(),
    universityCard: text('university_card').notNull(),
    status: STATUS_ENUM('status').default('PENDING'),
    role: ROLE_ENUM('role').default('USER'),
    lastActivityDate: date('last_activity_date').defaultNow(),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow()
})

export const books = pgTable('books', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    title: varchar('title', {length: 255}).notNull(),
    author: varchar('author', {length: 255}).notNull(),
    genre: text('genre').notNull(),
    rating: integer('rating').notNull(),
    coverUrl: text('cover_url').notNull(),
    coverColor: varchar('cover_color', {length: 7}).notNull(),
    description: text('description').notNull(),
    availableCopies: integer('available_copies').notNull().default(0),
    totalCopies: integer('total_copies').notNull().default(1),
    videoUrl: text('video_url').notNull(),
    summary: varchar('summary', {length: 255}).notNull(),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow()
})

export const borrowRecords = pgTable('borrow_records', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    userId: uuid('user_id').notNull().references(() => users.id),
    bookId: uuid('book_id').notNull().references(() => books.id),
    borrowDate: timestamp('borrow_date',{withTimezone: true}).defaultNow().notNull(),
    dueDate: timestamp('due_date',{withTimezone: true}).notNull(),
    returnDate: timestamp('return_date'),
    status: BORROW_STATUS_ENUM('status').default('BORROWED').notNull(),
    createdAt: timestamp('created_at',{withTimezone: true}).defaultNow()
})

