import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RestaurantItem from './RestaurantItem';
import Loader from './Loader';

import {useQuery, useMutation} from '@apollo/client';

const RestaurantList = ({loading, data, error, setFormState, formState}) => {

  const restaurants = data?.restaurants;

  if (error) {
    return <Text>{error.toString()}</Text>
  }
  return (
    <View style={styles.container}>
      {!!loading && <Loader />}
      {!!restaurants?.length ? (
        <FlatList
          // style={{paddingBottom: 300}}
          // contentContainerStyle={{ alignItems: 'center'}}
          data={restaurants}
          renderItem={({item}) => (
            <RestaurantItem
              restaurant={item}
              formState={formState}
              setFormState={setFormState}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <Text>No restaurants.</Text>
      )}
    </View>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    marginHorizontal: 10
  },
});
