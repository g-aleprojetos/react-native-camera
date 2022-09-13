import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {launchCamera} from 'react-native-image-picker';
import {DocumentDirectoryPath, writeFile} from 'react-native-fs';

const Camera = () => {
  const [imagePhoto, setImagePhoto] = useState<string | undefined>();
  const path = `${DocumentDirectoryPath}/${Date.now()}.txt`;

  const openCamera = async () => {
    let options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      quality: 0.1,
      cameraType: 'back',
    };

    await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User Cancellet image picker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        if (response.assets) {
          setImagePhoto(response.assets[0].uri);
          console.log(response.assets);
        }
      }
    });
  };

  const saveFile = async () => {
    try {
      await writeFile(path, 'String', 'utf8');
      Alert.alert('File saved', 'OK');
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      {imagePhoto && <Image source={{uri: imagePhoto}} style={styles.photo} />}
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Open Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={saveFile} style={styles.button}>
        <Text style={styles.buttonText}>Save File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  photo: {
    width: 200,
    height: 300,
  },
});
