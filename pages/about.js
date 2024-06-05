import styles from '../styles/about.module.css';
import Footer from '../components/footer/Footer';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function about() {
    const [expand, setExpand] = useState(false);

    function onExpand(action) {

        return () => {
            if (action == 'open') setExpand(true)
            if (action == 'close') setExpand(false)
        }
    }

    return (
        <div>
            <div className={styles.nav}></div>
            <div className={styles.wrapper}>
                <h4>ПРОФЕСИОНАЛНА ГИМНАЗИЯ ПО ЕЛЕКТРОТЕХНИКА - ВАРНА</h4>
                <img src="pge.png" />
                <br />
                <h2 style={{ fontWeight: '700' }}>ДИПЛОМНА РАБОТА</h2>
                <br />
                <h3>Тема:</h3>
                <h4>Разработка на уеб сайт за закупуване на самолетни билети</h4>
                <h5>Дипломант: Петко Живков Желязков</h5>
                <h5>Специалност: Системен програмист</h5>
                <h5>Ръководител: инж. Ганчо Гочев</h5>
                <br />
                <br />
                <h6>ПГЕ Варна, 2022г.</h6>
            </div>
            <div className={styles.moreWrapper}>
                {expand
                    ? <ExpandLessIcon className={styles.expandIcon} onClick={onExpand('close')} fontSize='large' />
                    : <ExpandMoreIcon className={styles.expandIcon} onClick={onExpand('open')} fontSize='large' />
                }
            </div>
            <div className={`${styles.detailsWrapper} ${!expand && styles.hidden}`}>
                <h4>Използвани технологии</h4>
                <ul className={styles.list}>
                    <li ><h5>JavaScript</h5></li>
                    <li ><h5>JSX</h5></li>
                    <li ><h5>CSS</h5></li>
                    <li ><h5>Next.js</h5></li>
                    <li ><h5>Firebase Cloud Firestore</h5></li>
                    <li ><h5>Firebase Authentication</h5></li>
                    <li ><h5>Material UI</h5></li>
                    <li ><h5>Redis</h5></li>
                    <li ><h5>Amadeus API</h5></li>
                </ul>
            </div>
            <Footer />
        </div >
    )
}