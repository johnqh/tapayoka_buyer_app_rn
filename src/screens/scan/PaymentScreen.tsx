import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function PaymentScreen({ route, navigation }: { route: any; navigation: any }) {
  const { serviceName, priceCents, walletAddress } = route.params;

  const handlePay = () => {
    // TODO: Stripe payment sheet, then get signed authorization from server
    navigation.navigate('ActiveService', { walletAddress, seconds: 1800, serviceName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.card}>
        <Text style={styles.serviceName}>{serviceName}</Text>
        <Text style={styles.price}>${(priceCents / 100).toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay ${(priceCents / 100).toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 32 },
  serviceName: { fontSize: 18, marginBottom: 8 },
  price: { fontSize: 36, fontWeight: 'bold', color: '#2563eb' },
  payButton: { backgroundColor: '#2563eb', padding: 18, borderRadius: 12, alignItems: 'center' },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
