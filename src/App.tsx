import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { HomePage } from './pages/HomePage';
import { Experiment01 } from './pages/Experiment01';
import { Experiment02 } from './pages/Experiment02';
import { Experiment03 } from './pages/Experiment03';
import { Experiment03To04Transition } from './pages/Experiment03To04Transition';
import { Experiment04 } from './pages/Experiment04';
import { FinalVerdictPage } from './pages/FinalVerdictPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiments/dont-click" element={<Experiment01 />} />
          <Route path="/experiments/iq-test" element={<Experiment02 />} />
          <Route path="/experiments/button-game" element={<Experiment03 />} />
          <Route path="/experiments/wheel-of-regret" element={<Experiment03 />} />
          <Route path="/experiments/loading-transition" element={<Experiment03To04Transition />} />
          <Route path="/experiments/fake-loading" element={<Experiment04 />} />
          <Route path="/verdict" element={<FinalVerdictPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
};

export default App;

