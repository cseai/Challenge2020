import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
const mainModal = {
	position: 'fixed',
	zIndex: 1000,
	bottom: '0',
	top: '0',
	left: '0',
	right: '0',
	background: 'rgba(0,0,0,0.7)',
	color: 'red',
};

const Modal = ({ open, children, modalClose }) => {
	if (!open) return null;

	return ReactDom.createPortal(
		<>
			<div style={mainModal} onClick={modalClose} />
			<Fragment>
				<div>{children}</div>
			</Fragment>
		</>,
		document.getElementById('portal')
	);
};

export default Modal;
