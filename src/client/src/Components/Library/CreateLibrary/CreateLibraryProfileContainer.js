import styled from 'styled-components';

export const CreateProfileMain = styled.div`
	background: ${(props) => props.theme.colors.subBackground};
	color: ${(props) => props.theme.colors.color};
`;
export const ProfileIcon = styled.div`
	color: ${(props) => props.theme.colors.inbg};
	font-size: 25px;
`;
export const CreateProfileFormControlInField = styled.input`
	background: ${(props) => props.theme.colors.inbg};
	color: ${(props) => props.theme.colors.color};
	&:focus {
		color: ${(props) => props.theme.colors.color};
		background: red;
	};
	&:active {
		color: ${(props) => props.theme.colors.color};
		background: red;
	};
`;
export const CreateProfileTextField = styled.textarea`
	background: ${(props) => props.theme.colors.inbg};
	color: ${(props) => props.theme.colors.color};
`;
export const CreateProfileSelect = styled.select`
	background: ${(props) => props.theme.colors.inbg};
	color: ${(props) => props.theme.colors.color};
`;
