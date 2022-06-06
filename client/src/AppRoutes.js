import React, { Component, Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
// import PrivateRoute from "./components/private-route/PrivateRoute";

const Home = lazy(() => import("./components/Home"));
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));

const NotFound = () => {
	return (
		<div className='not_found'>
			<h1 className='display-4'>404</h1>
			<p>Контенит не доступен в вашем регионе</p>
			<p style={{ fontSize: "10px" }}>шутка, просто страница не доступна</p>
		</div>
	);
};

export default function AppRoutes() {
	let routes = useRoutes([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "register",
			element: <Register />,
		},
		{
			path: "login",
			element: <Login />,
		},

		{ path: "*", element: <NotFound /> },
	]);
	return routes;
}
