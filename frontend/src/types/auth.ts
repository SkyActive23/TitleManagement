// types/auth.ts
export interface AuthResponse {
    token: string;
  }
  
  export interface User {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  