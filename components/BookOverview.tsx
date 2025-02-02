import React from "react";

const BookOverview = ({
	title,
	author,
	genre,
	rating,
	total_copies,
	available_copies,
	description,
	color,
	cover,
}: Book) => {
	return (
		<section className="book-overview">
			<div className="flex flex-1 flex-col gap-5">
				<h1>{title}</h1>
				<div className="book-info">
					<p>
						By <span className="font-semibold text-light-200">{author}</span>
					</p>
				</div>
			</div>
		</section>
	);
};

export default BookOverview;
