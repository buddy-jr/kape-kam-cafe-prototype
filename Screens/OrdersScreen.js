import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { BROWN, CREAM } from '../Data/menuData';

export default function OrdersScreen({ route }) {
  const { orders = [], cancelReservation } = route.params || {};

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        ListEmptyComponent={<Text style={styles.empty}>No reservations placed yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.row}>
              <Text style={styles.codeText}>{item.pickupCode}</Text>
              <Text style={item.status === 'Cancelled' ? styles.cancelledStatus : styles.statusText}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.itemsText}>
              {item.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
            </Text>
            <View style={styles.bottomRow}>
              <Text style={styles.totalText}>₱{item.total}</Text>
              {item.status === 'Reserved' && (
                <TouchableOpacity onPress={() => cancelReservation?.(item.orderId)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  empty: { textAlign: 'center', color: '#888', marginTop: 20 },
  orderCard: { backgroundColor: CREAM, padding: 12, borderRadius: 10, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  codeText: { fontWeight: '800', color: BROWN },
  statusText: { fontWeight: '700', color: BROWN },
  cancelledStatus: { fontWeight: '700', color: '#b00' },
  itemsText: { fontWeight: '600', marginTop: 6 },
  totalText: { fontWeight: '700', color: BROWN },
  cancelBtnText: { color: '#b00', fontWeight: '600' },
});