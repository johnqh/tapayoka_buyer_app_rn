import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { sendCommand } from '@/services/ble';

export function PaymentScreen({ route, navigation }: { route: any; navigation: any }) {
  const { serviceName, priceCents, deviceId, seconds } = route.params;
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    try {
      // TODO: Stripe payment → server signs authorization → sendAuthorization()
      // For local dev testing: send ON command directly to activate the relay
      const result = await sendCommand(deviceId, 'ON', { seconds });
      if (result?.status === 'OK') {
        navigation.navigate('ActiveService', { deviceId, seconds, serviceName });
      } else {
        Alert.alert('Activation failed', result?.message ?? 'No response from device.');
      }
    } catch (e) {
      Alert.alert('Error', String(e));
    } finally {
      setPaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.card}>
        <Text style={styles.serviceName}>{serviceName}</Text>
        <Text style={styles.price}>${(priceCents / 100).toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePay} disabled={paying}>
        {paying ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>Pay ${(priceCents / 100).toFixed(2)}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  serviceName: { fontSize: 18, marginBottom: 8 },
  price: { fontSize: 36, fontWeight: 'bold', color: '#2563eb' },
  payButton: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
