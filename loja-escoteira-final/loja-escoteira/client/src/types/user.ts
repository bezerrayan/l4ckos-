/**
 * Tipos para Usuário
 */

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
  createdAt?: Date;
};

export type UserSession = {
  user: User | null;
  isLoading: boolean;
  error?: string;
};
