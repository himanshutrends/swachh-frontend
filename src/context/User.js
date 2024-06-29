'use client'
import { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    user: {},
    error: {},
    loading: false,
    login: () => { },
    logout: () => { },
})

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        rememberMe: false
    });

    const [error, setError] = useState({
        message: "",
        status: false
    });

    const [loading, setLoading] = useState(false);

    const checkUser = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }

    useEffect(() => {
        checkUser();
    }
    , [])

    const login = async (auth_user) => {
        setLoading(true);
        try{
            const { email, password, rememberMe } = auth_user;
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, rememberMe })
            })
            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(data.msg);
            }
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(data));
            }
            setUser(data);
        } catch (error) {
            if (error.message){
                setError(
                    {
                        message: error.message,
                        status: true
                    }
                )
            }
            else {
                setError(
                    {
                        message: "Something went wrong, please try again later.",
                        status: true
                    }
                )
            }
        } finally {
            setLoading(false)
        }
    }

    const signup = async (auth_user) => {
        setLoading(true);
        try{
            const { email, password } = auth_user;
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(data.msg);
            }
            setUser(data);
        } catch (error) {
            if (error.message){
                setError(
                    {
                        message: error.message,
                        status: true
                    }
                )
            }
            else {
                setError(
                    {
                        message: "Something went wrong, please try again later.",
                        status: true
                    }
                )
            }
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser({});
    }

    return (
        <UserContext.Provider value={{
            user,
            error,
            loading,
            login,
            signup,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

