// @typescript-package
import { IndexedDB } from "@typescript-package/indexeddb";
// Type.
import { Transaction } from "@typedly/transactions";
// Import configuration.
import { IDB_CONFIG } from "./app.idb.config";
// Initialize.
export const indexeddb = new IndexedDB<{
  appData: { id: number; type: string; config: any; userId: number };
  sessions: { id: number; userId: number; token: string; expiresAt: string };

  // Transaction entity.
  transactions: Transaction;
  transactions_labels: { id: number; transactionId: number; labelId: number }

  users: { id: number; email: string; password: string; name: string; createdAt: string };
}>(
  IDB_CONFIG.name,
  IDB_CONFIG.stores!,
  IDB_CONFIG.version
);
