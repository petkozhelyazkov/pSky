import '../styles/globals.css';
import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import { UserState } from '../contexts/userState';
import Footer from '../components/footer/Footer';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>pSky</title>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />
			</Head>
			<LocalizationProvider dateAdapter={DateAdapter}>
				<UserState>
					<Navigation />
					<Component {...pageProps} />
				</UserState>
			</LocalizationProvider>
			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default MyApp
