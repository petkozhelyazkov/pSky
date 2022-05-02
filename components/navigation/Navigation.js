import styles from './Navigation.module.css';
import LoginIcon from '@mui/icons-material/Login';
import { useContext, useEffect } from 'react';
// import AuthModal from './modal/AuthModal';
import { UserContext } from '../../contexts/userState';
// import { ModalContext } from '../../context/modalState';
import LoggedInUserMenu from './LoggedInUserMenu';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

export default function Navigation() {
    // const { modalReducer } = useContext(ModalContext);
    const { user } = useContext(UserContext);

    // useEffect(() => {
    //     if (user.uid) {
    //         modalReducer(false);
    //     }
    // }, [user]);

    // function onModal(e) {
    //     e.preventDefault();
    //     modalReducer(true);
    // }

    return (
        <nav>
            <ul className={styles.navigation}>
                <li>
                    <div className={styles.logoLink}>
                        <AirplaneTicketIcon style={{ fontSize: '70px' }} />
                    </div>
                </li>
                <Link href='/' text='Начало' />
                <Link href='/offers' text='Оферти' />
                <Link href='/about-us' text='За нас' />
                <li>
                    <div className={styles.loginLink}>
                        {!user.uid
                            ?
                            <>
                                <div className={styles.loginIcon}>
                                    <LoginIcon />
                                </div>
                                <Link href='/login' onClick={() => { console.log('onModal') }} text='Вход' />
                            </>
                            : <LoggedInUserMenu />
                        }
                    </div>
                </li>
            </ul>
            {/* <AuthModal /> */}
        </nav>
    );
}

function Link({ text, href, onClick }) {

    return (
        <div>
            <a className={styles.link} onClick={onClick} href={href}>{text}</a>
        </div>
    );
}