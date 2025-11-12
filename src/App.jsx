import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import AddCreator from './pages/AddCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import './styles/App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ShowCreators />} />
      <Route path="/creator/:id" element={<ViewCreator />} />
      <Route path="/add" element={<AddCreator />} />
      <Route path="/edit/:id" element={<EditCreator />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
