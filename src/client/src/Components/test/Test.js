import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Styles from './Test.module.css';
import { testData } from './../../actions/testAction';

const Test = ({ auth: { user, loading }, eduhub, testData, match: { params } }) => {
	const loadtest = (e) => {
		e.preventDefault();
		testData();
	};

	return loading && user === null ? (
		<Fragment>loading</Fragment>
	) : (
		<Fragment>
			<div className={Styles.user_name}>{user.username}</div>
			<div className={Styles.user_email}>{user.email}</div>
			this is test two components
			<div onClick={(e) => loadtest(e)}>click herer</div>
			<div>
				dept id: {params.deptId} and lib id {params.libId}{' '}
			</div>
		</Fragment>
	);
};

Test.propTypes = {
	auth: PropTypes.object.isRequired,
	eduhub: PropTypes.object.isRequired,
	testData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	eduhub: state.eduhub,
});

export default connect(mapStateToProps, { testData })(Test);
