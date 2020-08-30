import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
//css
import Styles from './BookModal.module.css';
import { Row, Col } from 'react-bootstrap';

const BookModal = ({ book, Allbooks }) => {
	return (
		<Fragment>
			<div className={Styles.bookModal}>
				<div className={Styles.bookModalInner}>
					<div className={Styles.Row}>
						<div className={Styles.Col_left}>
							<div className={Styles.colLeft}>
								<img className={Styles.colLeftImage} src={require('./../image/al.jpg')} alt='goo' />
							</div>
						</div>
						<div className={Styles.Col_right}>
							<div className={Styles.colRight}>
								<div className={Styles.colRight_bookName}>
									<p>Algorithms Design</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* {book} {Allbooks._id} {Allbooks.title} */}
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	books: state.library.books.books,
});

export default connect(mapStateToProps, null)(BookModal);
