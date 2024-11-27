import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import ArchivePage from './pages/ArchivePage';
import TagsPage from './pages/TagsPage';
import CategoriesPage from './pages/CategoriesPage';
import LoadingScreen from './components/UI/LoadingScreen';
import useInitialLoad from './hooks/useInitialLoad';

export default function App() {
  const isLoading = useInitialLoad();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}