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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import drawerImage from "../../images/bg-login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { useEffect } from "react";

export default function Login() {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const auth = useSelector((state) => state.auth);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);

		const userData = {
			Email: data.get("email"),
			Password: data.get("password"),
		};
		// console.log(userData);
		dispatch(loginUser(userData));
	};

	return (
		<>
			<Grid container component='main' sx={{ height: "100vh" }}>
				<CssBaseline />
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
						<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Запомнить меня'
							/>
							<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
								Войти
							</Button>

							<Grid container>
								<Grid item>
									<Link to='/register' variant='body2'>
										{"Зарегистрироваться"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
