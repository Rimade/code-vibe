'use client';

import { usePathname } from 'next/navigation';

import { Navbar } from '@/components/shared';

export const NavbarWrapper = () => {
	const pathname = usePathname();
	const isMeetingPage = pathname?.startsWith('/meeting/');

	return !isMeetingPage ? <Navbar /> : null;
};
