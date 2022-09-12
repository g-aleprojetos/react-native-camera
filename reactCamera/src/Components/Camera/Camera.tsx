import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Camera = () => {
  const [imagePhoto, setImagePhoto] = useState<string | undefined>();



  const openCamera = async () => {
    let options: ImagePicker.CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      quality: 0.1,
      cameraType: 'back',
    };

    await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User Cancellet image picker')
      } else if (response.errorCode) {
        console.log(response.errorMessage)
      } else {
        if (response.assets) {
          setImagePhoto(response.assets[0].uri)
          console.log(response.assets)
        }
      }
    });

  }

  return (
    <View style={styles.container}>
      {
        imagePhoto &&
        <Image
          source={{ uri: imagePhoto }}
          style={{ width: 200, height: 300 }} />
      }
      <TouchableOpacity
        onPress={openCamera}
        style={styles.button}>
        <Text
          style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>

    </View>
  );
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});