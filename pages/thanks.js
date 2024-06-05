import styles from '../styles/thanks.module.css';
import Footer from '../components/footer/Footer';
import { useRouter } from 'next/router';

export default function thanks() {
    const router = useRouter();

    function onBack() {
        router.push('/');
    }

    return (
        <div>
            <div className={styles.thanksWrapper}>
                <div className={styles.nav}></div>
                <div className={styles.wrapper}>
                    <h1>Благодарим Ви, че избрахте pSky!</h1>
                    <span className={styles.backButton} onClick={onBack}>{'<Обратно към началото'}</span>
                </div>
            </div>
            <Footer />
        </div>
    )
}