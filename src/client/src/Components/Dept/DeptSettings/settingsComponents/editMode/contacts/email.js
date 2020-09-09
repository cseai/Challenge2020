import React,{Fragment} from 'react';
import {useSelector ,useDispatch} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMobileAlt,
	faKeyboard,
	faAlignLeft,
	faEnvelope,
	faAt,
	faPlus,
	faCheckCircle,
	faTimesCircle,
	faTrash,
    } from '@fortawesome/free-solid-svg-icons';
    import Styles from '../../../DeptSettings.module.css';
import {setContactEmailAdd,
    setNewContactEmailData,
    createContactEmailFieldAdd,
    createContactEmailFieldCancel,
    onChangeContactInput,
    onClickContactDelete
} from '../../../../../../actions/deptSettingsAction';
import ContactProfile from '../../viewMode/Contact';

export default function(){

    const contactEmailAdd = useSelector(state=>state.deptSettings.CONTACT_EMAIL_ADD);
    console.log(contactEmailAdd);
    const contactsData = useSelector(state=>state.deptSettings.CONTACTS_DATA);
    console.log(contactsData);
    const newContactEmailData = useSelector(state=>state.deptSettings.NEW_CONTACT_EMAIL_DATA);
    console.log(newContactEmailData);
    const dispatch = useDispatch();



    return(
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
                        <FontAwesomeIcon onClick={e =>  dispatch(setContactEmailAdd(true))} icon={faPlus} />
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
                                    onChange={(e) => dispatch(setNewContactEmailData(e))}
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
                                    onChange={(e) => dispatch(setNewContactEmailData(e))}
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
                                    onChange={(e) => dispatch(setNewContactEmailData(e))}
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
                                <button className='btn-success' onClick={e => dispatch(createContactEmailFieldAdd(e))}>Add</button>
                                <button className='btn-warning' onClick={e => dispatch(createContactEmailFieldCancel(e))}>Cancel</button>
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
    )
}