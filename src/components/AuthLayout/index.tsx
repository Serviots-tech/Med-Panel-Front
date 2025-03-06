/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { invalidText } from '../../helpers/utils';

export const PermissionContext = createContext<any>({
	role: null,
	userId: null,
});



export const AuthLayout = () => {

	const authpath = [
		'/login'
	];
	const { pathname } = useLocation();
	const navigate = useNavigate();


	const [userId, setUserId] = useState('');
	const [userRole, setUserRole] = useState('');

	const token = localStorage.getItem('accessToken');

	const path = window.location.pathname;

	useEffect(() => {
		if (!authpath.includes(path) && invalidText(token)) {
			navigate('/login');
		}
	}, [pathname]);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');

		if (token) {
			const userData: User = jwtDecode(token as string);
			if (userData) {
				setUserId(userData?.id);
				setUserRole(userData?.role)

			}
			if (path === '/login') {

				navigate("/", { replace: true });
			}
		}
	}, []);

	useEffect(() => {

		if (token) {
			try {
				const userData: User = jwtDecode(token as string);
				if (userData) {
					setUserId(userData?.id);
					setUserRole(userData?.role)

				}
				if (path === '/login') {
					navigate('/');
				}
			} catch (e: any) {
				console.log("🚀 ~ useEffect ~ e:", e)
				localStorage.removeItem('accessToken');
				navigate('/login');
			}
		}
	}, [token]);


	return (
		<PermissionContext.Provider
			value={{
				userId,
				userRole,
			}}
		>
			<Outlet />
		</PermissionContext.Provider>
	);
};

interface User {
	email: string;
	id: string;
	role: string;
}


