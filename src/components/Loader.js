import React from 'react'
import { StyleSheet, Text,Image, View } from 'react-native'
import spinner from '../assets/spinner.gif'

const Loader = () => {
    return (
        <View style={styles.curtain}>
        <Image source={spinner} style={styles.spinner} />
        {/* <Text style={{color: 'white'}}>Loading ...</Text> */}
      </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    curtain: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      spinner: {
        height: "70%",
        maxHeight: 140,
        resizeMode: 'contain'
      }
})
