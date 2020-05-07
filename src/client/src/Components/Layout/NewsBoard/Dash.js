import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Dash = () => {
	return (
		<div>
			login/register <Link to='/login'>login</Link>
		</div>
	);
};

export default connect()(Dash);
