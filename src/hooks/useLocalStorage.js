import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {

	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(key);

		return jsonValue !== null
			? JSON.parse(jsonValue)
			: initialValue;
	});

	useEffect(() => {
		const jsonValue = JSON.stringify(value);
		console.log(`Setting '${key}' to '${jsonValue}'`);
		localStorage.setItem(key, jsonValue);
	}, [key, value]);

	return [value, setValue];
}

export default useLocalStorage;
