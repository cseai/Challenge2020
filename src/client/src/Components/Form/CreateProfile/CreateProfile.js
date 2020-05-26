import React, { Fragment, useState } from 'react';
import Styles from './CreateProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faPhoneAlt, faCalendar, faAddressCard } from '@fortawesome/free-solid-svg-icons';
// import PropTypes from 'prop-types';
import Main from './../../Layout/MainSection/Main';
const CreateProfile = () => {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        birthday:'',
        addressOne:'',
        addressTwo:'',
        country:'',
        zipCode:'',
        checkbox:'checked',
        info:''
    })

    const {firstName,lastName,email,phoneNumber,birthday,country,addressOne,addressTwo,zipCode,checkbox,info}=formData;
    
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})

    const onSubmit=e=>{
        e.preventDefault();
        console.log(formData);
    }

    return (
        <Main eduhub={
            <Fragment>
            {/* code start here */}
                <div className={Styles.create__profile}>
                    <h2  className={Styles.create__profile_title}>Profile informations</h2>
                    <form  className={Styles.create__profile__form} onSubmit={e=>onSubmit(e)}>
                        <div  className={Styles.create__profile__form_control}>
                            <div  className={Styles.create__profile__form_control_title}><label>First Name</label><span className="required"> * </span></div>
                            <div  className={Styles.create__profile__form_control_in}>
                                <div  className={Styles.create__profile__form_control_in_left}>
                                    <i><FontAwesomeIcon icon={faUser} /></i>
                                </div>
                                <input 
                                    type="text" 
                                    className={Styles.create__profile__form_control_in_field} 
                                    name="firstName" 
                                    value={firstName}
                                    onChange={e=>onChange(e)}
                                    required="required" 
                                />
                            </div>
                        </div>

                        <div  className={Styles.create__profile__form_control}>
                            <div  className={Styles.create__profile__form_control_title}><label>Last Name</label><span className="required"> * </span></div>
                            <div  className={Styles.create__profile__form_control_in}>
                                <div  className={Styles.create__profile__form_control_in_left}><i><FontAwesomeIcon icon={faUser} /></i></div>
                                <input 
                                    type="text"  
                                    className={Styles.create__profile__form_control_in_field} 
                                    name="lastName" 
                                    required="required"
                                    value={lastName}
                                    onChange={e=>onChange(e)}
                                />
                            </div>
                        </div>

                        <div  className={Styles.create__profile__form_control}>
                            <div  className={Styles.create__profile__form_control_title}><label>Email Address</label><span className="required"> * </span></div>
                            <div  className={Styles.create__profile__form_control_in}>
                                <div  className={Styles.create__profile__form_control_in_left}><i><FontAwesomeIcon icon={faAt} /></i></div>
                                <input 
                                    type="email"  
                                    className={Styles.create__profile__form_control_in_field} 
                                    name="email" 
                                    value={email}
                                    onChange={e=>onChange(e)}
                                    required="required" 
                                />
                            </div>
                        </div>
                        
                        <div  className={Styles.create__profile__form_control}>
                            <div  className={Styles.create__profile__form_control_title}><label>Phone Number</label><span className="required"> * </span></div>
                            <div  className={Styles.create__profile__form_control_in}>
                                <div  className={Styles.create__profile__form_control_in_left}><i><FontAwesomeIcon icon={faPhoneAlt} /></i>
                            </div>
                                <input 
                                    type="number"  
                                    className={Styles.create__profile__form_control_in_field} 
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={e=>onChange(e)} 
                                    required="required" 
                                />
                            </div>
                        </div>

                        <div  className={Styles.create__profile__form_control}>
                            <div  className={Styles.create__profile__form_control_title}><label>Birthday</label><span className="required"> * </span></div>
                            <div  className={Styles.create__profile__form_control_in}>
                                <div  className={Styles.create__profile__form_control_in_left}><i><FontAwesomeIcon icon={faCalendar} /></i></div>
                                <input 
                                    type="date"  
                                    className={Styles.create__profile__form_control_in_field} 
                                    name="birthday"
                                    value={birthday}
                                    onChange={e=>onChange(e)}
                                    required="required" />
                            </div>
                        </div>

                        <div  className={Styles.create__profile__form_control}>
                            <div  className={Styles.create__profile__form_control_title}><label>Present Address line 1</label><span className="required"> * </span></div>
                            <div  className={Styles.create__profile__form_control_in}>
                                <div  className={Styles.create__profile__form_control_in_left}><i><FontAwesomeIcon icon={faAddressCard} /></i></div>
                                <input 
                                    type="text"  
                                    className={Styles.create__profile__form_control_in_field} 
                                    name="addressOne"
                                    value={addressOne}
                                    onChange={e=>onChange(e)} 
                                    required="required"
                                />
                            </div>
                        </div>
                        <div  className={Styles.create__profile__form_control}>
                            <div  className={Styles.create__profile__form_control_title}><label>Present Address line 2</label><span className="required"> * </span></div>
                            <div  className={Styles.create__profile__form_control_in}>
                                <div className={Styles.create__profile__form_control_in_left}><i><FontAwesomeIcon icon={faAddressCard} /></i></div>
                                <input 
                                    type="text"  
                                    className={Styles.create__profile__form_control_in_field} 
                                    name="addressTwo" 
                                    value={addressTwo}
                                    onChange={e=>onChange(e)}
                                    required="required" 
                                />
                            </div>
                        </div>
                        
                        <div  className={Styles.create__profile__form_control__two}>
                            <div  className={Styles.create__profile__form_control__two_country}>
                                <label>Country</label>
                                
                                <select  className={Styles.create__profile__form_control__two_country_bg_country} name="country" value={country} onChange={e=>onChange(e)} >
                                    <option>Select</option>
                                    <option>Bangladesh</option>
                                    <option>India</option>
                                    <option>Srilanka</option>
                                    <option>Nepal</option>
                                </select>
                            </div>
                            <div  className={Styles.create__profile__form_control__two_zip_code}>
                                <label>Zip Code</label>
                                <input 
                                    type="number" 
                                    name="zipCode"
                                    value={zipCode}
                                    onChange={e=>onChange(e)}   
                                    className={Styles.create__profile__form_control__two_zip_code_bg_zip_code} 
                                />
                            </div>
                        </div>
                        <label  className={Styles.create__profile__form_control_check_box}>uncheck this if your current and permanent city is not same
                            <input type="checkbox" name="checkbox" value={checkbox} checked={checkbox} onChange={e=>onChange(e)}  />
                            <span  className={Styles.checkmark}></span>
                        </label>
                        
                        <div  className={Styles.create__profile__form_control}>
                            <label  className={Styles.create__profile__form_control_title}>Tell Something About you</label>
                            <textarea name="messege" rows="7" name="info" value={info} onChange={e=>onChange(e)} ></textarea>  
                        </div>

                        <div  className={Styles.create__profile__form_btn}>
                            <button type="submit" name="submit" >Submit</button>
                        </div> 
                    </form>
                </div>
            {/* code end here */}
            </Fragment>
        }/>
        
    )
}

// CreateProfile.propTypes = {

// }

export default CreateProfile
