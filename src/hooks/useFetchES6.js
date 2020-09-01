import { useEffect, useState } from 'react';

const useFetch = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl);
	const [data, setData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			if (!url) {
				return;
			}
			console.log(`Triggering fetching of ${url}`);
			setIsLoading(true);

			try {
				const res = await fetch(url);
				const data = await res.json();
				setData(data);

			} catch (err) {
				setError(err.message);

			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [url])

	return [{ data, isLoading, error }, setUrl];
}

export default useFetch;
