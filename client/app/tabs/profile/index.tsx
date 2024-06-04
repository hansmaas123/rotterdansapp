import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async () => {
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        let formIsValid = true;
        
        if (!username.trim()) {
            setUsernameError('Please fill in a username ');
            formIsValid = false;
        }
        else if (username.trim().length < 3) {
            setUsernameError('Username should be at least 3 characters long');
            formIsValid = false;
        }
        
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email.trim()) {
            setEmailError('Please fill in an email address');
            formIsValid = false;
        }
        else if (email.trim().length < 6) {
            setEmailError('Email should be at least 6 characters long');
            formIsValid = false;
        }
        else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            formIsValid = false;
        }
        
        if (!password.trim()) {
            setPasswordError('Please fill in a password');
            formIsValid = false;
        }
        else if (password.trim().length < 6) {
            setPasswordError('Password should be at least 6 characters long');
            formIsValid = false;
        }
        
        if (formIsValid){   
            try {
                const response = await fetch('http://localhost:1337/api/auth/local/register/', {
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
                const data = await response.json();
                console.log('User registered:', data);
                navigation.navigate('Map');
            } catch (error) {
                console.error('Registration failed:', error);
            }
        }
    };
    
    return (
        <>
        <Text style={styles.title}>Register</Text>
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.inputField}
            />
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.inputField}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.inputField}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <Pressable onPress={handleRegister} style={styles.button} ><Text style={styles.buttons__text}>Register</Text></Pressable>
        </View>
        </>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    title:{
        margin: 10,
        marginLeft: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        margin: 10,
        width: 350,
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'black',
        width: '90%',
        marginTop: 50,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons__text: {
        color: 'white',
        fontSize: 18
    },
    errorText: {
        color: 'red'
    }
})