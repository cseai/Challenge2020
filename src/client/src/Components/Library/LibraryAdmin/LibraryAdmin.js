import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// css and icon
import Styles from './LibraryAdmin.module.css';
import { LibraryAdminMain } from './LibraryAdminContainer';

// components
import Nav from './../../Layout/Nav/NavBar';
import ThemeChanger from './../../theme/ThemeChanger/ThemeChanger';
import LibraryAdminLeftSide from './LeftSide/LibraryAdminLeftSide';
import LibraryAdminRightSide from './RightSide/LibraryAdminRightSide';
import Spinner from './../../theme/Spinner/Spinner';

// action
import { getLibrary } from './../../../actions/libraryAction';

const LibraryAdmin = ({ getLibrary, lib: { libLoading, library } }) =>{
    useEffect(() => {
		getLibrary();
	}, [getLibrary]);
    
    // All valid Section Names
    const [sectionNames] = useState({
		library: 'library',
		dashboard: 'dashboard',
		user: 'user',
		book: 'book',
		resource: 'resource',
		setting: 'setting',
	});

    // Active Section Name
    const [activeSection, setActiveSection] = useState(sectionNames.library);

    // Update Active Section
    const updateActiveSection = (section) => {
        if(Object.values(sectionNames).includes(section)){
            setActiveSection(section);
        }
    };

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
					<LibraryAdminMain className={Styles.main__section}>
						<div className={Styles.container__fluid}>
							<div className={Styles.main__section_data}>
								{/* <!-- left bar --> */}
								{library && <LibraryAdminLeftSide library={library} sectionNames={sectionNames} activeSection={activeSection} updateActiveSection={updateActiveSection} />}
								{/* <!-- right part --> */}
								{library && <LibraryAdminRightSide id={library.library.id} sectionNames={sectionNames} activeSection={activeSection} />}
							</div>
						</div>
					</LibraryAdminMain>
				</Fragment>
			)}
		</Fragment>
	);
};


LibraryAdmin.propTypes = {
	getLibrary: PropTypes.func.isRequired,
	library: PropTypes.object,
};

const mapStateToprops = (state) => ({
	lib: state.library,
});
export default connect(mapStateToprops, { getLibrary })(LibraryAdmin);

