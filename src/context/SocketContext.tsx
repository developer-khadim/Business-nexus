// SocketContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { CallState } from '../types/index'

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  callState: CallState | null;
  setCallState: React.Dispatch<React.SetStateAction<CallState | null>>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth(); // Removed unused 'user'
  const [isConnected, setIsConnected] = useState(false);

  // Call state lives here globally
  const [callState, setCallState] = useState<CallState | null>(null);

  useEffect(() => {
    // Socket disabled for offline mode
    setIsConnected(false);
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket: null, isConnected, callState, setCallState }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within SocketProvider");
  return context;
};
