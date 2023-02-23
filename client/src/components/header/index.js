import { Auth } from 'aws-amplify';
import { isUserAuth, signOut } from 'lib/aws/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { headerData } from './data';
import { Hub } from 'aws-amplify';

const Header = () => {
	const { navbar } = headerData;
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		getIsUserAuth();
		Hub.listen('auth', (data) => {
			switch (data.payload.event) {
				case 'signIn':
					return setIsAuth(true);
				case 'signOut':
					return setIsAuth(false);
				default:
					return;
			}
		});
	}, [Hub]);

	const getIsUserAuth = async () => {
		const resp = await isUserAuth();
		if (Object.keys(resp).length > 0) {
			setIsAuth(true);
		}
	};

	const logOut = async () => {
		try {
			await signOut();
			setIsAuth(false);
			navigate('/');
		} catch (e) {
			console.error(e.message);
			toast.error(e.message);
		}
	};

	return (
		<nav
			class='navbar navbar-expand-lg navbar-light bg-light'
			style={{ padding: '10px 30px' }}
		>
			<button
				class='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span class='navbar-toggler-icon'></span>
			</button>
			<div
				class='collapse navbar-collapse'
				id='navbarSupportedContent'
				style={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<ul class='navbar-nav mr-auto'>
					{isAuth
						? navbar
								.filter((link) => link.auth)
								.map((link) => (
									<li class='nav-item  mr-auto' style={{ marginRight: 10 }}>
										<Link
											to={link.href}
											style={{ textDecoration: 'none', color: 'initial' }}
										>
											{link.label}
										</Link>
									</li>
								))
						: navbar
								.filter((link) => !link.auth)
								.map((link) => (
									<li class='nav-item  mr-auto' style={{ marginRight: 10 }}>
										<Link
											to={link.href}
											style={{ textDecoration: 'none', color: 'initial' }}
										>
											{link.label}
										</Link>
									</li>
								))}
				</ul>
				{isAuth && (
					<ul class='navbar-nav mr-auto'>
						<li class='nav-item  mr-auto'>
							<Link
								to=''
								onClick={logOut}
								style={{ textDecoration: 'none', color: 'initial' }}
							>
								Log Out
							</Link>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Header;
