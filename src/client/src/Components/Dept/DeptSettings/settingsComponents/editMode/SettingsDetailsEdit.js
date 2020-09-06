import React from 'react';

export default ()=>{
    return(
        <div className={Styles.update__hub__container}>
            <form className={Styles.update__hub__form} onSubmit={(e) => onSubmitDetailSection(e)}>
                {/* Name  */}
                <div className={Styles.update__hub__form_control}>
                    <div className={Styles.update__hub__form_control_title}>
                        <label>Name</label>
                        <span className={Styles.required}> * </span>
                    </div>
                    <div className={Styles.update__hub__form_control_in}>
                        <div className={Styles.update__hub__form_control_in_left}>
                            <ProfileIcon>
                                <FontAwesomeIcon icon={faUniversity} />
                            </ProfileIcon>
                        </div>
                        <CreateProfileFormControlInField
                            type='text'
                            className={Styles.update__hub__form_control_in_field}
                            name='name'
                            value={name}
                            onChange={(e) => onChangeDetailInput(e)}
                        />
                    </div>
                </div>
                {/* Username  */}
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
                            onChange={(e) => onChangeDetailInput(e)}
                        />
                    </div>
                </div>
                {/* Established Date  */}
                <div className={Styles.update__hub__form_control}>
                    <div className={Styles.update__hub__form_control_title}>
                        <label>Established</label>
                        {/* <span className='required'> * </span> */}
                    </div>
                    <div className={Styles.update__hub__form_control_in}>
                        <div className={Styles.update__hub__form_control_in_left}>
                            <ProfileIcon>
                                <FontAwesomeIcon icon={faCalendar} />
                            </ProfileIcon>
                        </div>
                        <CreateProfileFormControlInField
                            type='date'
                            className={Styles.update__hub__form_control_in_field}
                            name='since'
                            value={since}
                            onChange={(e) => onChangeDetailInput(e)}
                        />
                    </div>
                </div>
                {/* About  */}
                <div className={Styles.update__hub__form_control}>
                    <div className={Styles.update__hub__form_control_title}>
                        <label>Tell Something About This Hub</label>
                    </div>
                    <div>
                        <CreateProfileTextField
                            rows='7'
                            name='shortDescription'
                            value={shortDescription}
                            onChange={(e) => onChangeDetailInput(e)}
                        ></CreateProfileTextField>
                    </div>
                </div>
                {/* Contact */}
                <div className={Styles.update__hub__form_control}>
                    <div className={Styles.update__hub__form_control_title}>
                        <label>Contacts</label>
                        {/* <span className='required'> * </span> */}
                    </div>
                    <div className={Styles.update__hub__contact}>
                        <div id="contactPhoneDiv" className={Styles.update__hub__contact__method__div}>
                            <div className={Styles.update__hub__contact_inner_heading}>
                                <p>
                                    <span>
                                        <i>
                                            <FontAwesomeIcon icon={faPhoneAlt} />
                                        </i>
                                    </span>{' '}
                                    Phone
                                    {/* {dept.contacts[0].method} */}
                                </p>
                                <span>
                                    <i>
                                        <FontAwesomeIcon onClick={e => createContactPhoneField(e)} icon={faPlus} />
                                    </i>
                                </span>
                            </div>
                            {contactPhoneAdd && (
                                <div className={Styles.update__hub__contact_list}>
                                    <ul>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faKeyboard} />
                                            </i>
                                            <span>
                                                <input
                                                    type='text'
                                                    name="number"
                                                    required
                                                    value={newContactPhoneData.number}
                                                    onChange={(e) => onChangeNewContactPhoneData(e)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAlignLeft} />
                                            </i>
                                            <span>
                                                <textarea 
                                                    type='text'
                                                    name="description"
                                                    value={newContactPhoneData.description}
                                                    onChange={(e) => onChangeNewContactPhoneData(e)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </i>
                                            <span>
                                                <select
                                                    name="active"
                                                    onChange={(e) => onChangeNewContactPhoneData(e)}
                                                >
                                                    {newContactPhoneData.active ? (
                                                        <Fragment>
                                                            <option value={true} selected >Active</option>
                                                            <option value={false}>Deactive</option>
                                                        </Fragment>
                                                    ):(
                                                        <Fragment>
                                                            <option value={true}>Active</option>
                                                            <option value={false} selected >Deactive</option>
                                                        </Fragment>
                                                    )}
                                                </select>
                                                <button className='btn-success' onClick={e => createContactPhoneFieldAdd(e)}>Add</button>
                                                <button className='btn-warning' onClick={e => createContactPhoneFieldCancel(e)}>Cancel</button>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {Object.entries(contactsData[0].numbers).map(([key,number]) => (
                                <div className={Styles.update__hub__contact_list}>
                                    <ul>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faKeyboard} />
                                            </i>
                                            <span>
                                                <input
                                                    type='text'
                                                    name="number"
                                                    value={number.number}
                                                    // value="1784394509"
                                                    onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAlignLeft} />
                                            </i>
                                            <span>
                                                <textarea 
                                                    type='text'
                                                    name="description"
                                                    value={number.description}
                                                    // value="Register ofice, Pabna University of Science and Technology"
                                                    onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                {number.active ? (
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                ):(
                                                    <FontAwesomeIcon icon={faTimesCircle} />
                                                )}
                                            </i>
                                            <span>
                                                <select
                                                    name="active"
                                                    value={number.active}
                                                    onChange={(e, method='phone', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                >
                                                    <option value={true}>Active</option>
                                                    <option value={false}>Deactive</option>
                                                </select>
                                                <i>
                                                    <FontAwesomeIcon icon={faTrash} onClick={(e, method='phone', number_index=key) => onClickContactDelete(e, method, number_index)} />
                                                </i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>)
                            )}
                        </div>
                        <div className={Styles.update__hub__contact__method__div}>
                            <div className={Styles.update__hub__contact_inner_heading}>
                                <p>
                                    <span>
                                        <i>
                                            <FontAwesomeIcon icon={faMobileAlt} />
                                        </i>
                                    </span>
                                    Mobile
                                    {/* {dept.contacts[1].method} */}
                                </p>
                                <span>
                                    <i>
                                        <FontAwesomeIcon onClick={e => createContactMobileField(e)} icon={faPlus} />
                                    </i>
                                </span>
                            </div>
                            {contactMobileAdd && (
                                <div className={Styles.update__hub__contact_list}>
                                    <ul>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faKeyboard} />
                                            </i>
                                            <span>
                                                <input
                                                    type='text'
                                                    name="number"
                                                    required
                                                    value={newContactMobileData.number}
                                                    onChange={(e) => onChangeNewContactMobileData(e)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAlignLeft} />
                                            </i>
                                            <span>
                                                <textarea 
                                                    type='text'
                                                    name="description"
                                                    value={newContactMobileData.description}
                                                    onChange={(e) => onChangeNewContactMobileData(e)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </i>
                                            <span>
                                            <select
                                                    name="active"
                                                    onChange={(e) => onChangeNewContactMobileData(e)}
                                                >
                                                    {newContactMobileData.active ? (
                                                        <Fragment>
                                                            <option value={true} selected >Active</option>
                                                            <option value={false}>Deactive</option>
                                                        </Fragment>
                                                    ):(
                                                        <Fragment>
                                                            <option value={true}>Active</option>
                                                            <option value={false} selected >Deactive</option>
                                                        </Fragment>
                                                    )}
                                                </select>
                                                <button className='btn-success' onClick={e => createContactMobileFieldAdd(e)}>Add</button>
                                                <button className='btn-warning' onClick={e => createContactMobileFieldCancel(e)}>Cancel</button>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {Object.entries(contactsData[1].numbers).map(([key,number]) => (
                                <div className={Styles.update__hub__contact_list}>
                                    <ul>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faKeyboard} />
                                            </i>
                                            <span>
                                                <input
                                                    type='text'
                                                    name="number"
                                                    value={number.number}
                                                    // value="01745678913"
                                                    onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAlignLeft} />
                                            </i>
                                            <span>
                                                <textarea 
                                                    type='text'
                                                    name="description"
                                                    value={number.description}
                                                    // value="Register ofice, Pabna University of Science and Technology"
                                                    onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                />
                                            </span>{' '}
                                        </li>
                                        <li>
                                            <i>
                                                {number.active ? (
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                ):(
                                                    <FontAwesomeIcon icon={faTimesCircle} />
                                                )}
                                            </i>
                                            <span>
                                                <select
                                                    name='active'
                                                    value={number.active}
                                                    onChange={(e, method='mobile', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                >
                                                    <option value={true}>Active</option>
                                                    <option value={false}>Deactive</option>
                                                </select>
                                                <i>
                                                    <FontAwesomeIcon icon={faTrash} onClick={(e, method='mobile', number_index=key) => onClickContactDelete(e, method, number_index)} />
                                                </i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>)
                            )}
                        </div>
                        <div className={Styles.update__hub__contact__method__div}>
                            <div className={Styles.update__hub__contact_inner_heading}>
                                <p>
                                    <span>
                                        <i>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </i>
                                    </span>{' '}
                                    Email
                                    {/* {dept.contacts[2].method} */}
                                </p>
                                <span>
                                    <i>
                                        <FontAwesomeIcon onClick={e => createContactEmailField(e)} icon={faPlus} />
                                    </i>
                                </span>
                            </div>
                            {contactEmailAdd && (
                                <div className={Styles.update__hub__contact_list}>
                                    <ul>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAt} />
                                            </i>{' '}
                                            <span>
                                                <input
                                                    type='text'
                                                    name="number"
                                                    required
                                                    value={newContactEmailData.number}
                                                    onChange={(e) => onChangeNewContactEmailData(e)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAlignLeft} />
                                            </i>
                                            <span>
                                                <textarea 
                                                    type='text'
                                                    name="description"
                                                    value={newContactEmailData.description}
                                                    onChange={(e) => onChangeNewContactEmailData(e)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </i>
                                            <span>
                                                <select
                                                    name="active"
                                                    onChange={(e) => onChangeNewContactEmailData(e)}
                                                >
                                                    {newContactEmailData.active ? (
                                                        <Fragment>
                                                            <option value={true} selected >Active</option>
                                                            <option value={false}>Deactive</option>
                                                        </Fragment>
                                                    ):(
                                                        <Fragment>
                                                            <option value={true}>Active</option>
                                                            <option value={false} selected >Deactive</option>
                                                        </Fragment>
                                                    )}
                                                </select>
                                                <button className='btn-success' onClick={e => createContactEmailFieldAdd(e)}>Add</button>
                                                <button className='btn-warning' onClick={e => createContactEmailFieldCancel(e)}>Cancel</button>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {Object.entries(contactsData[2].numbers).map(([key,number]) => (
                                <div className={Styles.update__hub__contact_list}>
                                    <ul>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAt} />
                                            </i>{' '}
                                            <span>
                                                <input
                                                    type='text'
                                                    name="number"
                                                    value={number.number}
                                                    // value="register@pust.ac.bd"
                                                    onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                <FontAwesomeIcon icon={faAlignLeft} />
                                            </i>
                                            <span>
                                                <textarea 
                                                    type='text'
                                                    name="description"
                                                    value={number.description}
                                                    // value="Register ofice, Pabna University of Science and Technology"
                                                    onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                />
                                            </span>
                                        </li>
                                        <li>
                                            <i>
                                                {number.active ? (
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                ):(
                                                    <FontAwesomeIcon icon={faTimesCircle} />
                                                )}
                                            </i>
                                            <span>
                                                <select
                                                    name='active'
                                                    value={number.active}
                                                    onChange={(e, method='email', number_index=key) => onChangeContactInput(e, method, number_index)}
                                                >
                                                    <option value={true}>Active</option>
                                                    <option value={false}>Deactive</option>
                                                </select>
                                                <i>
                                                    <FontAwesomeIcon icon={faTrash} onClick={(e, method='email', number_index=key) => onClickContactDelete(e, method, number_index)} />
                                                </i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>)
                            )}
                        </div>
                    </div>
                </div>
                {/* Address */}
                <div className={Styles.update__hub__form_control}>
                    <div className={Styles.update__hub__form_control_title}>
                        <i><FontAwesomeIcon icon={faLocationArrow} /></i>
                        <label>Address</label>
                        {/* <span className={Styles.required}> * </span> */}
                    </div>
                    <div>
                        <DeptProfileAbout
                            className={Styles.update__hub__contact}
                            style={{ border: 'none' }}
                        >
                            <ul>
                                <li>
                                    <i>
                                        <FontAwesomeIcon icon={faCity} />
                                    </i>{' '}
                                    <span> Rajapur ,6600, Pabna</span>
                                </li>
                            </ul>
                        </DeptProfileAbout>
                        <DeptProfileInfoContentIcon className={Styles.update__hub__location_map}>
                            <p>Use map</p>
                        </DeptProfileInfoContentIcon>
                    </div>
                </div>
                <div className={Styles.update__hub__form_btn}>
                    <button type='submit' name='submit'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}