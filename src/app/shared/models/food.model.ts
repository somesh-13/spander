// shared/models/food.model.ts
export interface Food {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  calories?: number;  // Add calories property
  nutritionInfo?: {
    protein?: number;
    carbs?: number; 
    fat?: number;
  };
}