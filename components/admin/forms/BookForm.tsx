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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";

interface Props extends Partial<Book> {
	type: "create" | "update";
}

const Spinner = () => (
	<div className="h-4 w-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
);

const BookForm = ({ type, ...book }: Props) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof bookSchema>>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			author: "",
			genre: "",
			rating: 1,
			totalCopies: 1,
			description: "",
			corverUrl: "",
			coverColor: "",
			videoUrl: "",
			summary: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof bookSchema>) => {};
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
			</form>
		</Form>
	);
};

export default BookForm;
