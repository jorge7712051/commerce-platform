export interface User {
  userId: number;
  rol: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}
