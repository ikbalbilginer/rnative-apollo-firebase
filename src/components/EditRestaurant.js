import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity, Image
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import {useLazyQuery, useMutation} from '@apollo/client';
import {UPDATE_RESTAURANT} from '../graphql/mutations';
import colors from '../assets/colors'
import Loader from './Loader'

import spinner from '../assets/spinner.gif'


const EditRestaurant = ({setFormState, formState}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const [updateRestaurant, {data, loading}] = useMutation(UPDATE_RESTAURANT, {
    refetchQueries: [
      'Restaurants', 
    ],
  });

  const handleSubmit = () => {
    updateRestaurant({variables: {restaurantId: formState, name, location}});
  };

  return (
    <View style={styles.createContainer}>
     { !!loading && <Loader />}
      <TouchableOpacity onPress={()=>setFormState('create')} style={styles.close}>
        <AntDesign color={colors.editBlue} size={21} name="closecircle" />
      </TouchableOpacity>
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
        <Text style={styles.buttonTitle}>EDIT RESTAURANT</Text>
      </TouchableHighlight>
    </View>
  );
};

export default EditRestaurant;

const styles = StyleSheet.create({
  
  close: {
    position: 'absolute',
    left: 5,
    top: 5
  },
  createContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.editBlue,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    position: 'relative',
    backgroundColor: colors.softBlue
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
    backgroundColor: colors.editBlue,
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
