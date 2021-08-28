import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import auth from '@react-native-firebase/auth';


const Header = () => {

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const user = auth().currentUser;
  const email = user?.email;


  return (
    <View style={styles.container}>
      <Text>{email}</Text>

      <TouchableHighlight style={styles.button} onPress={signOut}>
        <Text style={styles.text}>SignOut</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'orange',
        marginHorizontal: 10,
        paddingVertical: 10
    },
    button : {
        // backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        borderRadius: 5
    },
    text: {
      fontWeight: 'bold',
      color: 'red'
    }
});
