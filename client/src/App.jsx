import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Projects from "./pages/Projects";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";

import DetailProject from "./pages/DetailProject";

import ProjectUser from "./components/user/ProjectUser";
import Register from "./pages/Register";
import ProjectsUser from "./pages/ProjectsUser";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <div className="mt-16 ">
          <Routes>
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<DetailProject />} />
            <Route path="/projectsuser" element={<ProjectsUser />} />
            <Route path="/projectuser/:id" element={<ProjectUser />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
