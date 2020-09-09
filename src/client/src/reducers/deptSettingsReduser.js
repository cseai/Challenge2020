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
    SET_CONTACT_PHONE_ADD,
    CREATE_CONTACT_PHONE_FIELD_ADD,
    CREATE_CONTACT_PHONE_FIELD_CANCEL,
    CREATE_CONTACT_MOBILE_FIELD_ADD,
    CREATE_CONTACT_MOBILE_FIELD_CANCEL,
    CREATE_CONTACT_EMAIL_FIELD_ADD,
    CREATE_CONTACT_EMAIL_FIELD_CANCEL,
    ON_CHANGE_CONTACT_INPUT,
    ON_CLICK_CONTACT_DELETE} from './../actions/types';
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

        //Additional change start ....
        case SET_NEW_CONTACT_EMAIL_DATA: switch (action.payload.target.name) {
            case 'number':return{
                ...state,
                NEW_CONTACT_EMAIL_DATA:{
                    ...state.NEW_CONTACT_EMAIL_DATA,
                    number : action.payload.target.value
                }
            }
            case 'description':return{
                ...state,
                NEW_CONTACT_EMAIL_DATA:{
                    ...state.NEW_CONTACT_EMAIL_DATA,
                    description : action.payload.target.value
                }
            }
            case 'active':return{
                ...state,
                NEW_CONTACT_EMAIL_DATA:{
                    ...state.NEW_CONTACT_EMAIL_DATA,
                    active : action.payload.target.value
                }
            }
            default : return{
                ...state,
                NEW_CONTACT_EMAIL_DATA:{
                    ...state.NEW_CONTACT_EMAIL_DATA
                }
            }
        }
        case SET_NEW_CONTACT_MOBILE_DATA: switch (action.payload.target.name) {
            case 'number':return{
                ...state,
                NEW_CONTACT_MOBILE_DATA:{
                    ...state.NEW_CONTACT_MOBILE_DATA,
                    number : action.payload.target.value
                }
            }
            case 'description':return{
                ...state,
                NEW_CONTACT_MOBILE_DATA:{
                    ...state.NEW_CONTACT_MOBILE_DATA,
                    description : action.payload.target.value
                }
            }
            case 'active':return{
                ...state,
                NEW_CONTACT_MOBILE_DATA:{
                    ...state.NEW_CONTACT_MOBILE_DATA,
                    active : action.payload.target.value
                }
            }
            default : return{
                ...state,
                NEW_CONTACT_MOBILE_DATA:{
                    ...state.NEW_CONTACT_MOBILE_DATA
                }
            }
        }
        case SET_NEW_CONTACT_PHONE_DATA: switch (action.payload.target.name) {
            case 'number':return{
                ...state,
                NEW_CONTACT_PHONE_DATA:{
                    ...state.NEW_CONTACT_PHONE_DATA,
                    number : action.payload.target.value
                }
            }
            case 'description':return{
                ...state,
                NEW_CONTACT_PHONE_DATA:{
                    ...state.NEW_CONTACT_PHONE_DATA,
                    description : action.payload.target.value
                }
            }
            case 'active':return{
                ...state,
                NEW_CONTACT_PHONE_DATA:{
                    ...state.NEW_CONTACT_PHONE_DATA,
                    active : action.payload.target.value
                }
            }
            default : return{
                ...state,
                NEW_CONTACT_PHONE_DATA:{
                    ...state.NEW_CONTACT_PHONE_DATA
                }
            }
        }

        case SET_FORM_DATA: switch (action.payload.target.name) {
            case 'name' : return{
                ...state,
                FORM_DATA :{
                    ...state.FORM_DATA,
                    name: action.payload.target.value,
                }
            }
            case 'username' : return{
                ...state,
                FORM_DATA :{
                    ...state.FORM_DATA,
                    username: action.payload.target.value,
                }
            }
            case 'since' : return{
                ...state,
                FORM_DATA :{
                    ...state.FORM_DATA,
                    since: action.payload.target.value,
                }
            }
            case 'shortDescription' : return{
                ...state,
                FORM_DATA :{
                    ...state.FORM_DATA,
                    shortDescription: action.payload.target.value,
                }
            }
            default : return{
                ...state,
                FORM_DATA :{
                    ...state.FORM_DATA
                }
            }
        }
        case CREATE_CONTACT_PHONE_FIELD_ADD :{ 
            
            if(state.NEW_CONTACT_PHONE_DATA.number !=""){
                console.log(state.FORM_DATA.contacts);
                let newData = state.CONTACTS_DATA;
                newData[0].numbers.push(state.NEW_CONTACT_PHONE_DATA);
                //state.CONTACTS_DATA[0].push()
            return{
                ...state,
                CONTACTS_DATA:newData,

                FORM_DATA :{
                    ...state.FORM_DATA,
                    contacts : [...state.FORM_DATA.contacts,state.NEW_CONTACT_PHONE_DATA]
                },
                NEW_CONTACT_PHONE_DATA : {
                    number: '',
                    description: '',
                    active: true
                },
                CONTACT_PHONE_ADD : false
            }
            }else{
                return{
                    ...state
                }
            }
        }
        case CREATE_CONTACT_PHONE_FIELD_CANCEL : return{
            ...state,
            NEW_CONTACT_PHONE_DATA : {
                number: '',
                description: '',
                active: true
            },
            CONTACT_PHONE_ADD : false
        }




        case CREATE_CONTACT_MOBILE_FIELD_ADD :{ 
            
            if(state.NEW_CONTACT_MOBILE_DATA.number !=""){
                console.log(state.FORM_DATA.contacts);
                let newData = state.CONTACTS_DATA;
                newData[0].numbers.push(state.NEW_CONTACT_MOBILE_DATA);
                //state.CONTACTS_DATA[0].push()
            return{
                ...state,
                CONTACTS_DATA:newData,

                FORM_DATA :{
                    ...state.FORM_DATA,
                    contacts : [...state.FORM_DATA.contacts,state.NEW_CONTACT_MOBILE_DATA]
                },
                NEW_CONTACT_MOBILE_DATA : {
                    number: '',
                    description: '',
                    active: true
                },
                CONTACT_MOBILE_ADD : false
            }
            }else{
                return{
                    ...state
                }
            }
        }
        case CREATE_CONTACT_MOBILE_FIELD_CANCEL : return{
            ...state,
            NEW_CONTACT_MOBILE_DATA : {
                number: '',
                description: '',
                active: true
            },
            CONTACT_MOBILE_ADD : false
        }






        case CREATE_CONTACT_EMAIL_FIELD_ADD :{ 
            
            if(state.NEW_CONTACT_EMAIL_DATA.number !=""){
                console.log(state.FORM_DATA.contacts);
                let newData = state.CONTACTS_DATA;
                newData[0].numbers.push(state.NEW_CONTACT_EMAIL_DATA);
                //state.CONTACTS_DATA[0].push()
            return{
                ...state,
                CONTACTS_DATA:newData,

                FORM_DATA :{
                    ...state.FORM_DATA,
                    contacts : [...state.FORM_DATA.contacts,state.NEW_CONTACT_EMAIL_DATA]
                },
                NEW_CONTACT_EMAIL_DATA : {
                    number: '',
                    description: '',
                    active: true
                },
                CONTACT_EMAIL_ADD : false
            }
            }else{
                return{
                    ...state
                }
            }
        }
        case CREATE_CONTACT_EMAIL_FIELD_CANCEL : return{
            ...state,
            NEW_CONTACT_EMAIL_DATA : {
                number: '',
                description: '',
                active: true
            },
            CONTACT_EMAIL_ADD : false
        }





        case ON_CHANGE_CONTACT_INPUT :{
            console.log(action.payload.target.value,'is the value');
            
            console.log(action.payload," From payload");
            console.log(action.payload.target.value);
            const newData = [...state.CONTACTS_DATA];

            switch (action.payload.target.name) {
                case 'number':
                    newData[0].numbers[action.key].number = action.payload.target.value;
                    break;
                
                case 'description':
                    newData[0].numbers[action.key].description = action.payload.target.value;
                    break;
                case 'active':
                    newData[0].numbers[action.key].active = action.payload.target.value;
                    break;
                default:
                    newData[0] = [...newData];
                    break;
            }
            return{
                ...state,
                CONTACTS_DATA: newData
            }
        }
        
        case ON_CLICK_CONTACT_DELETE:{
            state.CONTACTS_DATA[0].numbers.splice(action.payload.key,1);
            console.log(state.CONTACTS_DATA,"... new");
            const newData = state.CONTACTS_DATA;
            return{
                ...state,
                CONTACTS_DATA: newData,
            }
        }

        //Additonal change end...
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