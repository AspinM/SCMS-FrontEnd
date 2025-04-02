'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Higher-Order Component to protect routes
const withAuth = (WrappedComponent) => {
    const AuthHOC = (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    // Set the display name for easier debugging
    AuthHOC.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthHOC;
};

export default withAuth;
