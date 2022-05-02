import styles from '../styles/Home.module.css';
import SearchForm from '../components/searchForm/SearchForm';
import { SearchFormState } from '../contexts/searchFormState';

export default function Home() {
	const flights = [];

	return (
		<div className={styles.image}>
			<div className={styles.searchForm}>
				<SearchFormState>
					<SearchForm />
				</SearchFormState>
			</div>
		</div>
	)
}
