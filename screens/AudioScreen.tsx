// AudioScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export default function AudioScreen() {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      scanForDevices();
    } else {
      requestPermissions();
    }

    return () => {
      manager.destroy();
    };
  }, []);

  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    if (
      granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      scanForDevices();
    }
  };

  const scanForDevices = () => {
    setDevices([]);
    manager.startDeviceScan(null, null, (error: any, device: { id: any; }) => {
      if (error) {
        console.warn(error);
        return;
      }

      if (device && !devices.find((d) => d.id === device.id)) {
        setDevices((prev) => [...prev, device]);
      }
    });

    // Para parar a busca após 10 segundos
    setTimeout(() => manager.stopDeviceScan(), 10000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos Bluetooth disponíveis:</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.device}>{item.name || 'Sem nome'} - {item.id}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  device: { marginVertical: 4, fontSize: 14 },
});