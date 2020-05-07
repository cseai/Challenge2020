import styled from 'styled-components';

export const SignIn = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-color: #fff;
`;

export const SigninCompany = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 6;
	align-items: center;
	top: 4%;
	left: 50%;
`;

export const SigninCompanyName = styled.div`
	position: absolute;
	font-family: 'Roboto';
	font-style: normal;
	font-weight: bold;
	font-size: 30px;
	color: #4cbea6;
`;
// main
export const signinMain = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	grid-gap: 1rem;
	width: 100vw;
	height: 100vh;
`;

// left side
export const signinMainLeft = styled.div`
	grid-column: 1/2;
	grid-row: 1/-1;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: end;
	height: 100vh;
	width: 100%;
`;
// left side image
export const signinMainLeftImgPos = styled.img`
	left: 60px;
	bottom: 30px;
	max-height: 500px;
	max-width: 550px;
	position: relative;
	src={required('./../img/undraw_true_friends_c94g)}
`;

/*######################### 2nd part #########################*/

export const signinMainRight = styled.div`
	grid-column: 2/-1;
	grid-row: 1/-1;
	max-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: calc(14vw);
`;

/* form */
/* form image */
export const signinMainRightNotification = styled.div`
	background-color: red;
	text-align: center;
	margin-bottom: 20px;
	padding: 9px 0px;
	min-height: 10px;
	font-size: 16px;
	border-radius: 10px;
`;

export const signinMainRightNotificationSpan = styled.div`
	text-align: center;
	padding: 0 20px;
	color: white;
`;
export const signinMainRightAvater = styled.div`
	height: 100px;
	width: 90px;
`;

export const signinMainRightSignin = styled.div`
	font-family: 'Roboto';
	font-weight: 400;
	font-size: 20px;
	color: #4cbea6;
`;
/*  */
export const signinMainRightForm = styled.div`
	width: 85%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

// export const Form = styled.div`
// 	padding: 0px;
// 	width: 100%;
// 	font-family: sans-serif;
// 	overflow: hidden;
// `;

// .logo-nm {
// 	display: inline;
// 	justify-content: center;
// 	text-align: center;
// 	align-items: center;
// }

// .form {
// 	/* width: 50%; */
// 	/* max-width: 500px; */
// 	position: relative;
// 	height: 50px;
// 	overflow: hidden;
// 	margin-bottom: 20px;
// }

// .form input {
// 	width: 100%;
// 	height: 100%;
// 	color: #4cbea6;
// 	padding-top: 20px;
// 	border: none;
// 	outline: none;
// 	padding-left: 43px;
// 	background-color: transparent;
// 	font-size: 20px;
// 	padding-bottom: 16px;
// }

// .form label {
// 	position: absolute;
// 	bottom: 0px;
// 	pointer-events: none;
// 	border-bottom: 3px solid #bbbcbd8a;
// 	width: 100%;
// 	height: 100%;
// 	left: 0%;
// 	pointer-events: none;
// }

// .form label::after {
// 	content: '';
// 	position: absolute;
// 	bottom: 0px;
// 	left: 0px;
// 	top: 3px;
// 	height: 100%;
// 	width: 100%;
// 	border-bottom: 3px solid #4cbea6;
// 	transform: translateX(-101%);
// 	transition: all 0.3s ease;
// }

// .content-name {
// 	font-size: 16px;
// 	position: absolute;
// 	bottom: 5px;
// 	left: 35px;
// 	transition: all 0.3s ease;
// 	color: #bbbdbd;
// }
// .label-img {
// 	position: absolute;
// 	bottom: 0px;
// 	pointer-events: none;
// 	/* border-bottom: 3px solid black; */
// 	width: 100%;
// 	height: 100%;
// 	left: 0%;
// 	top: 14px;
// }

// .svg-img {
// 	height: 21px;
// 	width: 21px;
// 	fill: #4cbea6;
// }

// .form input:focus + .label-name .content-name,
// .form input:valid + .label-name .content-name {
// 	transform: translateY(-90%);
// 	font-size: 13px;
// 	color: #4cbea6;
// }

// .form input:focus + .label-name::after,
// .form input:valid + .label-name::after {
// 	transform: translateX(0%);
// }

// /* btn */
// .signin-btn {
// 	margin-top: 13px;
// 	outline: none;
// 	border: none;
// 	min-height: 20px;
// 	min-width: 40px;
// 	padding: 10px 100px;
// 	font-size: 20px;
// 	word-wrap: none;
// 	background: #4cbea6;
// 	box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.25);
// 	border-radius: 10px;
// 	color: white;
// 	cursor: pointer;
// }
// .create-link {
// 	padding-top: 10px;
// }
// .create-link a {
// 	color: #4cbea6;
// 	font-size: 14px;
// }

// .poweredby {
// 	padding-top: 30px;
// 	text-align: center;
// }
// .poweredby span {
// 	font-size: 12px;
// 	background: -webkit-linear-gradient(rgba(255, 94, 0, 0.685), rgba(243, 247, 1, 0.671));
// 	-webkit-background-clip: text;
// 	-webkit-text-fill-color: transparent;
// }
// .poweredby h5 {
// 	font-size: 30px;
// 	background: -webkit-linear-gradient(rgb(255, 94, 0), rgb(242, 247, 1));
// 	-webkit-background-clip: text;
// 	-webkit-text-fill-color: transparent;
// }
// .mobile-image {
// 	display: none;
// }

// @media only screen and (min-width: 576px) and (max-width: 768px) {
// 	/* main grid */
// 	.signin__main {
// 		/* background: rgb(9, 70, 105); */
// 		display: grid;
// 		grid-template-columns: 1fr;
// 		grid-template-rows: 1fr;
// 		grid-gap: 0rem;
// 		width: 100vw;
// 		height: 100vh;
// 	}
// 	.mobile-image {
// 		display: block;
// 		position: absolute;
// 		z-index: -2;
// 		max-width: 350px;
// 		margin-top: 265px;
// 		-webkit-filter: blur(8px);
// 		filter: blur(8px);
// 	}
// 	.login {
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		align-items: stretch;
// 		height: 100vh;
// 	}
// 	/* first  */
// 	.signin__main___left {
// 		display: none;
// 	}
// 	/* 2nd  */
// 	.signin__main___right {
// 		grid-column: 1/-1;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		padding-top: 0px;
// 		align-items: center;
// 		padding-right: 0px;
// 		padding: 0 0px;
// 		margin-top: 0px;
// 		padding: 0px calc(10vh);
// 		margin-right: 0;
// 	}
// 	.signin-btn {
// 		margin-top: 15px;
// 		outline: none;
// 		border: none;
// 		min-height: 30px;
// 		min-width: 50px;
// 		padding: 10px 100px;
// 		font-size: 20px;
// 		background: #4cbea6;
// 		box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.25);
// 		border-radius: 10px;
// 		color: white;
// 		cursor: pointer;
// 	}
// 	.login-name {
// 		color: #4cbea6;
// 		font-size: 40px;
// 	}
// 	.create-link a {
// 		color: rgb(218, 214, 0);
// 		font-size: 14px;
// 	}
// }

// /* extra small */

// @media screen and (min-width: 360px) and (max-width: 575px) {
// 	/* main grid */
// 	.signin__main {
// 		/* background: rgb(9, 70, 105); */
// 		display: grid;
// 		grid-template-columns: 1fr;
// 		grid-template-rows: 1fr;
// 		grid-gap: 0rem;
// 		width: 100vw;
// 		height: 100vh;
// 	}
// 	.mobile-image {
// 		display: block;
// 		position: absolute;
// 		z-index: -2;
// 		max-width: 350px;
// 		margin-top: 265px;
// 		-webkit-filter: blur(8px);
// 		filter: blur(8px);
// 	}
// 	.login {
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		align-items: stretch;
// 		height: 100vh;
// 	}
// 	/* first  */
// 	.signin__main___left {
// 		display: none;
// 	}
// 	/* 2nd  */
// 	.signin__main___right {
// 		grid-column: 1/-1;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		padding-top: 0px;
// 		align-items: center;
// 		padding-right: 0px;
// 		padding: 0 0px;
// 		margin-top: 0px;
// 		padding: 0px calc(10vh);
// 		margin-right: 0;
// 	}
// 	.signin-btn {
// 		margin-top: 15px;
// 		outline: none;
// 		border: none;
// 		min-height: 30px;
// 		min-width: 50px;
// 		padding: 10px 90px;
// 		font-size: 20px;
// 		background: #4cbea6;
// 		box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.25);
// 		border-radius: 10px;
// 		color: white;
// 		cursor: pointer;
// 	}
// 	.login-name {
// 		color: #4cbea6;
// 		font-size: 40px;
// 	}
// 	.create-link a {
// 		color: rgb(218, 214, 0);
// 		font-size: 14px;
// 	}
// }