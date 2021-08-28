import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  View,
} from 'react-native';
import {useLazyQuery, useMutation} from '@apollo/client';

import RestaurantList from '../components/RestaurantList';
import CreateRestaurant from '../components/CreateRestaurant';
import EditRestaurant from '../components/EditRestaurant';
import Header from '../components/Header';

import {GET_ALL_RESTAURANTS} from '../graphql/queries';

const Home = () => {
  const [formState, setFormState] = useState('create');
  const [getAllData, { loading,error, data}] = useLazyQuery(GET_ALL_RESTAURANTS, { fetchPolicy: "no-cache"});

  useEffect(() => {
    getAllData();
  }, []);

  if (error) {
    console.log('Get data error : ', error);
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <Header />
      {
        formState === 'create' ?
        <CreateRestaurant  /> :
        <EditRestaurant formState={formState} setFormState={setFormState} /> 
      }
      <Text style={styles.title}>Restaurants</Text>
      <RestaurantList 
      formState={formState} 
      setFormState={setFormState} 
      loading={loading} 
      data={data} 
      error={error}/>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  createContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#788eec',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
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
    backgroundColor: '#788eec',
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
  title: {
    fontSize: 21,
    marginBottom: 15,
    fontWeight: 'bold',
    marginLeft: 10
  },
});
