import { integer,pgEnum,serial,text,timestamp,varchar,PgTable, pgTable } from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum("user-system_enum",["system","user"]);

export const chats = pgTable("chats", {
    id: serial("id").primaryKey(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("userid",{length:256}).notNull(),
    fileKey: text("file_key").notNull(), 
});

export type DrizzleChat = typeof chats.$inferSelect;

export const messages = pgTable("messages",{
    id: serial("id").primaryKey(),
    chatId: integer("chat_id").references(() => chats.id).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    role:userSystemEnum("role").notNull(),
})

//drizzle-orm/pg-core
//drizzle-kit