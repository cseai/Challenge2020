import styled from 'styled-components';

export const SubBgAndColor = styled.div`
	color: ${(props) => props.theme.colors.color};
	background: ${(props) => props.theme.colors.subBackground} !important;
`;
export const InbgSelect = styled.select`
	color: ${(props) => props.theme.colors.color} !important;
	background: ${(props) => props.theme.colors.inbg} !important;
`;
export const InbgInput = styled.input`
	color: ${(props) => props.theme.colors.color} !important;
	background: ${(props) => props.theme.colors.inbg} !important;
`;
export const BookTableMain = styled.div`
	color: ${(props) => props.theme.colors.color};
	background: ${(props) => props.theme.colors.subBackground} !important;
	margin: 20px 1%;
	padding: 20px;
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;
	align-items: center;
	border-radius: 5px; 
	font-size: 14px;
`;
export const BookTableTitle = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid;
	border-color: ${(props) => props.theme.colors.inbg} !important;
`;
export const BookTableRow = styled.div`
	display: grid;
	grid-template-columns: 0.5fr minmax(75px, 75px) 5fr 2fr;
	justify-content: center;
	align-content: center;
	width: 100%;
	border-bottom: 2px solid;
	border-color: ${(props) => props.theme.colors.inbg} !important;
	&:hover{
		color: ${(props) => props.theme.colors.color} !important;
		background-color: ${(props) => props.theme.colors.inbg} !important;
	};
`;
export const BookTableRowHead = styled(BookTableRow)`
	font-size: 20px;
	&:hover{
		color: ${(props) => props.theme.colors.color} !important;
		background-color: ${(props) => props.theme.colors.subBackground} !important;
	};
`;
export const BookTableCell = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 0;
	padding: .75rem;
	max-height: 100px;
	overflow-y: hidden;
`;
export const BookTableSortSelect = styled.select`
	color: ${(props) => props.theme.colors.color} !important;
	background: ${(props) => props.theme.colors.subBackground} !important;
	padding: 12px 18px;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	&:focus +  &:active {
		border: none;
		outline: none;
	}
`;
export const BookTableTitleH2 = styled.h2`
	color: ${(props) => props.theme.colors.color} !important;
	padding: 12px 18px;
	border: none;
	font-size: 24px;
	font-weight: 400;
`;