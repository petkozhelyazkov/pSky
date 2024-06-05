import styles from './Navigation.module.css';
import LoginIcon from '@mui/icons-material/Login';
import { useContext, useEffect } from 'react';
import AuthModal from '../authModal/AuthModal';
import { AuthContext } from '../../contexts/authState';
import { AuthModalContext } from '../../contexts/authModalState';
import LoggedInUserMenu from './LoggedInUserMenu';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

export default function Navigation() {
    const { authModalReducer } = useContext(AuthModalContext);
    const { userAuth } = useContext(AuthContext);

    useEffect(() => {
        if (userAuth.uid) {
            authModalReducer(false);
        }
    }, [userAuth]);

    function onModal(e) {
        e.preventDefault();
        authModalReducer(true);
    }

    return (
        <nav>
            <ul className={styles.navigation}>
                <li>
                    <div className={styles.logoLink}>
                        <Link href="/">
                            <AirplaneTicketIcon style={{ fontSize: '70px' }} />
                        </Link>
                    </div>
                </li>
                <Link href='/' text='Начало' />
                <Link href='/search' text='Оферти' />
                <Link href='/about' text='За нас' />
                <li>
                    <div className={styles.loginLink}>
                        {!userAuth.uid
                            ?
                            <>
                                <div className={styles.loginIcon}>
                                    <LoginIcon />
                                </div>
                                <Link href='/login' onClick={onModal} text='Вход' />
                            </>
                            : <LoggedInUserMenu />
                        }
                    </div>
                </li>
            </ul>
            <AuthModal />
        </nav>
    );
}

function Link({ text, href, onClick, children }) {

    return (
        <div>
            <a className={styles.link} onClick={onClick} href={href}>
                {text}
                {children}
            </a>
        </div>
    );
}