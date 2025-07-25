import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {





















    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      tier?: string;
      status?: string;
    




















};
  }

  interface User {





















    id: string;
    email: string;
    name: string;
    tier?: string;
    status?: string;
  




















}
}

declare module 'next-auth/jwt' {
  interface JWT {





















    userId?: string;
    tier?: string;
    status?: string;
  




















}
}
