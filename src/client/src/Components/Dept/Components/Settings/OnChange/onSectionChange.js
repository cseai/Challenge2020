export const onSectionChange = (e,setDetailSection,setMemberSection,setControllerSection,setCreateSection) => {
    if( e.target.value === 'detail'){
        setDetailSection(true);
        setMemberSection(false);
        setControllerSection(false);
        setCreateSection(false);
    }else if( e.target.value === 'member'){
        setDetailSection(false);
        setMemberSection(true);
        setControllerSection(false);
        setCreateSection(false);
    }else if( e.target.value === 'controller'){
        setDetailSection(false);
        setMemberSection(false);
        setControllerSection(true);
        setCreateSection(false);
    }else if( e.target.value === 'create'){
        setDetailSection(false);
        setMemberSection(false);
        setControllerSection(false);
        setCreateSection(true);
    }
}