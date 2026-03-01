import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { readDeviceChallenge, type DeviceChallenge } from '@/services/ble';

export function DeviceScreen({ route, navigation }: { route: any; navigation: any }) {
  const { deviceId } = route.params;
  const [challenge, setChallenge] = useState<DeviceChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readDeviceChallenge(deviceId).then((c) => {
      setChallenge(c);
      setLoading(false);
    });
  }, [deviceId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Reading device...</Text>
      </View>
    );
  }

  const walletAddress = challenge?.walletAddress ?? 'Unknown';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Found</Text>
      <Text style={styles.address}>{walletAddress}</Text>

      {challenge && (
        <View style={styles.challengeCard}>
          <Text style={styles.challengeLabel}>Nonce: {challenge.nonce}</Text>
          <Text style={styles.challengeLabel}>
            Timestamp: {new Date(challenge.timestamp * 1000).toLocaleTimeString()}
          </Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Available Services</Text>
        <TouchableOpacity
          style={styles.serviceItem}
          onPress={() =>
            navigation.navigate('Payment', {
              deviceId,
              serviceName: 'Laundry - Standard',
              priceCents: 250,
              seconds: 1800,
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
  center: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  address: { fontSize: 12, color: '#6b7280', marginBottom: 16, fontFamily: 'monospace' },
  loadingText: { marginTop: 12, color: '#6b7280' },
  challengeCard: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  challengeLabel: { fontSize: 12, color: '#374151', fontFamily: 'monospace', marginBottom: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  serviceName: { fontSize: 16 },
  servicePrice: { fontSize: 16, fontWeight: '600', color: '#2563eb' },
});
