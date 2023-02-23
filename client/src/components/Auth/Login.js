import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import userImg from '../../images/avatar.png';

// Style
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/auth.css';
import Container from 'react-bootstrap/Container';
import { confirmSignUp, signIn } from 'lib/aws/auth';
import { toast } from 'react-toastify';

const Login = () => {
	const [form, setForm] = useState({});
	const [confirmForm, setConformForm] = useState({});
	const [isConfirmActive, setIsConfirmActive] = useState(false);
  const navigate = useNavigate();

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleConfirmChange = (e) => {
		setConformForm({
			...confirmForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const resp = await signIn(form.email, form.password);
			navigate("/profile/me")
		} catch (e) {
			console.error(e.message);
			toast.error(e.message);
		}
	};

	const handleSubmitConfirm = (e) => {
		e.preventDefault();
		confirmSignUp(confirmForm.email, confirmForm.code);
	};

	return (
		<Container className='login'>
			<h1>Member Sign In</h1>
			<div className='avatar'>
				<img src={userImg} alt='User Icon' />
			</div>

			{isConfirmActive ? (
				<form onSubmit={handleSubmitConfirm}>
					<div className='form-group'>
						<input
							type='text'
							required
							className='form-control email'
							name='email'
							onChange={handleConfirmChange}
						/>
						<label htmlFor='email' className='label'>
							Email
						</label>
					</div>
					<div className='form-group'>
						<input
							type='text'
							required
							className='form-control'
							name='code'
							onChange={handleConfirmChange}
						/>
						<label htmlFor='code' className='label'>
							Code
						</label>
					</div>
					<div className='form-group'>
						<input
							type='submit'
							value='Confirm email'
							className='btn btn-primary'
						/>
					</div>
					<p>
						<Link to='' onClick={() => setIsConfirmActive((prev) => !prev)}>
							Sign in
						</Link>
					</p>
				</form>
			) : (
				<>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<input
								type='email'
								required
								className='form-control email'
								name='email'
								onChange={handleInputChange}
							/>
							<label htmlFor='email' className='label'>
								Email
							</label>
						</div>
						<div className='form-group'>
							<input
								type='password'
								required
								className='form-control password'
								name='password'
								onChange={handleInputChange}
								minLength='8'
							/>
							<label htmlFor='password' className='label'>
								Password
							</label>
						</div>
						<div className='form-group'>
							<input type='submit' value='LOGIN' className='btn btn-primary' />
						</div>
					</form>
					<p style={{ margin: 0 }}>
						<Link to='/forgot-password'>Forgot Password</Link>
					</p>
					<p style={{ marginTop: 5 }}>
						Don't have an account? <Link to={'/register'}>Sign Up</Link>
						<p style={{ display: 'inline-flex', margin: '0 5px' }}>or</p>
						<Link to='' onClick={() => setIsConfirmActive((prev) => !prev)}>
							Confirm email
						</Link>
					</p>
				</>
			)}
		</Container>
	);
};

export default Login;
