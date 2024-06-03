// const API_URL = 'http://localhost:1337/api';

// export const getDansers = async () => {
//     try {
//         const response = await fetch(`${API_URL}/dansers`);
//         if (!response.ok) {
//             const error = await response.json();
//             throw new Error(`Network response was not ok: ${JSON.stringify(error)}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching dansers:', error);
//         throw error;
//     }
// };










// const API_URL = 'http://localhost:1337/api'; // Replace with your Strapi URL

// export const register = async (email, password) => {
//     try {
//         const response = await fetch(`${API_URL}/auth/local/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: email,
//                 email,
//                 password,
//             }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message[0].messages[0].message);
//         }

//         return data;
//     } catch (error) {
//         throw error.message;
//     }
// };

// export const login = async (email, password) => {
//     try {
//         const response = await fetch(`${API_URL}/auth/local`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 identifier: email,
//                 password,
//             }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message[0].messages[0].message);
//         }

//         return data;
//     } catch (error) {
//         throw error.message;
//     }
// };