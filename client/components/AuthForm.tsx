// import React from 'react';
// import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { register, login } from '../services/api';

// const AuthForm = ({ type }) => {
//     const isLogin = type === 'login';

//     const validationSchema = Yup.object().shape({
//         email: Yup.string().email('Invalid email').required('Required'),
//         password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
//         ...(isLogin ? {} : { confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required') })
//     });

//     const { control, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(validationSchema)
//     });

//     const onSubmit = async (data) => {
//         try {
//             if (isLogin) {
//                 const response = await login(data.email, data.password);
//                 Alert.alert('Success', `Welcome back, ${response.user.username}!`);
//             } else {
//                 const response = await register(data.email, data.password);
//                 Alert.alert('Success', `Welcome, ${response.user.username}!`);
//             }
//         } catch (error) {
//             Alert.alert('Error', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Controller
//                 control={control}
//                 name="email"
//                 render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                     />
//                 )}
//             />
//             {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

//             <Controller
//                 control={control}
//                 name="password"
//                 render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Password"
//                         secureTextEntry
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                     />
//                 )}
//             />
//             {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

//             {!isLogin && (
//                 <>
//                     <Controller
//                         control={control}
//                         name="confirmPassword"
//                         render={({ field: { onChange, onBlur, value } }) => (
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Confirm Password"
//                                 secureTextEntry
//                                 onBlur={onBlur}
//                                 onChangeText={onChange}
//                                 value={value}
//                             />
//                         )}
//                     />
//                     {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
//                 </>
//             )}

//             <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit(onSubmit)} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//     },
//     input: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
//     error: {
//         color: 'red',
//         marginBottom: 10,
//     },
// });

// export default AuthForm;
