import React, { Fragment } from 'react';
import Styles from './LibraryHomeSection.module.css';
import PropTypes from 'prop-types';

const LibraryHome = ({
	library,
}) =>{
    return (
        <Fragment>
            <div className={Styles.right__part_main}>
                <div>
                    <h2>{library.name} <span>[@{library.username}]</span></h2>
                    <h3>id: {library.id}</h3>
                </div>
            </div>
        </Fragment>
    );
};

LibraryHome.propTypes = {
	library: PropTypes.object.isRequired,
};

export default LibraryHome;