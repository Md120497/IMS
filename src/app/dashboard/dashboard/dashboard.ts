import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Customer, DashboardData, Order, Product } from './dashboard-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  searchTerm = '';
  globalSearchTerm = '';
  isGlobalSearchOpen = false;
  activeModal: 'product' | 'customer' | 'order' | null = null;
  selectedCategory = 'All categories';
  readonly userName = 'Mohd Danish';

  productForm = { name: '', sku: '', category: 'Electronics', stock: 0, price: 0 };
  customerForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    gstNumber: '',
    notes: '',
  };
  orderForm = { customer: '', product: '', quantity: 1 };

  constructor(private router: Router, private data: DashboardData) {}

  get formattedDate(): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })
      .format(new Date())
      .toUpperCase();
  }

  get greeting(): string {
    const hour = new Date().getHours();
    const salutation = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return `${salutation}, ${this.userName}`;
  }

  get page(): string {
    const segment = this.router.url.split('?')[0].split('/')[1];
    return ['inventory', 'orders', 'customers', 'reports', 'settings', 'themes', 'profile'].includes(segment) ? segment : 'dashboard';
  }

  get createType(): 'product' | 'customer' | 'order' | null {
    const path = this.router.url.split('?')[0];
    if (path === '/inventory/new') return 'product';
    if (path === '/customers/new') return 'customer';
    if (path === '/orders/new') return 'order';
    return null;
  }

  get primaryActionLabel(): string {
    return this.page === 'orders' ? 'Create order' : this.page === 'customers' ? 'Add customer' : this.page === 'reports' ? 'Export report' : 'Add product';
  }

  get primaryActionRoute(): string | null {
    if (this.page === 'orders') return '/orders/new';
    if (this.page === 'customers') return '/customers/new';
    if (this.page === 'reports') return null;
    return '/inventory/new';
  }

  get primaryActionType(): 'product' | 'customer' | 'order' | null {
    if (this.page === 'orders') return 'order';
    if (this.page === 'customers') return 'customer';
    if (this.page === 'reports') return null;
    return 'product';
  }

  get modalType(): 'product' | 'customer' | 'order' | null {
    return this.activeModal ?? this.createType;
  }

  openCreateModal(type: 'product' | 'customer' | 'order' | null): void {
    if (type) this.activeModal = type;
  }

  closeCreateModal(): void {
    this.activeModal = null;
    if (this.createType) {
      const returnRoute = this.createType === 'product' ? '/inventory' : this.createType === 'customer' ? '/customers' : '/orders';
      this.router.navigate([returnRoute]);
    }
  }

  get selectedOrderProduct() {
    return this.products.find((product) => product.name === this.orderForm.product);
  }

  get pageTitle(): string {
    if (this.createType === 'product') return 'Add product';
    if (this.createType === 'customer') return 'Create customer';
    if (this.createType === 'order') return 'Create order';
    return ({ dashboard: 'Overview', inventory: 'Inventory', orders: 'Orders', customers: 'Customers', reports: 'Reports', settings: 'Settings', themes: 'Themes', profile: 'My profile' } as Record<string, string>)[this.page];
  }

  get pageDescription(): string {
    if (this.createType === 'product') return 'Add a product to your inventory catalog.';
    if (this.createType === 'customer') return 'Add a customer to your directory.';
    if (this.createType === 'order') return 'Create an order for one of your customers.';
    return ({
      dashboard: 'Here’s what’s happening with your inventory today.',
      inventory: 'Manage products, stock levels, and product details.',
      orders: 'Track and manage customer orders from one place.',
      customers: 'Get to know the people behind your business.',
      reports: 'Understand your business performance at a glance.',
      settings: 'Personalize your workspace and manage preferences.',
      themes: 'Choose a color theme for every page in IMS.',
      profile: 'Manage your account details and sign-in preferences.',
    } as Record<string, string>)[this.page];
  }

  readonly categories = ['All categories', 'Electronics', 'Furniture', 'Accessories'];
  readonly themes = [
    { id: 'forest', name: 'Forest', description: 'Calm greens and warm neutrals', tone: 'Light' },
    { id: 'ocean', name: 'Ocean', description: 'Clear blues with a cool finish', tone: 'Light' },
    { id: 'violet', name: 'Violet', description: 'Soft purples with a creative feel', tone: 'Light' },
    { id: 'dark', name: 'Midnight', description: 'A focused, low light workspace', tone: 'Dark' },
  ];
  selectedTheme = typeof localStorage === 'undefined' ? 'forest' : localStorage.getItem('ims-theme') || 'forest';

  setTheme(theme: string): void {
    this.selectedTheme = theme;
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem('ims-theme', theme);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  get products(): Product[] {
    return this.data.products;
  }

  get orders(): Order[] {
    return this.data.orders;
  }

  get customers(): Customer[] {
    return this.data.customers;
  }

  readonly orderMetrics = [
    { label: 'Total orders', value: '1,284', change: '+12.4%', color: 'purple' },
    { label: 'Awaiting fulfillment', value: '24', change: 'Needs attention', color: 'amber' },
    { label: 'Shipped this month', value: '386', change: '+8.1%', color: 'green' },
    { label: 'Revenue this month', value: '$42,890', change: '+16.2%', color: 'rose' },
  ];

  readonly customerMetrics = [
    { label: 'Total customers', value: '2,840', change: '+10.2%', color: 'purple' },
    { label: 'New this month', value: '186', change: '+18.6%', color: 'green' },
    { label: 'Returning customers', value: '68.4%', change: '+4.3%', color: 'amber' },
    { label: 'Average order value', value: '$86.40', change: '+6.8%', color: 'rose' },
  ];

  readonly reportMonths = [
    { month: 'May', revenue: 52, orders: 45 },
    { month: 'Jun', revenue: 66, orders: 57 },
    { month: 'Jul', revenue: 58, orders: 50 },
    { month: 'Aug', revenue: 77, orders: 62 },
    { month: 'Sep', revenue: 69, orders: 58 },
    { month: 'Oct', revenue: 88, orders: 73 },
    { month: 'Nov', revenue: 96, orders: 81 },
  ];

  get filteredProducts() {
    const query = this.searchTerm.trim().toLowerCase();
    return this.products.filter((product) => {
      const matchesQuery = !query || Object.values(product).join(' ').toLowerCase().includes(query);
      const matchesCategory = this.selectedCategory === 'All categories' || product.category === this.selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }

  get globalSearchResults(): Array<{ type: string; title: string; detail: string; route: string; query?: string }> {
    const query = this.globalSearchTerm.trim().toLowerCase();
    if (!query) return [];

    const pages = [
      { title: 'Overview', route: '/dashboard', keywords: 'dashboard overview home' },
      { title: 'Inventory', route: '/inventory', keywords: 'inventory products stock catalog sku' },
      { title: 'Orders', route: '/orders', keywords: 'orders sales fulfillment' },
      { title: 'Customers', route: '/customers', keywords: 'customers clients directory' },
      { title: 'Reports', route: '/reports', keywords: 'reports revenue analytics performance' },
      { title: 'Themes', route: '/themes', keywords: 'themes appearance colors preferences' },
      { title: 'My profile', route: '/profile', keywords: 'profile account user' },
    ].filter((page) => `${page.title} ${page.keywords}`.toLowerCase().includes(query))
      .map((page) => ({ type: 'Page', title: page.title, detail: 'Open page', route: page.route }));

    const products = this.products.filter((product) =>
      Object.values(product).join(' ').toLowerCase().includes(query),
    ).map((product) => ({ type: 'Product', title: product.name, detail: `${product.sku} · ${product.category} · ${product.status}`, route: '/inventory', query: product.name }));

    const orders = this.orders.filter((order) =>
      Object.values(order).join(' ').toLowerCase().includes(query),
    ).map((order) => ({ type: 'Order', title: order.id, detail: `${order.customer} · ${order.status} · ${order.items}`, route: '/orders', query: order.id }));

    const customers = this.customers.filter((customer) =>
      Object.values(customer).join(' ').toLowerCase().includes(query),
    ).map((customer) => ({ type: 'Customer', title: customer.name, detail: `${customer.email} · ${customer.segment}`, route: '/customers', query: customer.name }));

    return [...pages, ...products, ...orders, ...customers].slice(0, 8);
  }

  openSearchResult(result: { route: string; query?: string }): void {
    this.globalSearchTerm = '';
    this.isGlobalSearchOpen = false;
    this.searchTerm = result.query ?? '';
    this.router.navigate([result.route]);
  }

  onGlobalSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.isGlobalSearchOpen = false;
    if (event.key === 'Enter' && this.globalSearchResults.length) {
      event.preventDefault();
      this.openSearchResult(this.globalSearchResults[0]);
    }
  }

  @HostListener('window:keydown', ['$event'])
  focusGlobalSearch(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.modalType) {
      this.closeCreateModal();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      document.getElementById('project-search')?.focus();
    }
  }

  get filteredOrders(): Order[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.orders.filter((order) => !query || Object.values(order).join(' ').toLowerCase().includes(query));
  }

  get filteredCustomers(): Customer[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.customers.filter((customer) => !query || Object.values(customer).join(' ').toLowerCase().includes(query));
  }

  saveProduct(): void {
    const name = this.productForm.name.trim();
    const sku = this.productForm.sku.trim();
    if (!name || !sku || !Number.isInteger(this.productForm.stock) || this.productForm.stock < 0 || !Number.isFinite(this.productForm.price) || this.productForm.price <= 0) return;

    this.products.unshift({
      name,
      sku,
      category: this.productForm.category,
      stock: this.productForm.stock,
      price: this.productForm.price,
      status: this.productForm.stock === 0 ? 'Out of stock' : this.productForm.stock < 10 ? 'Low stock' : 'In stock',
      initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(),
      color: 'violet',
    });
    this.activeModal = null;
    this.router.navigate(['/inventory']);
  }

  saveCustomer(): void {
    const name = this.customerForm.name.trim();
    const email = this.customerForm.email.trim();
    if (!name || !email) return;

    this.customers.unshift({
      name,
      email,
      phone: this.customerForm.phone.trim(),
      company: this.customerForm.company.trim(),
      address: this.customerForm.address.trim(),
      city: this.customerForm.city.trim(),
      state: this.customerForm.state.trim(),
      postalCode: this.customerForm.postalCode.trim(),
      country: this.customerForm.country.trim(),
      gstNumber: this.customerForm.gstNumber.trim().toUpperCase(),
      notes: this.customerForm.notes.trim(),
      initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(),
      orders: 0,
      spent: 0,
      lastOrder: '—',
      segment: 'Regular',
      color: 'blue',
    });
    this.activeModal = null;
    this.router.navigate(['/customers']);
  }

  saveOrder(): void {
    const customer = this.customers.find((entry) => entry.name === this.orderForm.customer);
    const product = this.products.find((entry) => entry.name === this.orderForm.product);
    const quantity = this.orderForm.quantity;
    if (!customer || !product || !Number.isInteger(quantity) || quantity < 1 || product.stock < quantity) return;

    const nextOrderId = Math.max(...this.orders.map((order) => Number(order.id.replace('#ORD-', '')))) + 1;
    this.orders.unshift({
      id: `#ORD-${nextOrderId}`,
      customer: customer.name,
      initials: customer.initials,
      items: quantity === 1 ? product.name : `${product.name} × ${quantity}`,
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date()),
      amount: product.price * quantity,
      status: 'Pending',
      color: product.color,
    });
    product.stock -= quantity;
    product.status = product.stock === 0 ? 'Out of stock' : product.stock < 10 ? 'Low stock' : 'In stock';
    customer.orders += 1;
    customer.spent += product.price * quantity;
    customer.lastOrder = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date());
    this.activeModal = null;
    this.router.navigate(['/orders']);
  }

}
