import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// css and icon
import Styles from './UserLibrary.module.css';
import { UserLibraryMain } from './UserLibraryContainer';
// components
import Nav from './../../Layout/Nav/NavBar';
import ThemeChanger from './../../theme/ThemeChanger/ThemeChanger';
import UserLibraryLeftSide from './LeftSide/UserLibraryLeftSide';
import UserLibraryRightSide from './RightSide/UserLibraryRightSide';
import Spinner from './../../theme/Spinner/Spinner';
// action
import { getLibrary } from './../../../actions/libraryAction';

const UserLibrary = ({ getLibrary, lib: { libLoading, library } }) => {
	useEffect(() => {
		getLibrary();
	}, [getLibrary]);

	return (
		<Fragment>
			{libLoading || library === null || library === 'undefined' ? (
				<Fragment>
					<Spinner />
				</Fragment>
			) : (
				<Fragment>
					<ThemeChanger />
					<Nav />
					<UserLibraryMain className={Styles.main__section}>
						<div className={Styles.container__fluid}>
							<div className={Styles.main__section_data}>
								{/* <!-- left bar --> */}
								{library && <UserLibraryLeftSide library={library} />}
								{/* <!-- right part --> */}
								{library && <UserLibraryRightSide id={library.library.id} />}
							</div>
						</div>
					</UserLibraryMain>
				</Fragment>
			)}
		</Fragment>
	);
};

UserLibrary.propTypes = {
	getLibrary: PropTypes.func.isRequired,
	library: PropTypes.object,
};

const mapStateToprops = (state) => ({
	lib: state.library,
});
export default connect(mapStateToprops, { getLibrary })(UserLibrary);
