import { AuthContext } from '../../contexts/authState';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export default function AuthGurad({ children }) {
    const { userAuth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!userAuth.uid) {
            router.push('/');
        }
    }, [userAuth.uid]);

    return children;
}