import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('IMS');
  constructor() {
    if (typeof localStorage !== 'undefined') {
      document.documentElement.dataset['theme'] = localStorage.getItem('ims-theme') || 'forest';
    }
  }
}
