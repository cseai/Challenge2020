import React from 'react';
import Styles from '../../DeptSettings.module.css';
import {useSelector,useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {setFormData} from '../../../../../actions/deptSettingsAction';

import {
	ProfileIcon,
	CreateProfileFormControlInField,
} from '../../DeptSettingsContainer';
function Username(){
    let username = useSelector(state=> state.deptSettings.FORM_DATA.username);
    const dispatch = useDispatch();

    console.log(username);

    return(
        <div className={Styles.update__hub__form_control}>
        <div className={Styles.update__hub__form_control_title}>
            <label>Username</label>
            <span className={Styles.required}> * </span>
        </div>
        <div className={Styles.update__hub__form_control_in}>
            <div className={Styles.update__hub__form_control_in_left}>
                <ProfileIcon>
                    <FontAwesomeIcon icon={faAt} />
                </ProfileIcon>
            </div>
            <CreateProfileFormControlInField
                type='text'
                className={Styles.update__hub__form_control_in_field}
                name='username'
                value={username}
                onChange={(e) => dispatch(setFormData(e))}
            />
        </div>
    </div>
    )
}
export default Username;