import styles from './SettingsNavigation.module.css';
import Settings from '@mui/icons-material/Settings';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';

export default function SettingsNavigation({
    setPage,
    page
}) {

    function onPageChanage(e) {
        let page = e.target.innerText;

        switch (page) {
            case 'Моите резервации': setPage('reservations'); break;
            case 'Пътници': setPage('passengers'); break;
            case 'Данни за контакт': setPage('user_data'); break;
            case 'Данни за платеца': setPage('payment_data'); break;
            case 'Настройки': setPage('settings'); break;
        }
    }

    return (
        <div className={styles.wrapper}>
            {/* <NavItem onClick={onPageChanage} page={page} name='reservations' label='Моите резервации'>
                <BusinessCenterIcon />
            </NavItem> */}
            <NavItem onClick={onPageChanage} page={page} name='passengers' label='Пътници' >
                <PeopleIcon />
            </NavItem>
            <NavItem onClick={onPageChanage} page={page} name='user_data' label='Данни за контакт' >
                <ContactPageIcon />
            </NavItem>
            <NavItem onClick={onPageChanage} page={page} name='payment_data' label='Данни за платеца' >
                <PaymentIcon />
            </NavItem>
            <NavItem onClick={onPageChanage} page={page} name='settings' label='Настройки' >
                <Settings />
            </NavItem>
        </div>
    )
}

function NavItem({
    label,
    children,
    onClick,
    name,
    page
}) {
    return (
        <div onClick={onClick} className={styles.navItem}>
            {children}
            <a className={page == name ? styles.navLinkSelected : styles.navLink} href='#'>{label}</a>
        </div>
    )
}