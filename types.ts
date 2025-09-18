
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CLIENT = 'CLIENT',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  password?: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}