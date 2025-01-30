import type { Call} from '@stream-io/video-react-sdk';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';

const useGetCallById = (id: string | string[]) => {
	const [call, setCall] = useState<Call>();
	const [isCallLoading, setIsCallLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const client = useStreamVideoClient();
	const normalizedId = Array.isArray(id) ? id[0] : id;

	useEffect(() => {
		let isMounted = true; // Флаг для отслеживания монтирования

		const getCall = async () => {
			if (!client || !normalizedId) {
				if (isMounted) setIsCallLoading(false);
				return;
			}

			try {
				const { calls } = await client.queryCalls({
					filter_conditions: { id: normalizedId },
				});

				if (isMounted) {
					if (calls.length > 0) setCall(calls[0]);
					setIsCallLoading(false);
				}
			} catch (error) {
				if (isMounted) {
					console.error(error);
					setError(error instanceof Error ? error : new Error('Failed to fetch call'));
					setCall(undefined);
					setIsCallLoading(false);
				}
			}
		};

		getCall();

		return () => {
			isMounted = false; // Компонент размонтирован
		};
	}, [client, normalizedId]);

	return { call, isCallLoading, error };
};

export default useGetCallById;
