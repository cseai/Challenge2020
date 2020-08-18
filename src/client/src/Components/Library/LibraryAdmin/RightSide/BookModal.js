import React, { Fragment } from 'react';

const bookModal = {
	position: 'fixed',
	zIndex: 1000,
	top: '50%',
	left: '50%',
	background: 'white',
	color: 'red',
	transform: 'translate(-50%,-50%)',
};

const BookModal = () => {
	return (
		<Fragment>
			<div style={bookModal}>Hello world</div>
		</Fragment>
	);
};

export default BookModal;
