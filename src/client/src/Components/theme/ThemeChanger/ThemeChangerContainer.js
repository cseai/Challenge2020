import Styled from 'styled-components';

export const ThemeMode = Styled.div`
    background:${(props) => props.theme.themeChanger.background};
    color:${(props) => props.theme.themeChanger.color};
    padding:10px;
    
`;
