import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  sku: string;
  category: string;
  unit: string;
  stock: number;
  price: number;
  session: string;
  status: string;
  initials: string;
  color: string;
}

export interface WorkspaceUser {
  name: string;
  email: string;
  role: string;
  status: string;
  initials: string;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  gstNumber?: string;
  notes?: string;
  initials: string;
  orders: number;
  spent: number;
  lastOrder: string;
  segment: string;
  color: string;
}

export interface Order {
  id: string;
  customer: string;
  initials: string;
  items: string;
  date: string;
  amount: number;
  status: string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardData {
  private readonly masterDataKey = 'ims-master-data';

  readonly categories: string[] = ['Pesticide', 'Packing Materials'];

  readonly products: Product[] = [
    { name: 'Pesticide', sku: '', category: 'Pesticide', unit: 'Kg', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'PE', color: 'green' },
    { name: 'Pesticide', sku: '', category: 'Pesticide', unit: 'Ltr', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'PE', color: 'green' },
    { name: 'Pesticide', sku: '', category: 'Pesticide', unit: 'ml', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'PE', color: 'green' },
    { name: 'Big CRET', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'BC', color: 'orange' },
    { name: 'Medium CRET', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'MC', color: 'orange' },
    { name: 'Big Box', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'BB', color: 'blue' },
    { name: 'Medium Box', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'MB', color: 'blue' },
    { name: 'Small Box', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'SB', color: 'blue' },
    { name: 'Plastic Rope', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'PR', color: 'pink' },
    { name: 'Tape', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'TA', color: 'pink' },
    { name: 'Envelope', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'EN', color: 'pink' },
    { name: 'Trade Sticker', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'TS', color: 'pink' },
    { name: 'English Paper', sku: '', category: 'Packing Materials', unit: '', stock: 0, price: 0, session: '', status: 'Out of stock', initials: 'EP', color: 'pink' },
  ];

  readonly orders: Order[] = [
    { id: '#ORD-1086', customer: 'Olivia Rhye', initials: 'OR', items: 'Wireless Headphones, Laptop Stand', date: 'Nov 07, 2026', amount: 144.49, status: 'Processing', color: 'violet' },
    { id: '#ORD-1085', customer: 'Phoenix Baker', initials: 'PB', items: 'Mechanical Keyboard', date: 'Nov 07, 2026', amount: 119.00, status: 'Shipped', color: 'green' },
    { id: '#ORD-1084', customer: 'Lana Steiner', initials: 'LS', items: 'Ergonomic Desk Chair', date: 'Nov 06, 2026', amount: 249.00, status: 'Delivered', color: 'orange' },
    { id: '#ORD-1083', customer: 'Demi Wilkinson', initials: 'DW', items: 'Desk Organizer Set × 2', date: 'Nov 06, 2026', amount: 64.00, status: 'Pending', color: 'pink' },
    { id: '#ORD-1082', customer: 'Candice Wu', initials: 'CW', items: 'Wireless Headphones', date: 'Nov 05, 2026', amount: 89.99, status: 'Cancelled', color: 'blue' },
  ];

  readonly customers: Customer[] = [
    { name: 'Olivia Rhye', email: 'olivia@acme.co', initials: 'OR', orders: 24, spent: 3840.50, lastOrder: 'Nov 07, 2026', segment: 'VIP', color: 'violet' },
    { name: 'Phoenix Baker', email: 'phoenix@acme.co', initials: 'PB', orders: 18, spent: 2160.00, lastOrder: 'Nov 07, 2026', segment: 'Returning', color: 'green' },
    { name: 'Lana Steiner', email: 'lana@acme.co', initials: 'LS', orders: 12, spent: 1748.25, lastOrder: 'Nov 06, 2026', segment: 'Returning', color: 'orange' },
    { name: 'Demi Wilkinson', email: 'demi@acme.co', initials: 'DW', orders: 8, spent: 920.00, lastOrder: 'Nov 06, 2026', segment: 'Regular', color: 'pink' },
    { name: 'Candice Wu', email: 'candice@acme.co', initials: 'CW', orders: 6, spent: 672.45, lastOrder: 'Nov 05, 2026', segment: 'Regular', color: 'blue' },
  ];

  readonly users: WorkspaceUser[] = [
    { name: 'Mohd Danish', email: 'danish@ims.local', role: 'Admin', status: 'Active', initials: 'MD' },
  ];

  constructor() {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = JSON.parse(localStorage.getItem(this.masterDataKey) ?? 'null') as {
        products?: Product[];
        categories?: string[];
        users?: WorkspaceUser[];
      } | null;
      if (saved?.products?.length) {
        this.products.splice(0, this.products.length, ...saved.products.map((product) => ({
          ...product,
          unit: product.unit ?? '',
          session: product.session ?? '',
        })));
      }
      if (saved?.categories?.length) this.categories.splice(0, this.categories.length, ...saved.categories);
      if (saved?.users?.length) this.users.splice(0, this.users.length, ...saved.users);
      for (const product of this.products) {
        if (!this.categories.includes(product.category)) this.categories.push(product.category);
      }
    } catch {
      localStorage.removeItem(this.masterDataKey);
    }
  }

  saveMasterData(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(this.masterDataKey, JSON.stringify({
        products: this.products,
        categories: this.categories,
        users: this.users,
      }));
    } catch {
      // Keep the workspace usable when browser storage is unavailable.
    }
  }
}
