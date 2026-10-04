import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BROWN, CREAM } from '../Data/menuData';

export default function ReservationScreen({ navigation, route }) {
  const { user, subtotal = 0, placeReservation } = route.params || {};

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');

  const handleConfirm = () => {
    if (!date || !time || !name || !phone) return Alert.alert('Error', 'Please fill in all fields.');

    const order = placeReservation?.({ date, time, name, phone, subtotal });
    navigation.navigate('Confirmation', { order });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Pick-up Date</Text>
      <TextInput placeholder="ex. Oct 2, 2026" value={date} onChangeText={setDate} style={styles.input} />

      <Text style={styles.label}>Pick-up Time</Text>
      <TextInput placeholder="ex. 10:30 AM" value={time} onChangeText={setTime} style={styles.input} />

      <Text style={styles.label}>Full Name</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput placeholder="09123456789" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />

      <View style={styles.summaryBox}>
        <Text style={styles.totalText}>Total Amount: ₱{subtotal}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleConfirm}>
        <Text style={styles.btnText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10 },
  summaryBox: { backgroundColor: CREAM, padding: 12, borderRadius: 8, marginVertical: 12 },
  totalText: { fontWeight: '700' },
  btn: { backgroundColor: BROWN, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  btnText: { color: '#fff', fontWeight: '700' },
});