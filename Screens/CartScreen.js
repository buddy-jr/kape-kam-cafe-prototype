import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BROWN } from '../Data/menuData';

export default function CartScreen({ navigation, route }) {
  const { cart = [], updateCartQty, removeFromCart, subtotal = 0 } = route.params || {};

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartId}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.cardRow}>
            <Image source={item.image} style={styles.thumb} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>{item.size} · Sugar {item.sugar}</Text>
              <Text style={styles.itemPrice}>₱{item.price * item.qty}</Text>
            </View>
            <View style={styles.controlsRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateCartQty(item.cartId, -1)}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateCartQty(item.cartId, 1)}>
                <Text>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.cartId)}>
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.rowBetween}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>₱{subtotal}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('Reservation')}>
            <Text style={styles.btnText}>Pre-Order Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  empty: { textAlign: 'center', color: '#888', marginTop: 20 },
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 12, borderRadius: 10, marginBottom: 8 },
  thumb: { width: 44, height: 44, borderRadius: 8, marginRight: 12, resizeMode: 'cover' },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: '600' },
  itemDetails: { color: '#666', fontSize: 12 },
  itemPrice: { color: BROWN, fontWeight: '700', marginTop: 4 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  qtyText: { fontWeight: '700' },
  removeBtn: { marginLeft: 6 },
  removeText: { color: '#b00', fontWeight: '700' },
  footerContainer: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subtotalLabel: { fontSize: 16, color: '#666' },
  subtotalValue: { fontSize: 20, fontWeight: '700' },
  checkoutBtn: { backgroundColor: BROWN, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
});