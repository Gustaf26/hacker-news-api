import React, { useEffect, useRef } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import useFetch from '../hooks/useFetch';
import useHook from '../hooks/useHook'

const HackerNewsArticle = (props) => {

	const [{ data, isLoading, error }, setUrl] = useFetch('');
	const { articleId } = useParams();
	 const location = useLocation();
	 const history = useHistory();

	const [lochis, setLochis] = useHook({location:location, history: history})
	console.log(lochis)

	useEffect(() => {
		// fetch article from Hacker News API
		if (!articleId) {
			return;
		}

		setUrl(`https://hn.algolia.com/api/v1/items/${articleId}`);

		setLochis({location:lochis.location, history: lochis.history.push(`${lochis.location.pathname}`)})

		return () =>{

			setLochis({location: lochis.location, history:''})

		}

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
						
										{lochis.location.state? 
								
								/* <div className="content" dangerouslySetInnerHTML={{ __html: data.text }}> */
										<dl>
											<dt className="col-sm-3"> Available at</dt>
											<dd className="col-sm-9"><a href={`${lochis.location.state.article.url}`}>{lochis.location.state.article.url}</a></dd> 
										</dl>
								
										:null}
									</dl>
								</div>

								<div>
									<Link to='/' className="btn btn-primary">&laquo; Back to front page</Link>
								</div>
								<div>

								{lochis.location.state? 

								<Link to={{
									pathname: `/search`,
									state: {
										search:lochis.location.state.searchParam
									}}} className="btn btn-sm btn-primary">&laquo; Go back (and forget this article)
									</Link>:null}
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
