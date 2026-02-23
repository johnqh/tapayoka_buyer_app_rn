import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function ScanScreen({ navigation }: { navigation: any }) {
  const handleScan = () => {
    // TODO: Use expo-camera for QR scanning, extract device wallet address
    navigation.navigate('Device', { walletAddress: '0x1234567890abcdef' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.placeholderText}>Camera Preview</Text>
        <Text style={styles.hint}>Point at a QR code on a Tapayoka device</Text>
      </View>
      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Text style={styles.scanButtonText}>Simulate Scan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1f2937' },
  placeholderText: { color: '#9ca3af', fontSize: 20, marginBottom: 8 },
  hint: { color: '#6b7280', fontSize: 14 },
  scanButton: { backgroundColor: '#2563eb', padding: 20, alignItems: 'center' },
  scanButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
