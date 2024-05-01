import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserPanel />}></Route>
          <Route path="/admin" element={<AdminPanel />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
