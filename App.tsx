import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import StudentVue, { Client } from './src/utilities/StudentVue';

export default function App() {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [district, setDistrict] = React.useState<string>('');
  const [zipCode, setZipCode] = React.useState<string>('');
  const [client, setClient] = React.useState<Client>();
  const [image, setImage] = React.useState<string | null>(null);

  async function login() {
    try {
      const d = await StudentVue.login('https://student.tusd1.org', username, password);
      setClient(d);
    } catch (e) {
      console.error(e);
    }
  }
  async function findDistrict() {
    const d = await StudentVue.districts(zipCode);
    console.log(d);
  }

  async function getStudentInfo() {
    const info = await client?.studentInfo();
    setImage(`data:image/png;base64,${info!.Photo[0]}`);
    console.log(info);
  }

  function signout() {
    setClient(undefined);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Zip Code'
        onChangeText={setZipCode}
        onEndEditing={findDistrict}
      />
      <Text>{district}</Text>
      <Text>ScholarX</Text>
      {client ? (
        <>
          <Image source={{ uri: image ?? '' }} style={{ width: 200, height: 200 }} />
          <Button title='Get student info' onPress={getStudentInfo} />
          <Button title='Sign out' onPress={signout} />
        </>
      ) : (
        <>
          <TextInput style={styles.textInput} placeholder='Username' onChangeText={setUsername} />
          <TextInput style={styles.textInput} placeholder='Password' secureTextEntry onChangeText={setPassword} />
          <Button title='Login' onPress={login} />
        </>
      )}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 200,
    padding: 8,
    height: 40,
    backgroundColor: '#ddd',
  },
});
