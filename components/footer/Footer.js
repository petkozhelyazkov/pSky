import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.footerDark}>
            <footer>
                <div className={styles.container}>
                    <div className={styles.footer}>
                        <div className={`col-md-6 ${styles.item} ${styles.text} ${styles.company}`}>
                            <h3 className={styles.name}>pSky</h3>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '12px' }}>
                                <p style={{ textAlign: 'center' }}>
                                    <span style={{ fontWeight: '700' }}>Южна Америка</span> Argentina Bolivia Brasil Chile El Salvador Colombia Costa Rica República Dominicana Guatemala Honduras México Nicaragua Panamá Perú Puerto Rico Paraguay
                                </p>
                                <p style={{ textAlign: 'center' }}>
                                    <span style={{ fontWeight: '700' }}>Европа </span> België Bosna i Hercegovina България Česká republika Danmark Deutschland Espańa France Ελλάδα Hrvatska Ireland Italia Magyarország Moldova Nederland Norge Österreich Polska Portugal Srbija România Sverige Slovensko Suomi Schweiz United Kingdom
                                </p>
                                <p style={{ textAlign: 'center' }}>
                                    <span style={{ fontWeight: '700' }}>Африкa</span> Egypt Kenya Maroc Nigeria South Africa Ази Hong Kong Malaysia Singapore Türkiye Австралия и Океания
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.copyright}>pSky © 2022</p>
                </div>
            </footer>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
        </div>
    )
}