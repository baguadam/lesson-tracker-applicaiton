import { Outlet } from "react-router";
import "./App.css";

const App = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default App;
