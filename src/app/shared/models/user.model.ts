// shared/models/user.model.ts
export interface User {
    id: number;
    name: string;
    email: string;
    preferences?: {
      favoriteCategories?: string[];
      dietaryRestrictions?: string[];
    };
  }