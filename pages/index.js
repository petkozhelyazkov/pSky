import styles from '../styles/Home.module.css';
import SearchForm from '../components/searchForm/SearchForm';
import Footer from '../components/footer/Footer';


export default function Home() {

	return (
		<>
			<div className={styles.image}>
				<div className={styles.searchForm}>
					<SearchForm />
				</div>
			</div>
			<Footer />
		</>

	)
}
