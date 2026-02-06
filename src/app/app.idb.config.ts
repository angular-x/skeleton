import { IndexedDB } from "@typescript-package/indexeddb";

// Prepare config
export const IDB_CONFIG = IndexedDB.config({
  name: 'angular.x',
  stores: {
    'appData': {
      keyPath: 'id',
      autoIncrement: true,
      index: [{ name: "type", keyPath: "type", options: { unique: false } }]
    },
    'sessions': {
      keyPath: 'id',
      autoIncrement: false,
      index: [{ name: "name", keyPath: "name", options: { unique: false } }]
    },
    'transactions': {
      keyPath: 'id',
      autoIncrement: true,
      index: [
        { name: "name", keyPath: "name", options: { unique: false } }
      ]
    },
    'transactions_labels': {
      keyPath: 'id',
      autoIncrement: true,
      index: [
        { name: "transactionId", keyPath: "transactionId", options: { unique: false } },
        { name: "labelId", keyPath: "labelId", options: { unique: false } }
      ]
    },
    'users': {
      keyPath: 'id',
      autoIncrement: true,
      index: [{ name: "email", keyPath: "email", options: { unique: true } }]
    }
  },
  version: 1
});
