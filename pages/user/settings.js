import styles from './Settings.module.css';
import SettingsNavigation from '../../components/userSettings/SettingsNavigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Passengers from '../../components/userSettings/Passengers';
import Reservations from '../../components/userSettings/Reservations';
import UserData from '../../components/userSettings/UserData';
import PaymentData from '../../components/userSettings/PaymentData';
import SettingsView from '../../components/userSettings/SettingsView';
import Footer from '../../components/footer/Footer';
import AuthGurad from '../../components/guards/AuthGuard';

const pages = {
    reservations: <Reservations />,
    passengers: <Passengers />,
    user_data: <UserData />,
    payment_data: <PaymentData />,
    settings: <SettingsView />
};

export default function Settings() {
    const [page, setPage] = useState('');
    const router = useRouter();

    let path = router.asPath;
    let index = path.lastIndexOf('/');
    let formatted = path.substring(index + 1, path.length);

    useEffect(() => {
        setPage(page);
    }, [page]);

    useEffect(() => {
        setPage(formatted);
    }, [formatted])

    return (
        <AuthGurad>
            <div>
                <div style={{ height: '60px', backgroundColor: 'rgb(36, 36, 102)' }}></div>
                <div className={styles.wrapper}>
                    <SettingsNavigation setPage={setPage} page={page} />
                    <div className={styles.view}>
                        {
                            pages[page]
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </AuthGurad>
    )
}