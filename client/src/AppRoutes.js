import React, { Component, Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import Main from "./components/Answer/Main";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/Private/PrivateRoute";

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
			path: "register",
			element: <Register />,
		},
		{
			path: "login",
			element: <Login />,
		},
		{
			path: "/",
			element: <PrivateRoute component={Dashboard} />,
			children: [
				{
					path: "/",
					element: <PrivateRoute component={Home} />,
				},
				{
					path: ":id",
					element: <Main />,
				},
			],
		},
		{ path: "*", element: <NotFound /> },
	]);
	return routes;
}
