import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
	return (
		<header className="admin-header">
			<div>
				<h2 className="font-semibold text-2xl text-dark-400">
					{session?.user?.name}
				</h2>
				<p className="text-base text-slate-500">
					Monitor all of your users and books here
				</p>
			</div>
			{/*<p>Search</p>*/}
		</header>
	);
};

export default Header;
