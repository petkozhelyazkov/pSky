import '../styles/globals.css';
import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import { AuthState } from '../contexts/authState';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AuthModalState } from '../contexts/authModalState';
import { SearchFormState } from '../contexts/searchFormState';
import { ReserveState } from '../contexts/reserveState';
import { UserState } from '../contexts/userContext';

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
			<div>
				<LocalizationProvider dateAdapter={DateAdapter}>
					<SearchFormState>
						<AuthState>
							<UserState>
								<AuthModalState>
									<ReserveState>
										<Navigation />
										<Component {...pageProps} />
									</ReserveState>
								</AuthModalState>
							</UserState>
						</AuthState>
					</SearchFormState>
				</LocalizationProvider>
			</div>
		</>
	)
}

export default MyApp
