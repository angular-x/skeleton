import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@angular.x/dashboard').then(m => m.Dashboard) },

  { path: 'calculations', loadComponent: () => import('@angular.x/calculations').then(m => m.Calculations) },

  { path: 'transactions', loadComponent: () => import('@angular.x/transactions').then(m => m.Transactions) },
  { path: 'costs', loadComponent: () => import('@angular.x/costs').then(m => m.Costs) },
  { path: 'expenses', loadComponent: () => import('@angular.x/expenses').then(m => m.Expenses) },

  { path: 'incomes', loadComponent: () => import('@angular.x/incomes').then(m => m.Incomes) },

];
