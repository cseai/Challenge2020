import {
    SET_INFO,
    SET_CONTACT,
    SET_LOCATION,
    SET_DEPT_MAP,
    SET_DETAIL_SECTION,
    SET_MEMBER_SECTION,
    SET_CONTROLLER_SECTION,
    SET_CREATE_SECTION,
    SET_DETAIL_SECTION_EDIT_OPTION,
    SET_DETAIL_SECTION_BUTTON_VALUE,
    SET_CONTACTS_DATA,
    SET_NEW_CONTACT_EMAIL_DATA,
    SET_NEW_CONTACT_MOBILE_DATA,
    SET_NEW_CONTACT_PHONE_DATA,
    SET_FORM_DATA,
    SET_CONTACT_EMAIL_ADD,
    SET_CONTACT_MOBILE_ADD,
    SET_CONTACT_PHONE_ADD} from './../actions/types';
/*
import {
	setInfo,
	setContact,
	setLocation,
	setDeptMap,
	setDetailSection,
	setMemberSection,
	setControllerSection,
	setCreateSection,
	setDetailSectionEditOption,
	setDetailSectionButtonValue,
	setContactPhoneAdd,
	setContactMobileAdd,
	setContactEmailAdd,
	setFormData ,
	setNewContactPhoneData,
	setNewContactMobileData,
    setNewContactEmailData,
    setContactsData
} from './actionCreator';
*/

const dummyData =[
    {
        method: 'phone',
        numbers: [
            {
                number: '01234567898',
                description: 'Register ofice, Pabna University of Science and Technology',
                active: true
            },
            {
                number: '23234567898',
                description: 'Controller ofice, Pabna University of Science and Technology',
                active: true
            }
        ]
    },
    {
        method: 'mobile',
        numbers: [
            {
                number: '01745678913',
                description: 'Register ofice, Pabna University of Science and Technology',
                active: true
            },
            {
                number: '01945678913',
                description: 'Controller ofice, Pabna University of Science and Technology',
                active: false
            }
        ]
    },
    {
        method: 'email',
        numbers: [
            {
                number: 'register@pust.ac.bd',
                description: 'Register ofice, Pabna University of Science and Technology',
                active: true
            },
            {
                number: 'controller@pust.ac.bd',
                description: 'Controller ofice, Pabna University of Science and Technology',
                active: true
            }
        ]
    }
]




const InitialState = {
   INFO : false,
   CONTACT : false,
   LOCATION : false,
   DEPT_MAP : false,
   DETAIL_SECTION : true,
   MEMBER_SECTION : false,
   CONTROLLER_SECTION : false,
   CREATE_SECTION : false,
   DETAIL_SECTION_EDIT_OPTION : false,
   DETAIL_SECTION_BUTTON_VALUE : 'Edit',
   CONTACT_EMAIL_ADD : false,
   CONTACT_MOBILE_ADD : false,
   CONTACT_PHONE_ADD : false,
   CONTACTS_DATA : dummyData,
   NEW_CONTACT_EMAIL_DATA : {
    number: '',
    description: '',
    active: true
},
   NEW_CONTACT_MOBILE_DATA : {
    number: '',
    description: '',
    active: true
},
   NEW_CONTACT_PHONE_DATA : {
    number: '',
    description: '',
    active: true
},
   FORM_DATA : {
    name: '',
    username: '',
    since: '',
    shortDescription: '',
    contacts: []
    }
}

export default (state = InitialState , action)=>{
    switch(action.type){
        case SET_INFO: return {
            ...state,
            INFO : action.payload
        }
        case SET_CONTACT: return {
            ...state,
            CONTACT : action.payload
        }
        case SET_LOCATION: return {
            ...state,
            LOCATION: action.payload
        }
        case SET_DEPT_MAP: return {
            ...state,
            DEPT_MAP : action.payload
        }
        case SET_DETAIL_SECTION: return {
            ...state,
            DETAIL_SECTION : action.payload,
            MEMBER_SECTION : false,
            CONTROLLER_SECTION :false,
            CREATE_SECTION : false
        }
        case SET_MEMBER_SECTION: return {
            ...state,
            DETAIL_SECTION : false,
            MEMBER_SECTION : action.payload,
            CONTROLLER_SECTION :false,
            CREATE_SECTION :false
        }
        case SET_CONTROLLER_SECTION: return {
            ...state,
            DETAIL_SECTION : false,
            MEMBER_SECTION : false,
            CONTROLLER_SECTION :action.payload,
            CREATE_SECTION :false
        }
        case SET_CREATE_SECTION: return {
            ...state,
            DETAIL_SECTION : false,
            MEMBER_SECTION : false,
            CONTROLLER_SECTION :false,
            CREATE_SECTION : action.payload
        }
        case SET_DETAIL_SECTION_EDIT_OPTION: return {
            ...state,
            DETAIL_SECTION_EDIT_OPTION : action.payload,
            DETAIL_SECTION_BUTTON_VALUE : action.payload ? "View" : "Edit"
        }
        case SET_DETAIL_SECTION_BUTTON_VALUE: return {
            ...state,
            DETAIL_SECTION_BUTTON_VALUE : action.payload
        }
        case SET_CONTACTS_DATA: return {
            ...state,
            CONTACTS_DATA : action.payload
        }
        case SET_NEW_CONTACT_EMAIL_DATA: return {
            ...state,
            NEW_CONTACT_EMAIL_DATA : action.payload
        }
        case SET_NEW_CONTACT_MOBILE_DATA: return {
            ...state,
            NEW_CONTACT_MOBILE_DATA : action.payload
        }
        case SET_NEW_CONTACT_PHONE_DATA: return {
            ...state,
            NEW_CONTACT_PHONE_DATA : action.payload
        }
        case SET_FORM_DATA: return {
            ...state,
            FORM_DATA : action.payload
        }
        case SET_CONTACT_EMAIL_ADD: return {
            ...state,
            CONTACT_EMAIL_ADD : action.payload
        }
        case SET_CONTACT_MOBILE_ADD: return {
            ...state,
            CONTACT_MOBILE_ADD : action.payload
        }
        case SET_CONTACT_PHONE_ADD: return {
            ...state,
            CONTACT_PHONE_ADD : action.payload
        }
        default : return state;
    }
}