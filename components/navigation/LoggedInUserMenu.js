import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/authState';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const { userAuth, userAuthReducer } = useContext(AuthContext);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function onSelect(e) {
        const item = e.target.innerText;

        switch (item) {
            case 'Мойте резервации': router.push('/user/settings', 'reservations'); break;
            case 'Пътници': router.push('/user/settings', 'passengers'); break;
            case 'Данни за контакт': router.push('/user/settings', 'user_data'); break;
            case 'Данни за платеца': router.push('/user/settings', 'payment_data'); break;
            case 'Настройки': router.push('/user/settings'); break;
            case 'Изход': router.pathname.includes('/user/') && router.push('/'); userAuthReducer({}, 'LOGOUT'); break;
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="My Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <div style={{ color: 'white', display: 'flex', gap: '8px' }}>
                            <AccountCircleIcon />
                            <span>{userAuth.email}</span>
                        </div>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* <MenuItem onClick={onSelect}>
                    <ListItemIcon>
                        <BusinessCenterIcon fontSize='small' />
                    </ListItemIcon>
                    Мойте резервации
                </MenuItem> */}
                <MenuItem onClick={onSelect}>
                    <ListItemIcon>
                        <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    Пътници
                </MenuItem>
                <MenuItem onClick={onSelect}>
                    <ListItemIcon>
                        <ContactPageIcon fontSize="small" />
                    </ListItemIcon>
                    Данни за контакт
                </MenuItem>
                <MenuItem onClick={onSelect}>
                    <ListItemIcon>
                        <PaymentIcon fontSize="small" />
                    </ListItemIcon>
                    Данни за платеца
                </MenuItem>
                <Divider />
                <MenuItem onClick={onSelect}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Настройки
                </MenuItem>
                <MenuItem onClick={onSelect}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Изход
                </MenuItem>
            </Menu>
        </>
    );
}