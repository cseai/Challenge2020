import React,{ Fragment, useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Styles from '../../DeptSettings.module.css';
import Spinner from '../../../../theme/Spinner/Spin-0.8s-217px.svg';


import {
	DeptProfileInfoContentIcon,
	DeptProfileAbout,
	DeptMap,
} from '../../DeptSettingsContainer';

function DeptMapProfile(){
    const [deptMap, setDeptMap] = useState(false);
    const dept = useSelector(state=>state.dept.dept);
    return(
        <DeptProfileAbout className={Styles.eduHub__profile__about}>
        <DeptProfileInfoContentIcon
            className={Styles.eduHub__profile__about_heading}
            style={{ width: '155px' }}
            onClick={() => setDeptMap(!deptMap)}
        >
            <div className={Styles.eduHub__profile__info_content_side}></div>
            <p>Dept Map</p>
        </DeptProfileInfoContentIcon>
        {deptMap && (
            <Fragment>
                {/* EduHub and Parent*/}
                {dept.eduHub === null && dept.parent === null ? (
                    // This is EduHub
                    <Fragment>
                        <div className={Styles.eduHub__profile__about_about_details}>
                            <div>
                                <p>Showing map from EduHub</p>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        {/* <div className={Styles.eduHub__profile__about_about_details}><h3>Super Departments:</h3></div> */}
                        <div className={Styles.eduHub__profile__about_about_details}>
                            <div>
                                <p>EduHub:</p>
                            </div>
                            <Link to={`/dept/${dept.eduHub.username}`}>
                                <DeptProfileInfoContentIcon
                                    key={dept.eduHub.username}
                                    className={Styles.eduHub__profile__eduhubmap}
                                >
                                    <DeptMap className={Styles.eduHub__profile__eduhubmap_p}>
                                        {dept.eduHub.name}
                                    </DeptMap>
                                </DeptProfileInfoContentIcon>
                            </Link>
                            <div>
                                <p>Parent Department:</p>
                            </div>
                            <Link to={`/dept/${dept.parent.username}`}>
                                <DeptProfileInfoContentIcon
                                    key={dept.parent.username}
                                    className={Styles.eduHub__profile__eduhubmap}
                                >
                                    <DeptMap className={Styles.eduHub__profile__eduhubmap_p}>
                                        {dept.parent.name}
                                    </DeptMap>
                                </DeptProfileInfoContentIcon>
                            </Link>
                        </div>
                    </Fragment>
                )}

                {/* Children */}
                {dept.children.length < 1 ? (
                    <Fragment>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={Spinner}
                                alt='sub dept loading'
                                style={{ height: '40px', width: '40px' }}
                            />
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        {/* <div className={Styles.eduHub__profile__about_about_details}><h3>Child Departments:</h3></div> */}
                        <div className={Styles.eduHub__profile__about_about_details}>
                            <div>
                                <p>Child Departments:</p>
                            </div>
                            {dept.children.map((dept, index) => (
                                <Link to={`/dept/${dept.username}`}>
                                    <DeptProfileInfoContentIcon
                                        key={index}
                                        className={Styles.eduHub__profile__eduhubmap}
                                    >
                                        <DeptMap className={Styles.eduHub__profile__eduhubmap_p}>
                                            {dept.name}
                                        </DeptMap>
                                    </DeptProfileInfoContentIcon>
                                </Link>
                            ))}
                        </div>
                    </Fragment>
                )}
            </Fragment>
        )}
    </DeptProfileAbout>
    )
}

export default DeptMapProfile;