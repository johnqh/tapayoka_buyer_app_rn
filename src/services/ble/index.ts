/**
 * Transport-agnostic BLE exports.
 * Delegates to WsDeviceProtocol in WS mode, DeviceProtocol otherwise.
 */

import { env } from '@/config/env';

export {
  BLE_DEVICE_NAME_PREFIX,
  BLE_SERVICE_UUID,
  BLE_CHAR_DEVICE_INFO_UUID,
  BLE_CHAR_COMMAND_UUID,
  BLE_CHAR_RESPONSE_UUID,
} from './DeviceProtocol';
export type { DeviceChallenge } from './DeviceProtocol';

import * as Ble from './DeviceProtocol';
import * as Ws from './WsDeviceProtocol';

const transport = env.TRANSPORT === 'ws' ? Ws : Ble;

export const findDeviceByAddress = transport.findDeviceByAddress;
export const readDeviceChallenge = transport.readDeviceChallenge;
export const sendAuthorization = transport.sendAuthorization;
export const sendCommand = transport.sendCommand;
