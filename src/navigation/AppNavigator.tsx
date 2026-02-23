import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScanScreen } from '../screens/scan/ScanScreen';
import { DeviceScreen } from '../screens/scan/DeviceScreen';
import { PaymentScreen } from '../screens/scan/PaymentScreen';
import { ActiveServiceScreen } from '../screens/scan/ActiveServiceScreen';
import { OrderHistoryScreen } from '../screens/history/OrderHistoryScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();
const ScanStack = createNativeStackNavigator();

function ScanStackNavigator() {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan QR' }} />
      <ScanStack.Screen name="Device" component={DeviceScreen} />
      <ScanStack.Screen name="Payment" component={PaymentScreen} />
      <ScanStack.Screen
        name="ActiveService"
        component={ActiveServiceScreen}
        options={{ title: 'Active', headerBackVisible: false }}
      />
    </ScanStack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ScanTab" component={ScanStackNavigator} options={{ headerShown: false, title: 'Scan' }} />
      <Tab.Screen name="History" component={OrderHistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
