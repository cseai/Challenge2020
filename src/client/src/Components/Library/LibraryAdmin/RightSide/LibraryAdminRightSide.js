import React, { Fragment, useEffect, useState } from 'react';
import Styles from './LibraryAdminRightSide.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//css, spinner, container, icon
import Spinner from './../../../theme/Spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
// Sub Components
import LibraryHome from './../SubComponents/Home/LibraryHomeSection';
import DashboardSection from './../SubComponents/Dashboard/DashboardSection';
import UserSection from './../SubComponents/User/UserSection';
import BookSection from './../SubComponents/Book/BookSection';
import ResourceSection from './../SubComponents/Resource/ResourceSection';
import SettingSection from './../SubComponents/Setting/SettingSection';

const LibraryAdminRightSide = ({
	library,
	loading,
	sectionNames, 
	activeSection 
}) => {
	return (
		<Fragment>
			{loading || library === null || library === 'undefined' ? (
				<Fragment>
					<Spinner />
				</Fragment>
			) : (
				<Fragment>
					<div className={Styles.right__part}>
						{
							activeSection === sectionNames.dashboard && (<DashboardSection />) ? (<DashboardSection />) :
							activeSection === sectionNames.user && (<UserSection />) ? (<UserSection />) :
							activeSection === sectionNames.book && (<BookSection />) ? (<BookSection />) :
							activeSection === sectionNames.resource && (<ResourceSection />) ? (<ResourceSection />) :
							activeSection === sectionNames.setting && (<SettingSection />) ? (<SettingSection />) :
							(<LibraryHome library={library} />)
						}
					</div>
				</Fragment>	
			)}
        </Fragment>
	);
};

LibraryAdminRightSide.propTypes = {
	library: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	sectionNames: PropTypes.object.isRequired,
	activeSection: PropTypes.string.isRequired,
};

const mapStateToprops = (state) => ({
	loading: state.libadmin.loading,
});

export default connect(mapStateToprops, {})(LibraryAdminRightSide);
