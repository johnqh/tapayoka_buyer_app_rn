/**
 * WebSocket transport for buyer device communication (local development).
 * Drop-in replacement for DeviceProtocol when EXPO_PUBLIC_TRANSPORT=ws.
 */

import { env } from '@/config/env';
import type { DeviceChallenge } from './DeviceProtocol';

const connections = new Map<string, WebSocket>();

function getOrCreateConnection(url: string): Promise<WebSocket> {
  const existing = connections.get(url);
  if (existing && existing.readyState === WebSocket.OPEN) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      connections.set(url, ws);
      resolve(ws);
    };
    ws.onerror = (e) => reject(e);
  });
}

function sendAndReceive<T>(
  ws: WebSocket,
  message: object,
  expectedType: string,
  timeoutMs: number = 10000,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      ws.removeEventListener('message', handler);
      reject(new Error('WS timeout'));
    }, timeoutMs);
    const handler = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === expectedType) {
          ws.removeEventListener('message', handler);
          clearTimeout(timeout);
          resolve(msg.data as T);
        }
      } catch {
        /* ignore parse errors from other messages */
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify(message));
  });
}

export async function findDeviceByAddress(
  _walletAddress: string,
  _timeoutMs: number = 15000,
): Promise<string | null> {
  const wsUrl = env.WS_DEVICE_URL;
  try {
    const ws = await getOrCreateConnection(wsUrl);
    const info = await sendAndReceive<{ walletAddress: string }>(
      ws,
      { type: 'read_device_info' },
      'device_info',
      _timeoutMs,
    );
    // Loose match: prefix or full address
    const needle = _walletAddress.toLowerCase().replace('0x', '');
    if (info.walletAddress.toLowerCase().includes(needle)) {
      return wsUrl;
    }
    return null;
  } catch {
    return null;
  }
}

export async function readDeviceChallenge(deviceId: string): Promise<DeviceChallenge | null> {
  try {
    const ws = await getOrCreateConnection(deviceId);
    return await sendAndReceive<DeviceChallenge>(
      ws,
      { type: 'read_device_info' },
      'device_info',
    );
  } catch {
    return null;
  }
}

export async function sendAuthorization(
  deviceId: string,
  payload: string,
  signature: string,
): Promise<boolean> {
  try {
    const ws = await getOrCreateConnection(deviceId);
    const result = await sendAndReceive<{ status: string }>(
      ws,
      {
        type: 'command',
        data: { command: 'AUTHORIZE', payload, signature },
      },
      'response',
    );
    return result.status === 'OK';
  } catch {
    return false;
  }
}

export async function sendCommand(
  deviceId: string,
  command: string,
  payload?: Record<string, unknown>,
): Promise<{ status: string; message?: string; data?: string } | null> {
  try {
    const ws = await getOrCreateConnection(deviceId);
    return await sendAndReceive<{ status: string; message?: string; data?: string }>(
      ws,
      {
        type: 'command',
        data: { command, ...payload },
      },
      'response',
    );
  } catch {
    return null;
  }
}
