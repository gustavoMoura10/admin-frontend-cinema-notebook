import { useAtom } from "jotai";
import "./App.css";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { userAtom } from "./states";

function App() {
  const [user, setUser] = useAtom(userAtom);
  return (
    <div className="app">
      {user ? <Navbar /> : <></>}
      <div className="d-flex flex-grow-1">
        {user ? <Sidebar /> : <></>}
        <Router />
      </div>
    </div>
  );
}

export default App;
