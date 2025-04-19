"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props extends Partial<Book> {
	type: "create" | "update";
}

const Spinner = () => (
	<div className="h-4 w-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
);

const BookForm = ({ type, ...book }: Props) => {
	const form = useForm<z.infer<typeof bookSchema>>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			author: "",
			genre: "",
			rating: 1,
			totalCopies: 1,
			description: "",
			coverUrl: "",
			coverColor: "",
			videoUrl: "",
			summary: "",
		},
	});

	const router = useRouter();

	const onSubmit = async (values: z.infer<typeof bookSchema>) => {
		const result = await createBook(values);

		if (result.success) {
			toast.success("Book create successfully");

			router.push(`/admin/books/${result.data.id}`);
		} else {
			toast.error(result.message);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name={"title"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">Book Title</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book title"
									{...field}
									className="book-form_input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"author"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">Author</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book author"
									{...field}
									className="book-form_input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"genre"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">Genre</FormLabel>
							<FormControl>
								<Input
									required
									placeholder="Book genre"
									{...field}
									className="book-form_input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"rating"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">Rating</FormLabel>
							<FormControl>
								<Input
									type="number"
									required
									min={1}
									max={5}
									{...field}
									className="book-form_input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"totalCopies"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">Total Copies</FormLabel>
							<FormControl>
								<Input
									type="number"
									required
									min={1}
									max={1000}
									{...field}
									className="book-form_input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"coverUrl"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">book cover</FormLabel>
							<FormControl>
								<FileUpload
									type="image"
									accept="image/*"
									placeholder="Upload a cover"
									folder="books/covers"
									variant="light"
									onFileChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"coverColor"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">primary color</FormLabel>
							<FormControl>
								<ColorPicker
									onPickerChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"description"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">book description</FormLabel>
							<FormControl>
								<Textarea
									className="book-form_input"
									rows={10}
									placeholder="Book Description"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"videoUrl"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">book trailer</FormLabel>
							<FormControl>
								<FileUpload
									type="video"
									accept="video/*"
									placeholder="Upload a trailer"
									folder="books/videos"
									variant="light"
									onFileChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={"summary"}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="capitalize">book summary</FormLabel>
							<FormControl>
								<Textarea
									className="book-form_input"
									rows={5}
									placeholder="Book Summary"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="book-form_btn text-white">
					Add Book to Library
				</Button>
			</form>
		</Form>
	);
};

export default BookForm;
