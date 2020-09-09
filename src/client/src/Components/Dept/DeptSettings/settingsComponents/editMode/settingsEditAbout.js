import React from 'react';
import Styles from '../../DeptSettings.module.css';
import {useSelector,useDispatch} from 'react-redux';

import {setFormData} from '../../../../../actions/deptSettingsAction';

import {
    CreateProfileTextField
} from '../../DeptSettingsContainer';
function About(){
    let shortDescription = useSelector(state=> state.deptSettings.FORM_DATA.shortDescription);
    const dispatch = useDispatch();

    console.log(shortDescription);

    return(
        <div className={Styles.update__hub__form_control}>
            <div className={Styles.update__hub__form_control_title}>
                <label>Tell Something About This Hub</label>
            </div>
            <div>
                <CreateProfileTextField
                    rows='7'
                    name='shortDescription'
                    value={shortDescription}
                    onChange={(e) => dispatch(setFormData(e))}
                />
            </div>
        </div>
    )
}
export default About;