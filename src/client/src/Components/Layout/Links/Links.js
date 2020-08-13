import React, { Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Links = ({ depts }) => {
	const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

	const randmonFun = () => {
		return Math.floor(Math.random() * Math.floor(8));
	};

	return (
		<Fragment>
			<ListGroup>
				{Object.keys(depts).map((dept, i) => (
					<ListGroup.Item variant={variants[randmonFun()]} key={i}>
						<Link
							to={`${depts[dept].link}`}
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
								color: 'red ',
							}}
						>
							<div>{depts[dept].name.toUpperCase()} </div>
							<div>{`[${depts[dept].link}]`}</div>
						</Link>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Fragment>
	);
};

export default Links;
