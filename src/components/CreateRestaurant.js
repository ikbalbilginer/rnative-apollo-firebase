import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {useLazyQuery, useMutation} from '@apollo/client';
import {CREATE_RESTAURANT} from '../graphql/mutations';
import colors from '../assets/colors'
import Loader from './Loader'


const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const [addRestaurant, {data, loading}] = useMutation(CREATE_RESTAURANT, {
    refetchQueries: [
      'Restaurants', 
    ],
  });

  const handleSubmit = () => {
    addRestaurant({variables: {name, location}});
  };

  return (
    <View style={styles.createContainer}>
      {!!loading && <Loader />}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder="Location"
        onChangeText={text => setLocation(text)}
        value={location}
      />
      <TouchableHighlight style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonTitle}>CREATE RESTAURANT</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CreateRestaurant;

const styles = StyleSheet.create({
  createContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.createGreen,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: colors.softGreen
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    width: '80%',
  },
  button: {
    backgroundColor: colors.createGreen,
    width: '80%',
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
