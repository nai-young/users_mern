import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Style
import '../styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Register from './Auth/Register';
import Login from './Auth/Login';
import ProfileMe from './Profile/ProfileMe';
import EditProfile from './Profile/EditProfile';
import Posts from './Posts/Posts';
import PostTemplate from './Posts/PostTemplate';
import Profile from './Profile/Profile';
import Header from './header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './Auth/ForgotPassword';

function App() {
	return (
		<Router>
			<Header />
			<section className='app'>
				<ToastContainer />
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/login' element={<Login />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile/me' element={<ProfileMe />} />
					<Route path='/profile/:profile_id' element={<Profile />} />
					<Route path='/edit-profile' element={<EditProfile />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/posts/:post_id' element={<PostTemplate />} />
				</Routes>
			</section>
		</Router>
	);
}

export default App;
