export interface User {
  _id: string;
  username: string;
  email: string;
  // Add more fields as you need, e.g., role
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
