import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function DeviceScreen({ route, navigation }: { route: any; navigation: any }) {
  const { walletAddress } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Found</Text>
      <Text style={styles.address}>{walletAddress}</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Available Services</Text>
        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() =>
            navigation.navigate('Payment', {
              walletAddress,
              serviceId: 'mock-service',
              serviceName: 'Laundry - Standard',
              priceCents: 250,
            })
          }
        >
          <Text style={styles.serviceName}>Laundry - Standard</Text>
          <Text style={styles.servicePrice}>$2.50</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 12, color: '#6b7280', marginBottom: 24, fontFamily: 'monospace' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  serviceItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  serviceName: { fontSize: 16 },
  servicePrice: { fontSize: 16, fontWeight: '600', color: '#2563eb' },
});
