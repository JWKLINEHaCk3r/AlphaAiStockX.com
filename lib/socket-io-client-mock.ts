// Mock socket.io-client for SSR compatibility
export const io = (url: string, options?: any) => {
  if (typeof window === 'undefined') {
    // Return a mock object for server-side
    return {
      on: () => {},
      emit: () => {},
      disconnect: () => {},
      connect: () => {},
    };
  }
  
  // For client-side, we'll need to install socket.io-client
  throw new Error('socket.io-client not available - install it for client-side usage');
};

export const Socket = class {
  on() {}
  emit() {}
  disconnect() {}
  connect() {}
};
