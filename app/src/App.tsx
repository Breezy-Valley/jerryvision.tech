import { Route, Routes } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { Notes } from './pages/Notes';
import { Placeholder } from './pages/Placeholder';
import { About } from './pages/About';

export default function App() {
  return <AppShell><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/works" element={<Works />} />
    <Route path="/works/:id" element={<Works />} />
    <Route path="/notes" element={<Notes />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<Placeholder />} />
  </Routes></AppShell>;
}
