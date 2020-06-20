import styled from 'styled-components';

export const EduHubProfile = styled.div`
    background:${(props) => props.theme.colors.subBackground}
	width: 100%;
	height: auto;
	margin: auto;
`;

export const EduHubProfileInfo = styled.div`
	width: 100%;
	height: 100%;
	background: ${(props) => props.theme.colors.subBackground};
	color: ${(props) => props.theme.colors.color};
	border: 1px solid ${(props) => props.theme.colors.shadow};
	margin-top: 25px;
	border-radius: 10px;
	padding: 10px 0px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

export const EduHubProfileInfoContentIcon = styled.div`
	background: ${(props) => props.theme.colors.inbg};
`;

export const EduHubProfileInfoContentSide = styled.div`
	color: ${(props) => props.theme.colors.color};
`;

export const EduHubProfileAbout = styled.div`
	background: ${(props) => props.theme.colors.subBackground};
	border: 1px solid ${(props) => props.theme.colors.shadow};
`;