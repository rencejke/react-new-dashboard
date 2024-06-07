import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/pages/developer/dashboard/post/Posts";
import { devPath } from "./components/helpers/functions-general";
import { StoreProvider } from "./components/store/StoreContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient

  return (
    <QueryClientProvider client={queryClient}>
   <StoreProvider>
     <Router>
      <Routes>
        <Route path={`${devPath}/posts`} element={<Posts />} />
      </Routes>
    </Router>
   </StoreProvider>
   </QueryClientProvider>
  );
};

export default App;
