import React, { Fragment, useEffect, useState } from 'react';
import Modal from './../../../Layout/Modal/Modal';
import { connect } from 'react-redux';

const bookModal = {
	position: 'fixed',
	zIndex: 1000,
	top: '50%',
	left: '50%',
	background: 'white',
	color: 'red',
	transform: 'translate(-50%,-50%)',
};

const BookModal = ({ book, Allbooks }) => {
	// const [open, setOpen] = useState(openM);

	// useEffect(() => {
	// 	display();
	// }, [book, Allbooks]);

	// function display() {
	// 	// const t = typeof Allbooks;
	// 	return <div>{Allbooks._id}</div>;
	// 	console.log(Allbooks._id);
	// 	// return Allbooks[0]._id;
	// }
	return (
		<Fragment>
			<div style={bookModal}>
				{book} {Allbooks._id} {Allbooks.title}
			</div>
			{/* {display()} */}
			<div></div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	books: state.library.books.books,
});

export default connect(mapStateToProps, null)(BookModal);
