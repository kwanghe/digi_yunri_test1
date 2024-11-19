import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SafetyTest from './pages/SafetyTest';
import Questions from './pages/SafetyTest/Questions';
import Simulation from './pages/Simulation';
import Case1 from './pages/simulation/Case1';
import Case2 from './pages/simulation/Case2';
import Case3 from './pages/simulation/Case3';
import Workshop from './pages/Workshop';
import Create from './pages/workshop/Create';
import Certificate from './pages/Certificate';
import { ProgressProvider } from './context/ProgressContext';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import Home4 from './pages/Home4';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/safety-test" element={<SafetyTest />} />
            <Route path="/safety-test/questions" element={<Questions />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/simulation/case1" element={<Case1 />} />
            <Route path="/simulation/case2" element={<Case2 />} />
            <Route path="/simulation/case3" element={<Case3 />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/workshop/create" element={<Create />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/home3" element={<Home3 />} />
            <Route path="/home4" element={<Home4 />} />
          </Routes>
        </Layout>
      </Router>
    </ProgressProvider>
  );
}

export default App;