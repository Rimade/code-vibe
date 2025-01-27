'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

// Константы для конфигурации
const TOKEN_EXPIRATION = {
	PRODUCTION: 5, // часов
	DEVELOPMENT: 24, // часов
};

export const streamTokenProvider = async () => {
	// Получение текущего пользователя
	const user = await currentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	// Проверка наличия необходимых ключей
	const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
	const secretKey = process.env.SECRET_STREAM_KEY;

	if (!apiKey || !secretKey) {
		throw new Error('Stream API keys are not configured');
	}

	// Инициализация клиента
	const streamClient = new StreamClient(apiKey, secretKey);

	try {
		// Генерация токена
		const expirationHours =
			process.env.NODE_ENV === 'production'
				? TOKEN_EXPIRATION.PRODUCTION
				: TOKEN_EXPIRATION.DEVELOPMENT;

		const token = streamClient.generateUserToken({
			user_id: user.id,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * expirationHours,
		});

		return token;
	} catch (error) {
		console.error('Token generation failed:', error);
		throw new Error('Failed to generate user token');
	}
};
