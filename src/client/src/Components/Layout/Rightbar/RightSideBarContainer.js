import styled from 'styled-components';

export const RightPartData = styled.div`
	position: fixed;
	min-width: 230px;
	min-height: 320px;
	background: ${(props) => props.theme.colors.subBackground};
	border-radius: 10px;
	box-shadow: 1px 1px 0px 0px ${(props) => props.theme.colors.shadow};
	color: ${(props) => props.theme.colors.color};
`;

export const RightPartDataLink = styled.div`
	border-bottom: 4px solid ${(props) => props.theme.colors.inbg};
`;
