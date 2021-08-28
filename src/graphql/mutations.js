import {gql} from '@apollo/client';

export const CREATE_RESTAURANT = gql`
  mutation createRestaurant($name: String!, $location: String!) {
    createRestaurant(createRestaurantData: {name: $name, location: $location}) {
      name
      location
    }
  }
`;

export const UPDATE_RESTAURANT = gql`
  mutation updateRestaurant ($restaurantId: String!, $name: String!, $location: String!) {
    updateRestaurant(
      updateRestaurantData: {
        restaurantId: $restaurantId
        name: $name
        location: $location
      }
    ) {
      restaurantId
      location
      name
    }
  }
`;

export const DELETE_RESTAURANT = gql`
  mutation deleteRestaurant ($restaurantId: String!) {
    deleteRestaurant(
      deleteRestaurantData: {
        restaurantId: $restaurantId
      }
    ) {
      restaurantId
      location
      name
    }
  }
`;
