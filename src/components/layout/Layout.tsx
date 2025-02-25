import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
export default Layout