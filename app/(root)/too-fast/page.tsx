import React from "react";

const page = () => {
	return (
		<main className="root-container flex minh-screen flex-col items-center justify-center">
			<h1 className="font-bebas-neue text-5xl font-bold text-light-100">
				Whoa, Slow Down!
			</h1>
			<p className="mt-3 mx-w-xl text-center text-light-100">
				Looks like you&apos;ve been clicking around too quickly. Please wait a
				moment before trying again.
			</p>
		</main>
	);
};

export default page;
