import styles from '../modal/AuthModal.module.css';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { UserContext } from '../../../context/userState';

export default function SignIn() {
    const [isRegister, setIsRegister] = useState(false);
    const { userReducer } = useContext(UserContext);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        if (isRegister) {
            userReducer({ email, password, provider: 'EMAIL' }, 'REGISTER');
        } else {
            userReducer({ email, password, provider: 'EMAIL' }, 'LOGIN');
        }
    };

    const onGoogleLogin = (e) => {
        e.preventDefault();
        userReducer({ email: '', password: '', provider: 'GOOGLE' }, 'LOGIN');
    }

    const onFacebookLogin = (e) => {
        e.preventDefault();
        userReducer({ email: '', password: '', provider: 'FACEBOOK' }, 'LOGIN');
    }

    const onFormChange = (e) => {
        e.preventDefault();
        setIsRegister(x => x = !x);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {isRegister
                        ? 'Регистрация'
                        : 'Вход'
                    }
                </Typography>
                <Box component="form" method='post' onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Имейл"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Парола"
                        type="password"
                        autoComplete="current-password"
                    />
                    {isRegister && <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="rePassword"
                        label="Повторете паролата"
                        type="password"
                        autoComplete="current-password"
                    />}
                    <div className={styles.wrapper}>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомни ме"
                        />
                        {!isRegister &&
                            <Grid className={styles.forgottenPassword} item xs>
                                <Link href="#" variant="body2">
                                    Забравена парола?
                                </Link>
                            </Grid>
                        }
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Вход
                    </Button>
                    <Grid container>
                        <div className={styles.center}>
                            <Grid item>
                                <Link href="#" onClick={onFormChange} variant="body2">
                                    {isRegister
                                        ? "Вече имате регистрация? Вход"
                                        : "Все още нямате профил? Регистрация"
                                    }
                                </Link>
                            </Grid>
                        </div>
                    </Grid>
                    <div className={styles.buttons}>
                        <Button
                            onClick={onGoogleLogin}
                            color='error'
                            fullWidth
                            className={styles.googleButton}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <span className={styles.buttonsSpan}>Продължи с Google</span> <GoogleIcon />
                        </Button>
                        <Button
                            onClick={onFacebookLogin}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <div className={styles.div}>
                                <span className={styles.buttonsSpan}>Продължи с Fecebook</span>
                                <FacebookIcon />
                            </div>
                        </Button>
                    </div>
                </Box>
            </Box>
        </Container>
    );
}