import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { EnhancedDashboard } from './components/EnhancedDashboard';
import { ComponentsView } from './components/ComponentsView';
import { BiomarkersView } from './components/BiomarkersView';
import { sampleHealthScores } from './data/sampleData';
import type { HealthScore, Component } from './types';

type ViewMode = 'dashboard' | 'components' | 'biomarkers';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedScore, setSelectedScore] = useState<HealthScore | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const handleScoreClick = (score: HealthScore) => {
    setSelectedScore(score);
    setCurrentView('components');
  };

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component);
    setCurrentView('biomarkers');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedScore(null);
    setSelectedComponent(null);
  };

  const handleBackToComponents = () => {
    setCurrentView('components');
    setSelectedComponent(null);
  };

  // Render appropriate view
  if (currentView === 'biomarkers' && selectedScore && selectedComponent) {
    return (
      <BiomarkersView
        score={selectedScore}
        component={selectedComponent}
        onBackToComponents={handleBackToComponents}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'components' && selectedScore) {
    return (
      <ComponentsView
        score={selectedScore}
        onComponentClick={handleComponentClick}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  // Use enhanced dashboard with micro-interactions
  const useEnhanced = true; // Toggle this to switch between dashboards
  
  return useEnhanced ? (
    <EnhancedDashboard 
      scores={sampleHealthScores} 
      onScoreClick={handleScoreClick}
    />
  ) : (
    <Dashboard 
      scores={sampleHealthScores} 
      onScoreClick={handleScoreClick}
    />
  );
}

export default App
