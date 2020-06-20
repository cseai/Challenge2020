import Styled from 'styled-components';

export const ThemeModeLight = Styled.div`
    background:${(props) => props.theme.themeChanger.light.background};
    color:${(props) => props.theme.themeChanger.light.color};
    padding:10px;
    border-radius:10px 10px 0px 0px ;
    
`;
export const ThemeModeDark = Styled.div`
    background:${(props) => props.theme.themeChanger.dark.background};
    color:${(props) => props.theme.themeChanger.dark.color};
    padding:10px;
    border-radius:  0px 0px  10px 10px;


`;
