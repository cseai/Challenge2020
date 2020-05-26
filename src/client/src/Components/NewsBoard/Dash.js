import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const st={
	color:'red',
	fontSize:'16px'
}

const Dash = () => {
	return (
		<Fragment>
			<Link to='/eduhub-profile'><p style={st}>eduhub profile</p> </Link>
			<Link to='/create-user-profile'><p style={st}>create user profile</p> </Link>
		</Fragment>
	);
};

export default connect()(Dash);
