import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const RecipeSchema: Schema = new Schema<IRecipe>({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);