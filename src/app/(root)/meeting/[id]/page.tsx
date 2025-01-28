'use client';

import { LoaderUI, MeetingRoom, MeetingSetup } from '@/components/shared';
import useGetCallById from '@/hooks/use-get-call-by-id';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const MeetingPage = () => {
	const { id } = useParams();
	const { isLoaded } = useUser();
	const [isSetupComplete, setIsSetupComplete] = useState(false);
	const { call, isCallLoading, error } = useGetCallById(id);

	if (!isLoaded || isCallLoading) return <LoaderUI />;

	if (!call) {
		return (
			<div className="h-screen flex items-center justify-center">
				<p className="text-2xl font-semibold">Meeting not found</p>
			</div>
		);
	}

	if (error) console.error(error);

	return (
		<StreamCall call={call}>
			<StreamTheme>
				{!isSetupComplete ? (
					<MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
				) : (
					<MeetingRoom />
				)}
			</StreamTheme>
		</StreamCall>
	);
};

export default MeetingPage;
