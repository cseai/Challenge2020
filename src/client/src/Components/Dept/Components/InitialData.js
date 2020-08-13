import React,{useState} from 'react'
export const [formData, setFormData] = useState({
    name: '',
    username: '',
    since: '',
    shortDescription: '',
    contacts: []
});

export const [newContactPhoneData, setNewContactPhoneData] = useState({
    number: '',
    description: '',
    active: true
});
export const [newContactMobileData, setNewContactMobileData] = useState({
    number: '',
    description: '',
    active: true
});
export const [newContactEmailData, setNewContactEmailData] = useState({
    number: '',
    description: '',
    active: true
});
