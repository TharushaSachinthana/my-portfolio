import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Certifications } from './components/Certifications';
import { Articles } from './components/Articles';
import { Contact } from './components/Contact';
import { ProjectDetailsPage } from './components/ProjectDetailsPage';
import { AdminProvider } from './components/admin/AdminContext';
import { AdminPanel, AdminButton } from './components/admin/AdminPanel';
import './styles/globals.css';

function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications />
        <Articles />
        <Contact />

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} Tharusha Thilakarathna. Built with React & Tailwind CSS.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              DevOps Engineer | Cloud & Automation Specialist
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
        </Routes>

        {/* Admin Components */}
        <AdminPanel />
        <AdminButton />
      </Router>
    </AdminProvider>
  );
}

export default App;
