import { SignedIn, UserButton } from '@clerk/nextjs';
import { CodeIcon } from 'lucide-react';
import Link from 'next/link';

import { DashboardBtn, ModeToggle } from '.';

export function Navbar() {
	return (
		<nav className="border-b">
			<div className="flex h-16 items-center px-4 container mx-auto">
				{/* LEFT SIDE - LOGO */}
				<Link
					href="/"
					className="group flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:scale-[1.02] transition-all">
					<CodeIcon className="size-8 text-teal-500 animate-logo-bounce" />
					<span className="bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent relative">
						CodeVibe
						<span className="absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-teal-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
					</span>
				</Link>

				{/* RIGHT SIDE - ACTIONS */}
				<SignedIn>
					<div className="flex items-center space-x-4 ml-auto">
						<DashboardBtn />
						<ModeToggle />
						<UserButton />
					</div>
				</SignedIn>
			</div>
		</nav>
	);
}
