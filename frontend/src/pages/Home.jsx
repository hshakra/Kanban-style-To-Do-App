import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="landing-page">
      {/* Animated background */}
      <div className="bg-gradient"></div>
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Content */}
      <div className={`landing-content ${mounted ? "mounted" : ""}`}>
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="logo-title">TaskFlow</h1>
          <p className="logo-subtitle">Your modern task management solution</p>
        </div>

        <div className="cta-section">
          <button 
            className="cta-button primary"
            onClick={() => navigate("/user-home")}
          >
            <span>Go to Dashboard</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="cta-button secondary"
            onClick={() => navigate("/login")}
          >
            <span>Sign In (Demo)</span>
          </button>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Organize Tasks</h3>
            <p>Keep track of everything in one place</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Set Priorities</h3>
            <p>Focus on what matters most</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Stay Productive</h3>
            <p>Achieve your goals effortlessly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
