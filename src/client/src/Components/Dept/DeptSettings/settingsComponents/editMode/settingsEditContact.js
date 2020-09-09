import React from 'react';
import Styles from '../../DeptSettings.module.css';
import Phone from './contacts/phone';
import Mobile from './contacts/mobile';
import Email from './contacts/email';
function Contact(){
    return(
    <div className={Styles.update__hub__form_control}>
        <div className={Styles.update__hub__form_control_title}>
            <label>Contacts</label>
            {/* <span className='required'> * </span> */}
        </div>
        <div className={Styles.update__hub__contact}>
            
            <Phone />
            <Mobile />
            <Email />     
        </div>
    </div>
    )
}
export default Contact;