# tapayoka_buyer_app_rn

Buyer native app for iOS/Android. QR scanning, BLE device communication, Stripe payment, authorization relay.

## Stack: Expo + React Native + TypeScript

## Commands

```bash
npm install
npm start             # Metro bundler (port 8086)
npm run android
npm run ios
npm run typecheck
npm run lint
npm test
```

## Core Flow

1. Scan QR code (expo-camera) -> extract device wallet address
2. Find device via BLE (react-native-ble-plx) -> read signed challenge
3. Verify with server -> display available services
4. Pay via Stripe (@stripe/stripe-react-native)
5. Get signed authorization from server
6. Relay authorization to device via BLE
7. Show countdown timer
