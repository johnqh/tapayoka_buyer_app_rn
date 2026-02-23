import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ActiveServiceScreen({ route }: { route: any }) {
  const { seconds, serviceName } = route.params;
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev: number) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const progress = 1 - remaining / seconds;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{serviceName}</Text>
      <Text style={styles.status}>{remaining > 0 ? 'Service Active' : 'Complete'}</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>
          {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </Text>
        <Text style={styles.label}>remaining</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  status: { fontSize: 16, color: '#2563eb', marginBottom: 48 },
  timerContainer: { alignItems: 'center', marginBottom: 48 },
  timer: { fontSize: 72, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  label: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  progressBar: { width: '100%', height: 8, backgroundColor: '#e5e7eb', borderRadius: 4 },
  progressFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 4 },
});
