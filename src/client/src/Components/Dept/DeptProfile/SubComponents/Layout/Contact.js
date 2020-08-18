import React,{useState,Fragment} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Styles from '../../DeptProfile.module.css'
import {
	DeptProfileInfoContentIcon,
	DeptProfileAbout
} from '../../DeptProfileContainer';

import {
	faPhoneAlt,
	faKeyboard,
	faAlignLeft,
	faMobileAlt,
	faEnvelope,
	faAt,
} from '@fortawesome/free-solid-svg-icons';

function ContactProfile(props){

    const dept = props.dept;
    const [contact, setContact] = useState(false);

    return(
        <DeptProfileAbout className={Styles.eduHub__profile__contact}>
            <DeptProfileInfoContentIcon
                className={Styles.eduHub__profile__contact_heading}
                onClick={() => setContact(!contact)}
            >
                <div className={Styles.eduHub__profile__info_content_side}></div>
                <p>Contacts</p>
            </DeptProfileInfoContentIcon>
            {contact &&
                (dept.contacts.length > 2 ? (
                    <Fragment>
                        <div className={Styles.eduHub__profile__contact_inner_heading}>
                            <p>
                                <span>
                                    <i>
                                        <FontAwesomeIcon icon={faPhoneAlt} />
                                    </i>
                                </span>{' '}
                                {dept.contacts[0].method}
                            </p>
                        </div>
                        <div className={Styles.eduHub__profile__contact_list}>
                            <ul>
                                <li>
                                    <i>
                                        <FontAwesomeIcon icon={faKeyboard} />
                                    </i>{' '}
                                    <span>{dept.contacts[0].numbers[0].number}</span>{' '}
                                </li>
                                <li>
                                    <i>
                                        <FontAwesomeIcon icon={faAlignLeft} />
                                    </i>
                                    <span> Register office</span>{' '}
                                </li>
                            </ul>
                        </div>

                        <div className={Styles.eduHub__profile__contact_inner_heading}>
                            <p>
                                <span>
                                    <i>
                                        <FontAwesomeIcon icon={faMobileAlt} />
                                    </i>
                                </span>
                                {dept.contacts[1].method}
                            </p>
                        </div>
                        <div className={Styles.eduHub__profile__contact_list}>
                            <ul>
                                <li>
                                    <i>
                                        <FontAwesomeIcon icon={faKeyboard} />
                                    </i>
                                    <span> {dept.contacts[1].numbers[0].number}</span>
                                </li>
                                <li>
                                    <i>
                                        <FontAwesomeIcon icon={faMobileAlt} />
                                    </i>
                                    <span>Register office</span>{' '}
                                </li>
                            </ul>
                        </div>

                        <div className={Styles.eduHub__profile__contact_inner_heading}>
                            <p>
                                <span>
                                    <i>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </i>
                                </span>{' '}
                                {dept.contacts[2].method}
                            </p>
                        </div>
                        <div className={Styles.eduHub__profile__contact_list}>
                            <ul>
                                <li>
                                    <i>
                                        <FontAwesomeIcon icon={faAt} />
                                    </i>{' '}
                                    <span>{dept.contacts[2].numbers[0].number}</span>{' '}
                                </li>
                            </ul>
                        </div>
                    </Fragment>
                ) : (
                    <div className={Styles.eduHub__profile__about_about_details}>
                        <p>Nothing to show!</p>
                    </div>
                ))}
        </DeptProfileAbout>
    )
}

export default ContactProfile;