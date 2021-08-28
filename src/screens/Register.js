import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';

export default function RegistrationScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert('Please check passwords.');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            alert('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, width: '100%'}}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
