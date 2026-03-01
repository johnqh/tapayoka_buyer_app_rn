import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { findDeviceByAddress } from '@/services/ble';

export function ScanScreen({ navigation }: { navigation: any }) {
  const [searching, setSearching] = useState(false);

  const handleScan = async () => {
    setSearching(true);
    try {
      // In production: QR code scan extracts wallet address
      // For dev: find whatever device is available (empty string matches any)
      const deviceId = await findDeviceByAddress('');
      if (deviceId) {
        navigation.navigate('Device', { deviceId });
      } else {
        Alert.alert('No device found', 'Make sure tapayoka_pi is running.');
      }
    } catch (e) {
      Alert.alert('Scan failed', String(e));
    } finally {
      setSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.placeholderText}>Camera Preview</Text>
        <Text style={styles.hint}>Point at a QR code on a Tapayoka device</Text>
      </View>
      <TouchableOpacity style={styles.scanButton} onPress={handleScan} disabled={searching}>
        {searching ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.scanButtonText}>Simulate Scan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  placeholderText: { color: '#9ca3af', fontSize: 20, marginBottom: 8 },
  hint: { color: '#6b7280', fontSize: 14 },
  scanButton: { backgroundColor: '#2563eb', padding: 20, alignItems: 'center' },
  scanButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
