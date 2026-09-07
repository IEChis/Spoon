import { Route, Routes } from 'react-router-dom';
import CameraPage from '@/pages/CameraPage';
import HomePage from '@/pages/HomePage';
import IngredientsPage from '@/pages/IngredientsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import RecognitionPage from '@/pages/RecognitionPage';
import RecipePage from '@/pages/RecipePage';
import RecipeGeneratingPage from '@/pages/RecipeGeneratingPage';
import RecipesPage from '@/pages/RecipesPage';
import CookingPage from '@/pages/CookingPage';

/**
 * 路由表
 *
 * Tab 页（带底部导航）：/ · /ingredients · /recipes · /profile
 * 流程页（沉浸式，无底部导航）：/camera → /recognition → /recipe
 * 菜谱详情：/recipe/:recipeId（从菜谱列表 / 收藏 / 历史进入）
 * AI 生成中：/recipe/generating
 * 烹饪模式（沉浸式，无 TabBar）：/cooking · /cooking/:recipeId
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/recognition" element={<RecognitionPage />} />
      <Route path="/recipe" element={<RecipePage />} />
      <Route path="/recipe/generating" element={<RecipeGeneratingPage />} />
      <Route path="/recipe/:recipeId" element={<RecipePage />} />
      <Route path="/cooking" element={<CookingPage />} />
      <Route path="/cooking/:recipeId" element={<CookingPage />} />
      <Route path="/ingredients" element={<IngredientsPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
