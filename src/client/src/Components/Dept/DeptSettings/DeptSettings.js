import React, { Fragment, useState, useEffect } from 'react';
import { connect,useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './DeptSettings.module.css';
import './DeptSettings.module.css';
import Main from '../../Layout/MainSection/Main';
import {
	DeptProfile,

} from './DeptSettingsContainer';
import Spinner from './../../theme/Spinner/Spin-0.8s-217px.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// action
import { getDept } from '../../../actions/deptAction';





//Sanzid Importing
import SettingsCoverPhoto from './settingsComponents/SettingsCovrPhoto';
import DeptSettingsBar from './settingsComponents/DeptSettingsBar';
import DeptSettingsDetailSectionButton from './settingsComponents/DeptSettingsDetailSectionButton'
import ViewDetails from './settingsComponents/viewMode/index';
import Name from './settingsComponents/editMode/settingsEditName';
import Username from './settingsComponents/editMode/settingsEditUsername';
import Established from './settingsComponents/editMode/settingsEditEstablishedDate';
import About from './settingsComponents/editMode/settingsEditAbout';
import Address from './settingsComponents/editMode/settingsEditAddress';
import Contact from './settingsComponents/editMode/settingsEditContact';

//Sanzid Importing

const DeptSettings = ({ getDept, isAuthenticated, match: { params }, dept: { loading, dept } }) => {
	//Sanzid Editing....

	const detailSection = useSelector(state=> state.deptSettings.DETAIL_SECTION);
	const memberSection = useSelector(state=> state.deptSettings.MEMBER_SECTION);
	const controllerSection = useSelector(state=> state.deptSettings.CONTROLLER_SECTION);
	const createSection = useSelector(state=> state.deptSettings.CREATE_SECTION);
	const detailSectionEditOption = useSelector(state=> state.deptSettings.DETAIL_SECTION_EDIT_OPTION);
	console.log(detailSection,"Is details");



	//Sanzid Editing...






	

	


	// dummy contacts data
	

	

	

	const onSubmitDetailSection = (e) => {
		e.preventDefault();
		// updateDept(formData);
		// console.log(typeof formData);
	};


	//eduhub loading before page show
	useEffect(() => {
		const deptUsername = params.deptUsername;
		getDept(deptUsername);
		console.log(params);
	}, [getDept, params.deptUsername]);
	
	// Handle Detail Section Mode [View or Edit]
	
 
	

	





	return loading && dept === null ? (
		<Main
			eduhub={
				<Fragment>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={Spinner} alt='loading...' />
					</div>
				</Fragment>
			}
		/>
	) : (dept === null && loading === false) ? (<Redirect to='/error' />) : 
	(<Main
			eduhub={
				<Fragment>
					{/* <!-- start code for here --> */}
					<DeptProfile>
						{/* <!-- Cover photo --> */}
						<SettingsCoverPhoto/>  
					</DeptProfile>
                    <DeptProfile>
                        <div className={Styles.settings__container}>
							{/** Dept settings bar components */}
							<DeptSettingsBar/>
							{/* Detail Section */}
                            {detailSection && (
								<Fragment>
									{/** Dept Settings Detail Section Button  Added...*/}
									< DeptSettingsDetailSectionButton />
									
									{detailSectionEditOption ? (
										// Edit Mode 
										// {/* code start here */}
										<div className={Styles.update__hub__container}>
											<form className={Styles.update__hub__form} onSubmit={(e) => onSubmitDetailSection(e)}>
												{/* Name  */}
												<Name />
												{/* Username  */}
												<Username />
												{/* Established Date  */}
													<Established />
												{/* About  */}
												<About />
												{/* Contact */}
												<Contact/>
												



												
												{/* Address */}
													<Address />
												<div className={Styles.update__hub__form_btn}>
													<button type='submit' name='submit'>
														Save
													</button>
												</div>
											</form>
										</div>
										// {/* code end here */}

									) : (
										// View Mode 
										<Fragment>
											<ViewDetails />
											{ /* user info */}
										</Fragment>
									)}
								</Fragment>
                            )}

							{/* Members Section */}
                            {memberSection && (
                                <div>Members</div>
                            )}

							{/* Controllers Section */}
                            {controllerSection && (
                                <div>Controller</div>
                            )}

							{/* Create Section  */}
                            {createSection && (
                                <div>Create</div>
                            )}
                        </div>
                    </DeptProfile>
                </Fragment>
			}
		/>
	);
};

DeptSettings.propTypes = {
	getDept: PropTypes.func.isRequired,
	dept: PropTypes.array.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	dept: state.dept,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getDept })(DeptSettings);