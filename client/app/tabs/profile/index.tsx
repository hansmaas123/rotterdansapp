import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProfile, getAuthData } from '../../../services/auth';

const ProfileScreen = () => {
    const { user } = getAuthData();
    const navigation = useNavigation();

    if (!user) {
        return navigation.navigate('Login');
    }
    // const profile = await getProfile();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile Screen</Text>
            {/* <Text>Welcome, {profile.username}</Text> */}
            {/* <Button title="Logout" onPress={logout} /> */}
        </View>
    );
};

export default ProfileScreen;
