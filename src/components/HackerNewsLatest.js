import React, {useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch'
import { AuthContext } from '../context/authContext';

const HackerNewsLatest = () => {

	const [query, setQuery] = useState('http://hn.algolia.com/api/v1/search?tags=front_page');
	const [{ data, isLoading, error }, setUrl] = useFetch('');

	const {login, toggleLogin} = useContext(AuthContext)

	useEffect(()=>{

		setUrl(query)
		console.log('user logged in =', login)

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
		<> {login===false? 			
			
			<div className="px-2">
				Please log in to see latest news
				<button onClick={()=>toggleLogin(login)} className="btn btn-m btn-warning mx-2 my-3">
					Log in
				</button>
			</div>:
			<div>
				<h2>This would show the latest articles</h2>

				<p>Can't find something interesting? Try <Link to='/search'>searching</Link>!</p>
				<div className="px-2">
					Click here to log out
					<button onClick={()=>toggleLogin(login)} className="btn btn-m btn-danger mx-2 my-3">
						Log out
					</button>
				</div>

				<ul className="list-group">
					<li id="newsContainer" className="list-group-item">

						<div id="add" className="col-3">
							<h3>Some Advertisment</h3>

							<p className="text-muted small">
								Sponsored by someone
							</p>

							<p>
								<button className="btn btn-sm btn-primary">Go to advertisment</button>
							</p>
						</div>
						<div className="col-8">
							{data.hits?
							<ul className="search-results list-group">
								{renderNews(data.hits)}
							</ul>:null}
						</div>
					</li>
				</ul>
			</div>}
		</>
	);
}

export default HackerNewsLatest;
