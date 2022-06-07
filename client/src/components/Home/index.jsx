import {
	CardActions,
	AppBar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	CssBaseline,
	GlobalStyles,
	Grid,
	Link,
	Toolbar,
	Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/StarBorder";
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);

	const tiers = [
		{
			title: "Тест на знание информатики",
			description: ["10 вопросов", "20 минут ", "Для школьников средних классов"],
			buttonText: "Начать",
			buttonVariant: "outlined",
		},
		{
			title: "Викторина на знание сказок",
			description: ["50 вопросов", "30 минут времени", "Для детей дошкольного возраста"],
			buttonText: "Начать",
			buttonVariant: "outlined",
		},
		{
			title: "Тестирование по биологии",
			description: ["50 вопросов", "1 час", "Для школьников старшего класса"],
			buttonText: "Начать",
			buttonVariant: "outlined",
		},
	];

	return (
		<>
			<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }} />
			<CssBaseline />
			<AppBar
				position='static'
				color='default'
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: "wrap" }}>
					<Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
						Rhf
					</Typography>
					<nav>
						<Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
							Создание теста
						</Link>
						<Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
							Статистика
						</Link>
						<Link variant='button' color='text.primary' href='#' sx={{ my: 1, mx: 1.5 }}>
							Личный кабинет
						</Link>
					</nav>
					<Button
						href='#'
						variant='outlined'
						sx={{ my: 1, mx: 1.5 }}
						onClick={() => dispatch(logoutUser())}
					>
						Выйти
					</Button>
				</Toolbar>
			</AppBar>
			{/* Hero unit */}
			<Container disableGutters maxWidth='sm' component='main' sx={{ pt: 8, pb: 6 }}>
				<Typography component='h1' variant='h2' align='center' color='text.primary' gutterBottom>
					Тестирование
				</Typography>
				<Typography variant='h5' align='center' color='text.secondary' component='p'>
					Возможности мультимедиа позволяют создавать викторины не только в форме «вопрос-ответ», но
					и разработать интерактивную игру с литературными персонажами, поисками предметов,
					ребусами, кроссвордами и другими способами взаимодействия с пользователем.
				</Typography>
			</Container>
			{/* End hero unit */}
			<Container maxWidth='md' component='main'>
				<Grid container spacing={5} alignItems='flex-end'>
					{tiers.map((tier) => (
						// Enterprise card is full width at sm breakpoint
						<Grid item key={tier.title} xs={12} sm={tier.title === "Enterprise" ? 12 : 6} md={4}>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: "center" }}
									action={tier.title === "Pro" ? <StarIcon /> : null}
									subheaderTypographyProps={{
										align: "center",
									}}
									sx={{
										backgroundColor: (theme) =>
											theme.palette.mode === "light"
												? theme.palette.grey[200]
												: theme.palette.grey[700],
									}}
								/>
								<CardContent>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "baseline",
											mb: 2,
										}}
									></Box>
									<ul>
										{tier.description.map((line) => (
											<Typography component='li' variant='subtitle1' align='center' key={line}>
												{line}
											</Typography>
										))}
									</ul>
								</CardContent>
								<CardActions>
									<Button fullWidth variant={tier.buttonVariant}>
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
}
