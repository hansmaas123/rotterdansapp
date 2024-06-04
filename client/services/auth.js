const AUTH_DATA = "auth-data-rotterdans";

export const authenticate = async (email, password) => {
    let response;
    try {
        response = await fetch('http://localhost:1337/api/auth/local/register/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
        );
    } catch (error) {
        console.log("Auth response error", error.response);
        throw error;
    }

    const data = await response.json();
    if (data.error) {
        throw data.error;
    }
    setAuthData(data);

    return data;
};

export const register = async (username, email, password) => {
    let response
    try {
        response = await fetch('http://localhost:1337/api/auth/local/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Registration failed:', error);
        throw error
    }
    const data = await response.json();
    if (data.error) {
        throw data.error;
    }
    setAuthData(data);

    return data;
};

export const setAuthData = (authData) => {
    if (authData) {
        localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
    }
};

export const getAuthData = () => {
    const authData = localStorage.getItem(AUTH_DATA);
    return authData ? JSON.parse(authData) : {};
};

export const getToken = () => {
    const authData = getAuthData();
    return authData.jwt;
};
export const getProfile = async () => {
    const result = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/users/me?populate=*`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        }
    ).then((res) => res.json());
    return result;
};

export const removeAuthData = () => {
    localStorage.removeItem(AUTH_DATA);
}