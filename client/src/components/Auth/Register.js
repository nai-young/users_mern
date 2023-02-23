import { Link } from 'react-router-dom'
import { useState } from 'react'

// Style
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import { signUp } from 'lib/aws/auth'

const Register = () => {
  const [form, setForm] = useState({})
  
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    signUp(form.email, form.password)
  }

	return (
		<Container className='register'>
			<h1>Member Sign Up</h1>
			<p>Create Your User Account</p>
			<form onSubmit={handleOnSubmit}>
				<div className='form-group'>
					<input
						type='text'
						required
						className='form-control name'
						name='name'
						onChange={handleInputChange}
					/>
					<label htmlFor='name' className='label'>
						Name
					</label>
				</div>
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
					<small id='emailHelp'>
						We'll never share your email with anyone else.
					</small>
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
          <small id='emailHelp'>
						Min length 8
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						required
						className='form-control password'
						name='password2'
						onChange={handleInputChange}
						minLength='8'
					/>
					<label htmlFor='password2' className='label'>
						Confirm Password
					</label>
				</div>
				<div className='form-group'>
					<input type='submit' value='REGISTER' className='btn btn-primary' />
				</div>
			</form>
			<p className='my-1'>
				Already have an account? <Link to={'/login'}>Sign In</Link>
			</p>
		</Container>
	)
}

export default Register
