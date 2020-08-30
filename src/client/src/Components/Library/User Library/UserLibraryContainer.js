import styled from 'styled-components';

export const UserLibraryMain = styled.div`
	padding-top: 60px;
`;

export const SubBgAndColor = styled.div`
	color: ${props => props.theme.colors.color};
	background: ${props => props.theme.colors.subBackground} !important;
`;
export const InbgSelect = styled.select`
	color: ${props => props.theme.colors.color} !important;
	background: ${props => props.theme.colors.inbg} !important;
`;
export const InbgInput = styled.input`
	color: ${props => props.theme.colors.color} !important;
	background: ${props => props.theme.colors.inbg} !important;
`;
