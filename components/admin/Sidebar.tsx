"use client";
import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
	const pathName = usePathname();
	return (
		<div className="admin-sidebar">
			<div>
				<div className="logo">
					<Image
						src="/icons/admin/logo.svg"
						alt="logo"
						height={37}
						width={37}
					/>
					<h1>BookWise</h1>
				</div>
				<div className="mt-10 flex flex-col gap-5">
					{adminSideBarLinks.map((link) => {
						const isSelected =
							(link.route !== "/admin" &&
								pathName.includes(link.route) &&
								link.route.length > 1) ||
							pathName === link.route;

						return (
							<Link href={link.route} key={link.route}>
								<div
									className={cn(
										"link",
										isSelected && "bg-primary-admin shadow-sm"
									)}
								>
									<div className="relative size-5">
										<Image
											src={link.img}
											alt="icon"
											className={`${isSelected} ? "brightness-0 invert" : "" object-contain`}
											width={20}
											height={20}
										/>
									</div>
									<p className={cn(isSelected ? "text-white" : "text-dark")}>
										{link.text}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
