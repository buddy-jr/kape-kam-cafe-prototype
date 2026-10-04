import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BROWN, CREAM } from '../Data/menuData';

export default function ProfileScreen({ navigation, route }) {
  const { user, setUser } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.rowBtn} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.rowText}>🛒 My Cart</Text>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rowBtn} onPress={() => navigation.navigate('Favorites')}>
        <Text style={styles.rowText}>❤️ My Favorites</Text>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rowBtn} onPress={() => navigation.navigate('Orders')}>
        <Text style={styles.rowText}>📅 Reservations</Text>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => setUser?.(null)}>
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderColor: '#eee' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: CREAM, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, color: BROWN },
  nameText: { fontWeight: '700', fontSize: 18 },
  emailText: { color: '#888' },
  rowBtn: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderColor: '#eee' },
  rowText: { fontSize: 16, fontWeight: '600' },
  arrowText: { color: '#999' },
  logoutBtn: { backgroundColor: '#b00', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: '700' },
});