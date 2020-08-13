export const onChangeDetailInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

export const onChangeContactInput = (e, method, number_index) => {
    console.log(e.target.name,e.target.value, method, number_index);
    if(method==='phone'){
        if(e.target.name === 'number'){
            contactsData[0].numbers[number_index].number = e.target.value
        }else if(e.target.name === 'description'){
            contactsData[0].numbers[number_index].description = e.target.value
        }else if(e.target.name === 'active'){
            contactsData[0].numbers[number_index].active = e.target.value
        }
        setContactsData({...contactsData});
        // console.log(contactsData[0])
    }else if(method==='mobile'){
        if(e.target.name === 'number'){
            contactsData[1].numbers[number_index].number = e.target.value
        }else if(e.target.name === 'description'){
            contactsData[1].numbers[number_index].description = e.target.value
        }else if(e.target.name === 'active'){
            contactsData[1].numbers[number_index].active = e.target.value
        }
        setContactsData({...contactsData});
        // console.log(contactsData[1]);
    }else if(method==='email'){
        if(e.target.name === 'number'){
            contactsData[2].numbers[number_index].number = e.target.value
        }else if(e.target.name === 'description'){
            contactsData[2].numbers[number_index].description = e.target.value
        }else if(e.target.name === 'active'){
            contactsData[2].numbers[number_index].active = e.target.value
        }
        setContactsData({...contactsData});
        // console.log(contactsData[2])
    }
}
