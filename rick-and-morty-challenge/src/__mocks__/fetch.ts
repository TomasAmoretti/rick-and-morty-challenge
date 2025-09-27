// Definimos un mock de Response tipado con genéricos
export function mockFetchResponse<T>(data: T): Promise<Response> {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => data,
  } as unknown as Response);
}

// Setup global.fetch vacío (se redefine en cada test)
export function setupMockFetch() {
  globalThis.fetch = jest.fn() as unknown as typeof fetch;
}