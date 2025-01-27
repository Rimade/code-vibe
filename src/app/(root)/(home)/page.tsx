'use client';

import { ActionCard, MeetingModal } from '@/components/shared';
import { useUserRole } from '@/hooks/use-user-role';
import { QUICK_ACTIONS } from '@/lib/constants';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '../../../../convex/_generated/api';

export default function Home() {
	const { isInterviewer, isCandidate, isLoading } = useUserRole();
	const interviews = useQuery(api.interviews.getAllInterviews);
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState<'start' | 'join'>();

	function handleQuickAction(title: string) {
		switch (title) {
			case 'New Call':
				setModalType('start');
				setShowModal(true);
				break;
			case 'Join Interview':
				setModalType('join');
				setShowModal(true);
				break;
			default:
				router.push(`/${title.toLowerCase().trim()}`);
				break;
		}
	}

	if (isLoading) {
		return (
			<div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50">
				<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="container max-w-7xl mx-auto p-6">
			{/* Welcome section */}

			<div className="rounded-lg bg-card p-6 border shadow-sm mb-10 bg-gradient-to-r from-blue-500/5 to-transparent opacity-85 hover:opacity-100 transition-opacity">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
					Welcome to CodeVibe
				</h1>
				<p className="text-blue-600/90 mt-2 text-lg">
					{isInterviewer
						? 'Manage your interviews and review candidates effectively'
						: 'Access your upcoming interviews and preparations'}
				</p>
			</div>

			{isInterviewer ? (
				<>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{QUICK_ACTIONS.map((action) => (
							<ActionCard
								key={action.title}
								action={action}
								onClick={() => handleQuickAction(action.title)}
							/>
						))}
					</div>

					<MeetingModal
						isOpen={showModal}
						onClose={() => setShowModal(false)}
						title={modalType === 'join' ? 'Join Meeting' : 'Start Meeting'}
						isJoinMeeting={modalType === 'join'}
					/>
				</>
			) : (
				<>
					<div>
						<h1 className="text-3xl font-bold">Your Interviews</h1>
						<p className="text-muted-foreground mt-1">
							View and join your scheduled interviews
						</p>
					</div>
				</>
			)}
		</div>
	);
}
