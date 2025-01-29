import StreamClientProvider from '@/components/providers/StreamClientProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default Layout;
