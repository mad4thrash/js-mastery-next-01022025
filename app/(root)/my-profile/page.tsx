import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import React from "react";
import { eq } from "drizzle-orm";

const page = async () => {
	const session = await auth();
	if (!session) return null;
	const userId = session?.user?.id as string;
	/*interface BookParams {
	title: string;
	author: string;
	genre: string;
	rating: number;
	coverUrl: string;
	coverColor: string;
	description: string;
	totalCopies: number;
	videoUrl: string;
	summary: string;
}*/
	const borrowedBooks = await db
		.select({
			id: books.id,
			title: books.title,
			author: books.author,
			genre: books.genre,
			rating: books.rating,
			description: books.description,
			coverColor: books.coverColor,
			coverUrl: books.coverUrl,
			videoUrl: books.videoUrl,
			summary: books.summary,
			totalCopies: books.totalCopies,
			availableCopies: books.availableCopies,
			createdAt: books.createdAt,
		})
		.from(books)
		.innerJoin(borrowRecords, eq(books.id, borrowRecords.bookId))
		.where(
			eq(borrowRecords.status, "BORROWED") && eq(borrowRecords.userId, userId)
		);
	console.log(borrowedBooks);
	return (
		<div>
			<form
				action={async () => {
					"use server";

					await signOut();
				}}
				className="mb-10"
			>
				<Button>Logout</Button>
			</form>
			<BookList title="Borrowed Books" books={borrowedBooks} />
		</div>
	);
};

export default page;
