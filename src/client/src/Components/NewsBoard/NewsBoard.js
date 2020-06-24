import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Styles from './NewsBoard.module.css';
import Main from './../Layout/MainSection/Main';
const NewsBoard = () => {
	return (
		<Fragment>
			<Main eduhub={<Fragment>this good things</Fragment>} />
		</Fragment>
	);
};

// const mapStateToProps=state=>({

// })

export default connect()(NewsBoard);
