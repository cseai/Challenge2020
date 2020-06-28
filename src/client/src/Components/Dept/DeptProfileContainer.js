import styled from 'styled-components';

export const DeptProfile = styled.div`
    background:${(props) => props.theme.colors.subBackground}
	width: 100%;
	height: auto;
	margin: auto;
`;

export const DeptProfileInfo = styled.div`
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

export const DeptMap = styled.div`
	color: ${(props) => props.theme.colors.color};
`;

export const DeptProfileInfoContentIcon = styled.div`
	background: ${(props) => props.theme.colors.inbg};
`;

export const DeptProfileInfoContentSide = styled.div`
	color: ${(props) => props.theme.colors.color};
`;

export const DeptProfileAbout = styled.div`
	background: ${(props) => props.theme.colors.subBackground};
	border: 1px solid ${(props) => props.theme.colors.shadow};
`;
