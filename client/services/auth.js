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
    return data;
};

