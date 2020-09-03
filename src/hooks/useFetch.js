import { useState, useEffect } from 'react';

const useFetch = (initialUrl) => {
	const [url, setUrl] = useState(initialUrl);
	const [data, setData] = useState({});
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log(`useFetch URL changed to:`, url);

		// bail if no url (or url is empty)
		if (!url) {
			return;
		}

		// (set loading-state to true)
		setData({});
		setIsLoading(true);

		// do async http request
		// parse data as json
		fetch(url)
			.then(res => res.json())
			.then(res => {
				// set stateful data
				console.log("Got data back from API!");
				setData(res);
			})
			.catch(err => {
				console.error("Something bad happened :(", err);
				setError(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});

	}, [url]);

	return [
		{ data, isLoading, error },
		setUrl,
		setData
	];
}

export default useFetch;
