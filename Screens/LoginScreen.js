import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { BROWN } from '../Data/menuData';

export default function LoginScreen({ navigation, route }) {
  const { setUser } = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) return Alert.alert('Error', 'Please enter email and password.');
    if (setUser) setUser({ name: 'Coffee Lover', email });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>KAPE-KAM CAFE</Text>
      <Text style={styles.subtitle}>Enjoy your Coffee</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  logo: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', textAlign: 'center', color: BROWN },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: 24 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10 },
  btn: { width: '100%', backgroundColor: BROWN, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  signupBtn: { marginTop: 16 },
  signupText: { color: BROWN, textAlign: 'center', fontWeight: '600' },
});