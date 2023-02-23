import { forgotPassword, forgotPasswordSubmit } from 'lib/aws/auth';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const [codeSent, setCodeSent] = useState(false);
	const [form, setForm] = useState({});
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSendCode = async (e) => {
		e.preventDefault();
		try {
			await forgotPassword(form.email.trim());
			setCodeSent(true);
			toast.success('Check your email for reset code');
		} catch (e) {
			console.error(e.message);
			toast.error(e.message);
		}
	};

	const handleSubmitCode = async (e) => {
		e.preventDefault();
		try {
			const resp = await forgotPasswordSubmit(
				form.email.trim(),
				form.code.trim(),
				form.newPassword.trim()
			);
			if (resp === 'SUCCESS') {
				toast.success('Your password has been reset, you will be redirected');
				setTimeout(() => {
					navigate('/login');
				}, 3000);
			} else {
				toast.error('Error, please review your input');
			}
		} catch (e) {
			console.error(e.message);
			toast.error(e.message);
		}
	};

	return (
		<Container className='register'>
			<h1>Forgot Password</h1>
			<p>Reset your password</p>
			<form onSubmit={codeSent ? handleSubmitCode : handleSendCode}>
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
				{codeSent && (
					<>
						<div className='form-group'>
							<input
								type='text'
								required
								className='form-control password'
								name='code'
								onChange={handleInputChange}
							/>
							<label htmlFor='password' className='label'>
								Code
							</label>
						</div>
						<div className='form-group'>
							<input
								type='password'
								required
								className='form-control password'
								name='newPassword'
								onChange={handleInputChange}
								minLength='8'
							/>
							<label htmlFor='newPassword' className='label'>
								New Password
							</label>
						</div>
					</>
				)}
				<div className='form-group'>
					<input type='submit' value='Send Code' className='btn btn-primary' />
				</div>
			</form>
			<p className='my-1'>
				<Link to={'/login'}>Sign In</Link>
			</p>
		</Container>
	);
};

export default ForgotPassword;
