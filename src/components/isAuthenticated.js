'use client'
import { useEffect } from 'react';
import { useUser } from '@/context/User';
import { useRouter } from "next/navigation";

const isAuthenticated = (WrappedComponent) => {
    return (props) => {
        const { user, loading, response_code, logout } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (response_code === 401) {
                logout()
            }
            if (!loading && !user?.email) {
                router.push('/auth/login');
            }
        }, [loading, router, response_code]);

        if (loading || !user?.email) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <p>Loading...</p>
                </div>
            ) 
        }

        return <WrappedComponent {...props} />;
    };
};

export default isAuthenticated;
