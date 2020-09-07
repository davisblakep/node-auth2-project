import React from 'react';
// import HomeIntroCard from "../HomeIntroCard";
import LoginForm from '../forms/LoginForm';
import { Spring } from 'react-spring/renderprops';

const HomePage = () => {
  return (
    <Spring
      config={{ delay: 125, duration: 750 }}
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {(props) => (
        <div style={props}>
          <div className="homePage">
            <Spring
              config={{ delay: 1200, duration: 925 }}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
            >
              {(props) => (
                <div style={props}>
                  <LoginForm />
                </div>
              )}
            </Spring>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default HomePage;
