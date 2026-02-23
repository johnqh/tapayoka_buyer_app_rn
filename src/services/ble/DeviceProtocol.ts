/**
 * BLE protocol for buyer app <-> device communication.
 * Handles: challenge reading, authorization relay, status checks.
 */

export const BLE_DEVICE_NAME_PREFIX = 'tapayoka-';
export const BLE_SERVICE_UUID = '000088F4-0000-1000-8000-00805f9b34fb';
export const BLE_CHAR_DEVICE_INFO_UUID = '00000E32-0000-1000-8000-00805f9b34fb';
export const BLE_CHAR_COMMAND_UUID = '00000E33-0000-1000-8000-00805f9b34fb';
export const BLE_CHAR_RESPONSE_UUID = '00000E34-0000-1000-8000-00805f9b34fb';

export interface DeviceChallenge {
  walletAddress: string;
  timestamp: number;
  nonce: string;
  signedPayload: string;
  signature: string;
}

export async function findDeviceByAddress(
  _walletAddress: string,
  _timeoutMs: number = 15000,
): Promise<string | null> {
  // TODO: Scan BLE for device with matching name prefix
  return null;
}

export async function readDeviceChallenge(_deviceId: string): Promise<DeviceChallenge | null> {
  // TODO: Read BLE_CHAR_DEVICE_INFO_UUID characteristic
  return null;
}

export async function sendAuthorization(
  _deviceId: string,
  _payload: string,
  _signature: string,
): Promise<boolean> {
  // TODO: Write AUTHORIZE command to BLE_CHAR_COMMAND_UUID
  return false;
}
