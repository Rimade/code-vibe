import type { Call } from '@stream-io/video-react-sdk';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type CallType = 'default' | 'team_meeting' | 'webinar' | 'one_on_one';

interface CallCustomData {
	description: string;
	created_by?: string;
}

interface MeetingActions {
	createInstantMeeting: (type?: CallType, description?: string) => Promise<void>;
	joinMeeting: (callId: string) => void;
}

const useMeetingActions = (): MeetingActions => {
	const router = useRouter();
	const client = useStreamVideoClient();

	const createInstantMeeting = async (
		type: CallType = 'default',
		description: string = 'Instant Meeting'
	): Promise<void> => {
		if (!client) {
			toast.error('Stream client is not available');
			return;
		}

		try {
			const id = crypto.randomUUID();
			const call: Call = client.call(type, id);

			await call.getOrCreate({
				data: {
					starts_at: new Date().toISOString(),
					custom: {
						description,
						// created_by: user?.id,
					} as CallCustomData,
				},
			});

			router.push(`/meeting/${call.id}`);
			toast.success('Meeting Created');
		} catch (error) {
			console.error('Failed to create meeting:', error);
			toast.error('Failed to create meeting');
			if (error instanceof Error) {
				console.error('Error message:', error.message);
			}
		}
	};

	const joinMeeting = (callId: string): void => {
		if (!client) {
			toast.error('Failed to join meeting. Please try again.');
			return;
		}
		router.push(`/meeting/${callId}`);
	};

	return { createInstantMeeting, joinMeeting };
};

export default useMeetingActions;
