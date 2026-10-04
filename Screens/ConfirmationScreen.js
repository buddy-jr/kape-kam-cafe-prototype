import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BROWN, CREAM } from '../Data/menuData';

export default function ConfirmationScreen({ navigation, route }) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pre-Order Confirmed!</Text>

      <View style={styles.codeBox}>
        <Text style={styles.codeLabel}>PICK-UP CODE</Text>
        <Text style={styles.codeText}>{order?.pickupCode}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.btnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', color: BROWN },
  codeBox: { backgroundColor: CREAM, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center', marginVertical: 16 },
  codeLabel: { fontSize: 11, color: '#8A7565' },
  codeText: { fontSize: 28, fontWeight: '800', color: BROWN },
  btn: { backgroundColor: BROWN, padding: 14, borderRadius: 10, alignItems: 'center', width: '100%' },
  btnText: { color: '#fff', fontWeight: '700' },
});