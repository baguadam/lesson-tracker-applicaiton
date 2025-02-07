import { Outlet } from "react-router";
import "../styles/App.css";

const App = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default App;
