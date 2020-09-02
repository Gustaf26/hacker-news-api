import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch'

const HackerNewsLatest = () => {

	const [query, setQuery] = useState('http://hn.algolia.com/api/v1/search?tags=front_page');
	const [{ data, isLoading, error }, setUrl] = useFetch('');

	useEffect(()=>{

		setUrl(query)

	},[])


	const renderNews = hits => {

		console.log(hits)
		 return hits.map((article, index) => (
		 	<li key={index} className="list-group-item">
		 		<h3>{article.title}</h3>

		 		<p className="text-muted small">
		 			Posted at {article.created_at} by {article.author}
		 		</p>

		 		<p>
		 			<Link to={{
		 				pathname: `/articles/${article.objectID}`,
		 				state: {
	 						article
		 				},
		 			}} className="btn btn-sm btn-primary">Read more</Link>
		 		</p>
		 	</li>
		 ))
	}


	return (
		<>
			<h2>This would show the latest articles</h2>

			<p>Can't find something interesting? Try <Link to='/search'>searching</Link>!</p>

			<ul className="list-group">
				<li className="list-group-item">

				<div>
					<h3>Some Article</h3>

					<p className="text-muted small">
						Posted at sometime by someone
					</p>

					<p>
						<Link to='/articles/24336087' className="btn btn-sm btn-primary">Read more</Link>
					</p>
				</div>
				<div>
					{data.hits?
					<ul className="search-results list-group">
						{renderNews(data.hits)}
					</ul>:null}
				</div>
				</li>
			</ul>
		</>
	);
}

export default HackerNewsLatest;
