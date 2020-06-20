import styled from 'styled-components';

export const LeftPartData = styled.div`
	position: fixed;
	min-height: 45vh;
	background: ${(props) => props.theme.colors.subBackground};
	border-radius: 10px;
	box-shadow: 1px 1px 0px 0px ${(props) => props.theme.colors.shadow};
	min-width: 224px;
	color: ${(props) => props.theme.colors.color};
`;
