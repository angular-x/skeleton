import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';

// rxjs
import { filter } from 'rxjs';

// PrimeNG
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';

// Socket.io
import './socket.io';

// indexedDB
import { indexeddb } from './app.indexeddb';

// IndexedDB
import { IndexedDBService } from '@angular-package/indexeddb';

// Apollo
import { GraphqlService } from './apollo-client/apollo.service';

// @angular.x.
import { Calculation } from '@angular.x/calculation';
import { Calculations } from '@angular.x/calculations';
import { Chat } from '@angular.x/chat';
import { Layout } from '@angular.x/layout';
import { Menu } from '@angular.x/menu';
import { MenuBar } from '@angular.x/menu-bar';
import { Sidebar } from '@angular.x/sidebar';
import { Toolbar } from '@angular.x/toolbar';

// @angular-package
import {
  LAYOUT_CONFIGURATION,
  CollapsedSide
} from '@angular-package/layout';

@Component({
  selector: 'app-root',
  imports: [
    // Angular.
    RouterOutlet,
    RouterModule,
  
    // PrimeNG.
    ButtonModule,
    SplitterModule,

    // @angular.x
    // Calculation,
    // Calculations,
    // Chat,
    Layout,
    // Menu,
    // MenuBar,
    // Sidebar,
    // Toolbar,

  ],
  providers: [
    {
      provide: LAYOUT_CONFIGURATION, useValue: {
      slot: {
        layout: 'gap-1',
        top: 'top',
        left: 'left',
        bottom: 'bottom',
        right: 'right',
        center: 'flex center gap-3',
      },
    }},
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],

})
export class App {
  title = 'angular.x';
  module = '';
  menuItems = signal<MenuItem[]>([
    {
      label: '',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
        { label: 'Search', icon: 'pi pi-search', routerLink: '/search', command: () => { console.log('Search by Name clicked'); } },
        {
          label: 'Calendar',
          tooltip: 'Calendar',
          icon: 'pi pi-calendar',
          routerLink: '/calendar'
        },

        { separator: true },
        {
            label: 'Inbox',
            routerLink: '/inbox',
            tooltip: 'Inbox',
            icon: 'pi pi-inbox'
        },
        { separator: true },
        {
          label: 'Calculations',
          icon: 'pi pi-calculator',
          routerLink: '/calculations',
          tooltip: 'Calculations',
        },

        {
          label: 'Projects',
          icon: 'pi pi-briefcase',
          routerLink: '/projects',
          tooltip: 'Projects',
        },

        { separator: true },

        {
          label: 'Schedules',
          icon: 'pi pi-calendar',
          routerLink: '/schedules',
          tooltip: 'Schedules',
        },

        { separator: true },

        {
          label: 'Transactions',
          icon: 'pi pi-list',
          routerLink: '/transactions',
          tooltip: 'Transactions',
        },

        {
          label: 'Incomes',
          icon: 'pi pi-chart-line', // or 'pi pi-dollar', or 'pi pi-chart-line'
          routerLink: '/incomes',
          tooltip: 'Incomes'
        },

        {
            label: 'Expenses',
            tooltip: 'Expenses',
            icon: 'pi pi-wallet',
            routerLink: '/expenses',
        },

        {
            label: 'Costs',
            tooltip: 'Costs',
            icon: 'pi pi-money-bill',
            routerLink: '/costs',
        },

        { separator: true },

        {
            label: 'Companies',
            icon: 'pi pi-building',
            routerLink: '/companies',
            tooltip: 'Companies',
            items: [
                { label: 'List', icon: 'pi pi-list', routerLink: '/companies/list' },
                { label: 'Add New', icon: 'pi pi-plus', routerLink: '/companies/new' },
            ]
        },
        {
            label: 'Persons',
            icon: 'pi pi-users',
            routerLink: '/persons',
            tooltip: 'Persons',
            items: [
                { label: 'List', icon: 'pi pi-list', routerLink: '/persons/list' },
                { label: 'Add New', icon: 'pi pi-plus', routerLink: '/persons/new' },
            ]
        },
        { separator: true },

        { label: 'Analytics', icon: 'pi pi-chart-bar', routerLink: '/analytics' },
        {
            label: 'Statistics',
            icon: 'pi pi-chart-bar',
            routerLink: '/statistics',
            tooltip: 'Statistics'
        },
        {
            label: 'Help',
            tooltip: 'Help',
            icon: 'pi pi-question'
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            routerLink: '/settings',
            tooltip: 'Settings'
        },
        // { label: 'CRM', icon: 'pi pi-users', routerLink: '/crm' },
      ]
    },
  ]);

  drawerVisible: boolean = true;
  indexedDBService = inject(IndexedDBService);
  users: any[] = [];

  // Computed signal for the current label (reactive to route changes)
  currentLabel = signal('');

  private router = inject(Router);  // Inject Router

  constructor(private graphqlService: GraphqlService) {}

  onLeftCollapsed(collapsed: any) {
    console.log('App onLeftCollapsed(): ', collapsed);
  }

  ngOnInit() {
    this.indexedDBService.browser(async () => {
      console.log('IndexedDB is ready for browser operations.');
    });
    this.graphqlService.queryUsers().subscribe((result: any) => this.users = result.data.users);

    // Subscribe to router events (filter for NavigationEnd to avoid multiple triggers)
    const subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects || event.url;  // Use the final URL
        this.menuItems().forEach(mainItem => {
          mainItem.items?.forEach(subItem => {
            if (subItem.routerLink === currentUrl) {
              this.currentLabel.set(subItem.label || 'Angular.x');
            }
          });
        });
        console.log('Router changed to:', currentUrl, 'Label updated to:', this.currentLabel());
      });
  }

}
