// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Auth {
  
// }
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(credentials: { email: string; password: string }): boolean {
    return credentials.email === 'demo@ims.com' && credentials.password === 'password123';
  }

  register(userData: any) {
    console.log('API Call: Registering...', userData);
    // return this.http.post('/api/register', userData);
  }
}