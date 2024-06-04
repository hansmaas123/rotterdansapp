import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authenticate } from '../../services/auth'
const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async () => {
        setEmailError('');
        setPasswordError('');
        let formIsValid = true;

        const emailRegex = /\S+@\S+\.\S+/;
        if (!email.trim()) {
            setEmailError('Please fill in an email address');
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
        if (formIsValid) {
            try {
                await authenticate(email, password);
            }
            catch (error) {
                return {
                    error: { general: error.message }
                };
            }
            console.log('User Logged in:', data);
            navigation.navigate('Map');
        }
    };

    return (
        <>
            <Text style={styles.title}>Log in</Text>
            <View style={styles.container}>
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
                <Pressable onPress={handleRegister} style={styles.button} ><Text style={styles.buttons__text}>Log in</Text></Pressable>
            </View>
        </>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    title: {
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