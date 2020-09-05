import React from 'react'
import {useSelector} from 'react-redux';
import Styles from '../../DeptSettings.module.css';
import {
	DeptProfileInfo,
	DeptProfileInfoContentSide,
	DeptProfileInfoContentIcon,
} from '../../DeptSettingsContainer';


import Moment from 'react-moment';
import {
	faUniversity,
	faCheck,
	faCalendar,
	faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ProfileInfo(){
    const dept = useSelector(state=>state.dept.dept);
    return(
        <DeptProfileInfo>
            <div className={Styles.eduHub__profile__info_content}>
                <DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
                    <DeptProfileInfoContentSide className={Styles.eduHub__profile__info_content_side}>
                        {/* <div className={Styles.eduHub__profile__info_content_side}></div> */}
                    </DeptProfileInfoContentSide>
                    <i>
                        <FontAwesomeIcon icon={faUniversity} />
                    </i>
                </DeptProfileInfoContentIcon>
                <div className={Styles.text}>
                    <p>
                        {dept.category
                            ? dept.category.charAt(0).toUpperCase() + dept.category.slice(1)
                            : `Undefined`}
                    </p>
                </div>
            </div>

            <div className={Styles.eduHub__profile__info_content}>
                <DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
                    <DeptProfileInfoContentSide
                        className={Styles.eduHub__profile__info_content_side}
                    ></DeptProfileInfoContentSide>
                    <i>
                        <FontAwesomeIcon icon={faCheck} />
                    </i>
                </DeptProfileInfoContentIcon>
                <div className={Styles.text}>
                    <p>
                        {dept.name
                            ? dept.name.charAt(0).toUpperCase() + dept.name.slice(1)
                            : `Unknown!`}
                    </p>
                </div>
            </div>

            <div className={Styles.eduHub__profile__info_content}>
                <DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
                    <div className={Styles.eduHub__profile__info_content_side}></div>
                    <i>
                        <FontAwesomeIcon icon={faCalendar} />
                    </i>
                </DeptProfileInfoContentIcon>

                <div className={Styles.text}>
                    <div className={Styles.eduHub__profile__info_content_side}></div>
                    <p>
                        Established at{' '}
                        {dept.since ? <Moment format='YYYY'> {dept.since} </Moment> : `Unknown!`}{' '}
                        {/* <span>
                            <i>
                                <FontAwesomeIcon icon={faStar} />
                            </i>{' '}
                            <i>
                                <FontAwesomeIcon icon={faStar} />
                            </i>{' '}
                            <i>
                                <FontAwesomeIcon icon={faStar} />
                            </i>{' '}
                            <i>
                                <FontAwesomeIcon icon={faStar} />
                            </i>{' '}
                            <i>
                                <FontAwesomeIcon icon={faStarHalfAlt} />
                            </i>{' '}
                        </span> */}
                    </p>
                </div>
            </div>

            <div className={Styles.eduHub__profile__info_content}>
                <DeptProfileInfoContentIcon className={Styles.eduHub__profile__info_content_icon}>
                    <div className={Styles.eduHub__profile__info_content_side}></div>
                    <i>
                        <FontAwesomeIcon icon={faUserFriends} />
                    </i>
                </DeptProfileInfoContentIcon>
                <div className={Styles.text}>
                    <p>25.2k Members</p>
                </div>
            </div>
        </DeptProfileInfo>
    )
}

export default ProfileInfo;