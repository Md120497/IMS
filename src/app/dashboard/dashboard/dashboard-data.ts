import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: string;
  initials: string;
  color: string;
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
  readonly products: Product[] = [
    { name: 'Wireless Headphones', sku: 'WH-2048', category: 'Electronics', stock: 128, price: 89.99, status: 'In stock', initials: 'WH', color: 'violet' },
    { name: 'Ergonomic Desk Chair', sku: 'CH-1082', category: 'Furniture', stock: 8, price: 249.00, status: 'Low stock', initials: 'DC', color: 'orange' },
    { name: 'Laptop Stand', sku: 'LS-3301', category: 'Accessories', stock: 0, price: 54.50, status: 'Out of stock', initials: 'LS', color: 'blue' },
    { name: 'Mechanical Keyboard', sku: 'MK-7712', category: 'Electronics', stock: 64, price: 119.00, status: 'In stock', initials: 'MK', color: 'green' },
    { name: 'Desk Organizer Set', sku: 'DO-0914', category: 'Accessories', stock: 12, price: 32.00, status: 'Low stock', initials: 'DO', color: 'pink' },
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
}
