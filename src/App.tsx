import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoList from "./Components/TodoList";
import TaskCards from "./Components/TaskCards";


function App() {
  return (

      <Router>
          <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/cards" element={<TaskCards />} />
          </Routes>
      </Router>
      )


}

export default App;