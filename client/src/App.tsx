import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";
import "./index.scss";
import "./assets/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
