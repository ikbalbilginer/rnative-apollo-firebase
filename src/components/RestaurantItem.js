import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useLazyQuery, useMutation} from '@apollo/client';
import {DELETE_RESTAURANT} from '../graphql/mutations';
import colors from '../assets/colors'
import Loader from './Loader'

const RestaurantItem = ({restaurant,formState, setFormState}) => {
  AntDesign.loadFont();
  const [deleteRestaurant, {data, loading}] = useMutation(DELETE_RESTAURANT, {
    refetchQueries: [
      'Restaurants', 
    ],
  });
  const restaurantId = restaurant.restaurantId;

  const handleEditPress = () => {
    
    setFormState(restaurantId);
  };

  const handleDeletePress = () => {
    deleteRestaurant({
      variables: {
        restaurantId,
      },
    });
  };

  const backgroundColor = formState === restaurantId ? colors.softBlue : 'white';

  return (
    <View style={[styles.container, {backgroundColor}]}>
      { !!loading && <Loader />}
      <View style={styles.infoContainer}>
        <View style={styles.line}>
          <Text style={styles.title}>{'Name : '}</Text>
          <Text>{restaurant.name}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.title}>{'Location : '}</Text>
          <Text>{restaurant.location}</Text>
        </View>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={{marginRight: 40}} onPress={handleEditPress}>
          <AntDesign color={'black'} size={24} name="edit" />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 20}} onPress={handleDeletePress}>
          <AntDesign
            style={styles.icon}
            color={'red'}
            size={24}
            name="delete"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  infoContainer: {
    width: '50%'
  },
  icons: {
    flexDirection: 'row',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  container: {
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
});
