import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import drawerImage from "../../images/bg-login.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/");
		}
	}, []);
	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/");
		}
	}, [auth]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const newUser = {
			Email: data.get("email"),
			Password: data.get("password"),
			LastName: data.get("lastName"),
			FirstName: data.get("firstName"),
		};

		dispatch(registerUser(newUser), navigate);
	};

	return (
		<>
			<Grid container component='main' sx={{ height: "100vh" }}>
				<CssBaseline />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete='given-name'
										name='firstName'
										required
										fullWidth
										id='firstName'
										label='First Name'
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										id='lastName'
										label='Last Name'
										name='lastName'
										autoComplete='family-name'
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name='password'
										label='Password'
										type='password'
										id='password'
										autoComplete='new-password'
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={<Checkbox value='allowExtraEmails' color='primary' />}
										label='Принимаю правила.'
									/>
								</Grid>
							</Grid>
							<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
								Sign Up
							</Button>
							<Grid container justifyContent='flex-end'>
								<Grid item>
									<Link to='/login' variant='body2'>
										Авторизоваться
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url(${drawerImage})`,
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
			</Grid>
		</>
	);
}
