import React, { useState } from "react";
import AppRouter from "./router/AppRouter";
import Signup from "@/components/Signup";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);

  return (
    <>
      <AppRouter
        setShowSignup={setShowSignup}
        setPostLoginRedirect={setPostLoginRedirect}
      />
      {showSignup && (
        <Signup
          closeModal={() => setShowSignup(false)}
          postLoginRedirect={postLoginRedirect}
        />
      )}
    </>
  );
}

export default App;
