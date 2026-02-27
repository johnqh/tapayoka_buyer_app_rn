import {
  BLE_DEVICE_NAME_PREFIX,
  BLE_SERVICE_UUID,
  BLE_CHAR_DEVICE_INFO_UUID,
  BLE_CHAR_COMMAND_UUID,
  BLE_CHAR_RESPONSE_UUID,
  findDeviceByAddress,
  readDeviceChallenge,
  sendAuthorization,
} from '../src/services/ble/DeviceProtocol';

describe('BLE constants', () => {
  it('exports correct device name prefix', () => {
    expect(BLE_DEVICE_NAME_PREFIX).toBe('tapayoka-');
  });

  it('exports correct service UUID', () => {
    expect(BLE_SERVICE_UUID).toBe('000088F4-0000-1000-8000-00805f9b34fb');
  });

  it('exports correct characteristic UUIDs', () => {
    expect(BLE_CHAR_DEVICE_INFO_UUID).toBe('00000E32-0000-1000-8000-00805f9b34fb');
    expect(BLE_CHAR_COMMAND_UUID).toBe('00000E33-0000-1000-8000-00805f9b34fb');
    expect(BLE_CHAR_RESPONSE_UUID).toBe('00000E34-0000-1000-8000-00805f9b34fb');
  });
});

describe('findDeviceByAddress', () => {
  it('returns null (stub)', async () => {
    const result = await findDeviceByAddress('0xabc');
    expect(result).toBeNull();
  });

  it('accepts custom timeout', async () => {
    const result = await findDeviceByAddress('0xabc', 5000);
    expect(result).toBeNull();
  });
});

describe('readDeviceChallenge', () => {
  it('returns null (stub)', async () => {
    const result = await readDeviceChallenge('device-id');
    expect(result).toBeNull();
  });
});

describe('sendAuthorization', () => {
  it('returns false (stub)', async () => {
    const result = await sendAuthorization('device-id', '{}', '0xsig');
    expect(result).toBe(false);
  });
});
