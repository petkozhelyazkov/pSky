import styles from './AuthModal.module.css';
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
import { AuthContext } from '../../contexts/authState';

export default function SignIn() {
    const { userAuthReducer } = useContext(AuthContext);
    const [isRegister, setIsRegister] = useState(false);
    const [validation, setValidation] = useState({
        email: {
            isError: false,
            msg: ''
        },
        password: {
            isError: false,
            msg: ''
        },
        rePassword: {
            isError: false,
            msg: ''
        },
    });

    const onFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email, password, rePassword } = Object.fromEntries(new FormData(e.currentTarget));

            if (isRegister) {
                if (password != rePassword) {
                    setValidation({
                        email: { isError: false, msg: '' },
                        rePassword: { isError: true, msg: 'Паролите не съвпадат!' },
                        password: { isError: false, msg: '' }
                    })

                    return;
                }
            } else {
                setValidation({
                    email: { isError: false, msg: '' },
                    rePassword: { isError: false, msg: '' },
                    password: { isError: false, msg: '' }
                })
            }

            if (isRegister) {
                await userAuthReducer({ email, password, provider: 'EMAIL' }, 'REGISTER');
            } else {
                await userAuthReducer({ email, password, provider: 'EMAIL' }, 'LOGIN');
            }
        } catch (x) {
            let err = x.message.substring(x.message.indexOf('/') + 1, x.message.length - 2);

            switch (err) {
                case 'invalid-email':
                    setValidation({
                        password: { isError: false, msg: '' },
                        rePassword: { isError: false, msg: '' },
                        email: { isError: true, msg: 'Невалиден имейл!' }
                    }); break;
                case 'user-not-found':
                    setValidation({
                        password: { isError: false, msg: '' },
                        rePassword: { isError: false, msg: '' },
                        email: { isError: true, msg: 'Няма потребител с този имейл!' }
                    }); break;
                case 'email-already-in-use':
                    setValidation({
                        email: { isError: true, msg: 'Моля изберете друг имейл!' },
                        rePassword: { isError: false, msg: '' },
                        password: { isError: false, msg: '' }
                    }); break;
                case 'too-many-requests':
                    setValidation({ ...validation, email: { isError: true, msg: 'Моля изчакайте няколко минути и опитайте пак!' } }); break;
                case 'internal-error':
                    setValidation({
                        email: { isError: false, msg: '' },
                        rePassword: { isError: false, msg: '' },
                        password: { isError: true, msg: 'Моля въведете парола!' }
                    }); break;
                case 'wrong-password':
                    setValidation({
                        email: { isError: false, msg: '' },
                        rePassword: { isError: false, msg: '' },
                        password: { isError: true, msg: 'Грешна парола!' }
                    }); break;
                case 'weak-password':
                    setValidation({
                        email: { isError: false, msg: '' },
                        rePassword: { isError: false, msg: '' },
                        password: { isError: true, msg: 'Паролата трябва да е поне 6 символа!' }
                    }); break;
            }
        }
    };

    const onGoogleLogin = (e) => {
        e.preventDefault();
        userAuthReducer({ email: '', password: '', provider: 'GOOGLE' }, 'LOGIN');
    }

    const onFacebookLogin = (e) => {
        e.preventDefault();
        userAuthReducer({ email: '', password: '', provider: 'FACEBOOK' }, 'LOGIN');
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
                        error={validation.email.isError}
                        helperText={validation.email.isError ? validation.email.msg : ''}
                        margin="normal"
                        required
                        fullWidth
                        label="Имейл"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        error={validation.password.isError}
                        helperText={validation.password.isError ? validation.password.msg : ''}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Парола"
                        type="password"
                        autoComplete="current-password"
                    />
                    {isRegister && <TextField
                        error={validation.rePassword.isError}
                        helperText={validation.rePassword.isError ? validation.rePassword.msg : ''}
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
                        {isRegister
                            ? "Регистрация"
                            : "Вход"
                        }
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