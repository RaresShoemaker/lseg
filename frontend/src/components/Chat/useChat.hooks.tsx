/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { apiRoutes } from '../../api/api';

type MessageQueueType = {
	text: string;
	isUser: boolean;
	isData: boolean;
	value?: string;
};

const useChat = () => {
	const [messages, setMessages] = useState<MessageQueueType[]>([
		{ text: 'Welcome! Which stock exchange would you like to explore?', isUser: false, isData: false }
	]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchExhanges = async () => {
			try {
				const response = await fetch(apiRoutes.fetchExchanges);
				const data = await response.json();
				setMessages([
					...messages,
					{ text: 'Here are the stock exchanges available:', isUser: false, isData: false },
					...data.map((exchange: any) => ({
						text: exchange.name,
						isUser: false,
						isData: true,
						value: exchange.code
					}))
				]);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
		};

		fetchExhanges();
	}, []);

	const handleGetStocks = async (exchangeCode: string, exchangeName: string) => {
		try {
			const messagesCopy = structuredClone(messages);
			messagesCopy.push({ text: exchangeName, isUser: true, isData: false });
			const response = await fetch(`${apiRoutes.fetchExchanges}/${exchangeCode}/stocks`);
			const data = await response.json();
			messagesCopy.push(
				{ text: `Here are the top stocks of ${exchangeCode}:`, isUser: false, isData: false },
				...data.map((stock: any) => ({
					text: stock.name,
					isUser: false,
					isData: true,
					value: `${stock.code}@${exchangeCode}`,
				}))
			);
			setMessages(messagesCopy);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	const handleGetStockDetails = async (value: string, stockName: string) => {
		try {
			const [stockCode, exchangeCode] = value.split('@');
			const messagesCopy = structuredClone(messages);
			messagesCopy.push({ text: stockName, isUser: true, isData: false });
			const response = await fetch(`${apiRoutes.fetchExchanges}/${exchangeCode}/stocks/${stockCode}`);
			const data = await response.json();
			console.log(data)
			messagesCopy.push(
				{ text: `Here are the details of ${stockName}: ${data.price} $`, isUser: false, isData: false },
				{ text: 'Go Back', isUser: false, isData: true, value: exchangeCode }
			);
			setMessages(messagesCopy);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	return { messages, error, handleGetStocks, handleGetStockDetails };
};

export default useChat;
