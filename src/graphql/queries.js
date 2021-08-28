import {gql} from '@apollo/client';

export const GET_RESTAURANT_BY_ID = gql`
  query Restaurant($restaurantId: String!) {
    restaurant(restaurantId: $restaurantId) {
      restaurantId
      name
      location
    }
  }
`;

export const GET_ALL_RESTAURANTS = gql`
  query Restaurants{
    restaurants {
      restaurantId
      name
      location
    }
  }
`;
