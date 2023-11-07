import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; 
import { StoriesPage } from './components/stories-page/stories-page';
import { StoryInsides } from './components/story-insides/story-insides';
import { StoryList } from './components/story-list/story-list';
import { RootStore } from './store/root-store/root-store';
import { RootStoreContext } from './store/root-store/root-store-context';

function App() {

  return (
  <RootStoreContext.Provider value={new RootStore()}>
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/new" />} />
        <Route  index path="new" element={<StoriesPage />}/>
        <Route path="story/:id" element={<StoryInsides />}/>
      </Route>
    </Routes>
  </RootStoreContext.Provider >
  );
}

export default App;
