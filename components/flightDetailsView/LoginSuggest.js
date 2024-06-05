import styles from './LoginSuggest.module.css';
import AuthModal from '../authModal/AuthModal';
import { useContext } from 'react';
import { AuthModalContext } from '../../contexts/authModalState';

export default function LoginSuggest({
    user
}) {
    const { authModalReducer } = useContext(AuthModalContext);

    function onLogin() {
        authModalReducer(true);
    }

    return (
        <div style={{ marginBottom: '40px' }}>
            <AuthModal />
            <div className={styles.loginWrapper}>
                {user.uid
                    ? <span>Вписан като: {user.email}</span>
                    : <>
                        <span >За автоматично попълване на данните, влез в своя профил.</span>
                        <button onClick={onLogin}>Вход</button>
                    </>}

            </div>
        </div>
    )
}