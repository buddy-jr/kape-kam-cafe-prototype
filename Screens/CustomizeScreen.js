import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SIZES, SUGAR_LEVELS, BROWN } from '../Data/menuData';

export default function CustomizeScreen({ navigation, route }) {
  const { drink, addToCart } = route.params;
  const [size, setSize] = useState('Small');
  const [sugar, setSugar] = useState('50%');
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addToCart({ cartId: Date.now().toString(), id: drink.id, name: drink.name, image: drink.image, size, sugar, qty, price: drink.prices[size] });
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={drink.image} style={styles.largeImage} />
      <Text style={styles.title}>{drink.name}</Text>
      <Text style={styles.price}>₱{drink.prices[size]}</Text>

      <Text style={styles.label}>Size</Text>
      <View style={styles.rowGap}>
        {SIZES.map((s) => (
          <TouchableOpacity key={s} style={[styles.optionBtn, size === s && styles.activeBtn]} onPress={() => setSize(s)}>
            <Text style={size === s ? styles.activeOptionText : styles.optionText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Sugar Level</Text>
      <View style={styles.rowGap}>
        {SUGAR_LEVELS.map((l) => (
          <TouchableOpacity key={l} style={[styles.optionBtn, sugar === l && styles.activeBtn]} onPress={() => setSugar(l)}>
            <Text style={sugar === l ? styles.activeOptionText : styles.optionText}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Quantity</Text>
      <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}><Text style={styles.qtyText}>-</Text></TouchableOpacity>
        <Text style={styles.qtyNumber}>{qty}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}><Text style={styles.qtyText}>+</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addToCartBtn} onPress={handleAdd}>
        <Text style={styles.btnText}>Add to Cart — ₱{drink.prices[size] * qty}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  largeImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12, resizeMode: 'cover' },
  title: { fontSize: 22, fontWeight: '700' },
  price: { fontSize: 18, color: BROWN, fontWeight: '700', marginBottom: 16 },
  label: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
  rowGap: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  optionBtn: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, alignItems: 'center' },
  activeBtn: { backgroundColor: BROWN, borderColor: BROWN },
  optionText: { color: '#333' },
  activeOptionText: { color: '#fff' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6 },
  qtyText: { fontSize: 16, fontWeight: '600' },
  qtyNumber: { fontSize: 18, fontWeight: '700' },
  addToCartBtn: { backgroundColor: BROWN, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: '700' },
});