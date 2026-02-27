/**
 * API Context for React Native
 *
 * Provides a fetch-based {@link NetworkClient}, the API base URL, and the
 * current authentication token so that any component in the tree can make
 * authenticated API calls without prop-drilling.
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { NetworkClient, NetworkResponse, NetworkRequestOptions, Optional } from '@sudobility/types';
import { env } from '@/config/env';
import { useAuth } from './AuthContext';

/** Values exposed by the API context to descendant components. */
export interface ApiContextValue {
  /** The fetch-based network client for making HTTP requests. */
  networkClient: NetworkClient;
  /** The base URL for the API (e.g. `http://localhost:8022`). */
  baseUrl: string;
  /** The current Firebase ID token, or `null` if not authenticated. */
  token: string | null;
  /** The current user's UID, or `null` if not authenticated. */
  userId: string | null;
  /** Whether the auth state has been determined (Firebase listener fired). */
  isReady: boolean;
  /** Whether an auth operation is in progress. */
  isLoading: boolean;
}

async function makeRequest<T>(
  url: string,
  options?: Optional<NetworkRequestOptions>
): Promise<NetworkResponse<T>> {
  const method = options?.method ?? 'GET';
  const body = options?.body as BodyInit | undefined;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body,
    signal: options?.signal,
  });

  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  let data: T | undefined;
  let error: string | undefined;

  try {
    const json = await response.json();
    if (response.ok) {
      data = json as T;
    } else {
      error = json.error || json.message || `HTTP ${response.status}`;
    }
  } catch (_e) {
    if (!response.ok) {
      try {
        const text = await response.text();
        error = text || `HTTP ${response.status}: ${response.statusText}`;
      } catch {
        error = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
  }

  return {
    success: response.ok,
    data,
    error,
    timestamp: new Date().toISOString(),
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    headers,
  };
}

const createNetworkClient = (): NetworkClient => ({
  request: <T,>(
    url: string,
    options?: Optional<NetworkRequestOptions>
  ): Promise<NetworkResponse<T>> => makeRequest(url, options),

  get: <T,>(
    url: string,
    options?: Optional<Omit<NetworkRequestOptions, 'method' | 'body'>>
  ): Promise<NetworkResponse<T>> => makeRequest(url, { ...options, method: 'GET' }),

  post: <T,>(
    url: string,
    body?: Optional<unknown>,
    options?: Optional<Omit<NetworkRequestOptions, 'method'>>
  ): Promise<NetworkResponse<T>> =>
    makeRequest(url, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),

  put: <T,>(
    url: string,
    body?: Optional<unknown>,
    options?: Optional<Omit<NetworkRequestOptions, 'method'>>
  ): Promise<NetworkResponse<T>> =>
    makeRequest(url, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),

  delete: <T,>(
    url: string,
    options?: Optional<Omit<NetworkRequestOptions, 'method' | 'body'>>
  ): Promise<NetworkResponse<T>> => makeRequest(url, { ...options, method: 'DELETE' }),
});

const ApiContext = createContext<ApiContextValue | null>(null);

/**
 * Provider that creates a {@link NetworkClient} and exposes it alongside
 * auth-related values (token, userId, readiness) to the component tree.
 *
 * Must be rendered inside an {@link AuthProvider}.
 */
export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { token, user, isReady, isLoading } = useAuth();
  const networkClient = useMemo(() => createNetworkClient(), []);

  const value = useMemo<ApiContextValue>(() => ({
    networkClient,
    baseUrl: env.API_URL,
    token,
    userId: user?.uid ?? null,
    isReady,
    isLoading,
  }), [networkClient, token, user?.uid, isReady, isLoading]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}

/**
 * Consume the {@link ApiContextValue} from the nearest {@link ApiProvider}.
 *
 * @throws {Error} If called outside of an {@link ApiProvider}.
 * @returns The current {@link ApiContextValue}.
 */
export function useApi(): ApiContextValue {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
