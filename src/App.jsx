import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/pages/developer/post/Posts";
import { devPath } from "./components/helpers/functions-general";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={`${devPath}/posts`} element={<Posts />} />
      </Routes>
    </Router>
  );
};

export default App;
