import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import StudentVue, { Client } from './src/utilities/StudentVue';

export default function App() {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [district, setDistrict] = React.useState<string>('');
  const [zipCode, setZipCode] = React.useState<string>('');
  const [client, setClient] = React.useState<Client | null>(null);
  const [image, setImage] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   console.log(client?.getUsername(), client?.getPassword(), image);
  // }, [client, image]);

  async function login() {
    try {
      const student = await StudentVue.login('https://student.tusd1.org', username, password);
      setClient(student);
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
    console.log(`The name of this student is ${info?.FormattedName[0]}`);
    setImage(`data:image/png;base64,${info!.Photo[0]}`);
  }

  function signout() {
    setClient(null);
    setUsername('');
    setPassword('');
    setImage(null);
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
          {image && <Image source={{ uri: image ?? '' }} style={{ width: 200, height: 200 }} />}
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
