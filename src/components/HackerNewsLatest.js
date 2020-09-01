import React from 'react';
import { Link } from 'react-router-dom';

const HackerNewsLatest = () => {
	return (
		<>
			<h2>This would show the latest articles</h2>

			<p>Can't find something interesting? Try <Link to='/search'>searching</Link>!</p>

			<ul className="list-group">
				<li className="list-group-item">
					<h3>Some Article</h3>

					<p className="text-muted small">
						Posted at sometime by someone
					</p>

					<p>
						<Link to='/articles/24336087' className="btn btn-sm btn-primary">Read more</Link>
					</p>
				</li>
			</ul>
		</>
	);
}

export default HackerNewsLatest;
