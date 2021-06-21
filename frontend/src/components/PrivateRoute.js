import React from 'react';
import { Redirect, Route } from 'react-router-dom';




export default function PrivateRoute({ user, children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (user) {
            return children;
          }
  
          if (!user) {
            return (
              <Redirect
                to={{
                  pathname: 'login',
                  state: { from: location },
                }}
              />
            );
          }
  
          return null;
        }}
      />
    );
  }
  