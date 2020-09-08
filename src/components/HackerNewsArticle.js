import React, { useEffect, useContext } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/authContext';


const HackerNewsArticle = (props) => {

	const [{ data, isLoading, error }, setUrl, setData] = useFetch('');
	const { articleId } = useParams();
	const {state} = useLocation();
	 
	const history = useHistory();
	const {toggleLogin} = useContext(AuthContext)

	useEffect(() => {

		// fetch article from Hacker News API
		if (!articleId) {
			return;
		}

		if (state && state.article) {

            // fetch article from location.state
            console.log("Article exists in location.state, using that to avoid an extra fetch");
			setData(state.article);
			
        } else if (articleId) {

            // fetch article from Hacker News API
            console.log("No article in location.state, fetching from HN API");
            setUrl(`https://hn.algolia.com/api/v1/items/${articleId}`);}

	}, [articleId, setUrl]);



	return (
		<article className="mt-3">
			{
				isLoading ? (
					<h2>Loading...</h2>
				) : (
					error ? (
						<div className="alert alert-warning">
							Bollocks. Something bad happened. Tea?

							<p className="small">{error}</p>
						</div>
					) : (
						data ? (
							<>
								<h1 className="h2">{data.title}</h1>

								<div className="meta">
									<dl className="row">
										<dt className="col-sm-3">Author</dt>
										<dd className="col-sm-9">{data.author}</dd>

										<dt className="col-sm-3">Posted</dt>
										<dd className="col-sm-9">
											<Moment unix format="YYYY-MM-DD hh:mm:ss">{data.created_at_i}</Moment> (<Moment unix fromNow>{data.created_at_i}</Moment>)
										</dd>

										<dt className="col-sm-3">Points</dt>
										<dd className="col-sm-9">{data.points}</dd>
									</dl>
								</div>
								<div>
									<Link to='/' className="btn btn-primary">&laquo; Back to front page</Link>
								</div>
								<div>

									{state? 
											
										<button className="btn btn-sm btn-primary" onClick={()=>history.goBack()}>Go back (and forget this article)</button>:null}

										<div className="px-2">
											Click here to log out
											<Link to={'/'} onClick={()=>toggleLogin()} className="btn btn-m btn-danger mx-2 my-3">
												Log out
											</Link>
										</div>
								</div>
							</>
						) : ''
					)
				)
			}
		</article>
	)
}

export default HackerNewsArticle;
