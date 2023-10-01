import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import InstructionPage from "./pages/InstructionPage";
import QuizPage from "./pages/QuizPage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      {" "}
      <Router>
        

        <Routes>
          {/* Route for the Instructions Page */}
          <Route path="/" element={<InstructionPage />} />

          {/* Route for the Quiz Page */}
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
