import React from "react";
import {Route} from "react-router-dom"

export const animateSwitch = (CustomSwitch, AnimatorComponent) => ({
    children,
  }) => (
    <Route
      render={({ location }) => (
        <AnimatorComponent uniqKey={location.pathname}>
          <CustomSwitch location={location}>{children}</CustomSwitch>
        </AnimatorComponent>
      )}
    />
  );