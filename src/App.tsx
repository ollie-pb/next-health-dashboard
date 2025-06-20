import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { EnhancedDashboard } from './components/EnhancedDashboard';
import { ComponentsView } from './components/ComponentsView';
import { EnhancedComponentsView } from './components/EnhancedComponentsView';
import { BiomarkersView } from './components/BiomarkersView';
import { EnhancedBiomarkersView } from './components/EnhancedBiomarkersView';
import { ErrorBoundary } from './components/ErrorBoundary';
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

  // Use enhanced design system for all views
  const useEnhanced = true; // Toggle this to switch between old and new design systems

  // Render appropriate view
  if (currentView === 'biomarkers' && selectedScore && selectedComponent) {
    return (
      <ErrorBoundary>
        {useEnhanced ? (
          <EnhancedBiomarkersView
            score={selectedScore}
            component={selectedComponent}
            onBackToComponents={handleBackToComponents}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : (
          <BiomarkersView
            score={selectedScore}
            component={selectedComponent}
            onBackToComponents={handleBackToComponents}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </ErrorBoundary>
    );
  }

  if (currentView === 'components' && selectedScore) {
    return (
      <ErrorBoundary>
        {useEnhanced ? (
          <EnhancedComponentsView
            score={selectedScore}
            onComponentClick={handleComponentClick}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : (
          <ComponentsView
            score={selectedScore}
            onComponentClick={handleComponentClick}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </ErrorBoundary>
    );
  }
  
  return (
    <ErrorBoundary>
      {useEnhanced ? (
        <EnhancedDashboard 
          scores={sampleHealthScores} 
          onScoreClick={handleScoreClick}
          onComponentClick={handleComponentClick}
        />
      ) : (
        <Dashboard 
          scores={sampleHealthScores} 
          onScoreClick={handleScoreClick}
        />
      )}
    </ErrorBoundary>
  );
}

export default App
