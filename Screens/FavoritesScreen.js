import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DRINKS, BROWN } from '../Data/menuData';

export default function FavoritesScreen({ navigation, route }) {
  const { favorites = [], toggleFavorite } = route.params || {};
  const favDrinks = DRINKS.filter((d) => favorites.includes(d.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={favDrinks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No favorites added yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.cardRow}>
            <TouchableOpacity style={styles.drinkInfo} onPress={() => navigation.navigate('Customize', { drink: item })}>
              <Image source={item.image} style={styles.thumb} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₱{item.prices.Small}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.removeBtn} onPress={() => toggleFavorite(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  empty: { textAlign: 'center', color: '#888', marginTop: 20 },
  cardRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 12, borderRadius: 10, marginBottom: 8, justifyContent: 'space-between' },
  drinkInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  thumb: { width: 44, height: 44, borderRadius: 8, marginRight: 12, resizeMode: 'cover' },
  textContainer: { flex: 1 },
  name: { fontWeight: '600' },
  price: { color: BROWN, fontWeight: '500' },
  removeBtn: { paddingVertical: 6, paddingHorizontal: 10 },
  removeText: { color: '#b00', fontWeight: '600' },
});