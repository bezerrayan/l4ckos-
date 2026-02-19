/**
 * Componente para sincronizar dados entre localStorage e servidor
 * Deve ser renderizado dentro dos Providers TRPC e Context
 */

import { useSyncData } from "../hooks/useSyncData";

export function DataSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncData();

  return <>{children}</>;
}
