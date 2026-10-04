import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DRINKS, BROWN } from '../Data/menuData';

export default function MenuScreen({ navigation, route }) {
  const { user, favorites = [], toggleFavorite, cartCount = 0 } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.logoGroup}>
            <Image source={require('../assets/logo.png')} style={styles.logoImage} />
            <Text style={styles.shopTitle}>KAPE-KAM CAFE</Text>
          </View>
          <Text style={styles.greeting}>Hi, {user?.name}</Text>
        </View>

        <FlatList
          data={DRINKS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => {
            const isFav = favorites.includes(item.id);
            return (
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.cardImage} />
                  <TouchableOpacity
                    style={styles.favBadge}
                    activeOpacity={0.7}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Text style={styles.favText}>{isFav ? '❤️' : '🤍'}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardPadding}>
                  <Text style={styles.drinkName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>₱{item.prices.Small}</Text>
                    <TouchableOpacity
                      style={styles.addBtn}
                      onPress={() => navigation.navigate('Customize', { drink: item })}
                    >
                      <Text style={styles.addBtnText}>Add to cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navBtn, styles.activeNavBtn]} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.navText}>Favs ({favorites.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.navText}>Cart ({cartCount})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}






const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  logoGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoImage: { width: 32, height: 32, borderRadius: 16 },
  shopTitle: { fontSize: 18, fontWeight: '800', color: BROWN },
  greeting: { color: '#888', fontSize: 12 },
  columnWrapper: { gap: 12 },
  card: { flex: 1, maxWidth: '48%', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee', overflow: 'hidden' },
  imageContainer: { width: '100%', height: 120, position: 'relative' },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  favBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 20, zIndex: 10, elevation: 2 },
  favText: { fontSize: 16 },
  cardPadding: { padding: 8 },
  drinkName: { fontWeight: '600' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  priceText: { color: BROWN, fontWeight: '700' },
  addBtn: { backgroundColor: BROWN, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  bottomNav: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#eee', padding: 8, backgroundColor: '#FAF6F0', gap: 6 },
  navBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, backgroundColor: '#EFE6DD' },
  activeNavBtn: { backgroundColor: BROWN },
  navText: { color: BROWN, fontWeight: '700', fontSize: 11 },
  activeNavText: { color: '#fff', fontWeight: '700', fontSize: 11 },
});