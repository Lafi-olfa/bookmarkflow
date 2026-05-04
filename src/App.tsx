import "./App.css";
import Bookmarks from "./components/bookmarks";
import Navbar from "./components/navbar";
import Sidebar from "./components/sibebar";

function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <Sidebar />
      <Bookmarks />
    </div>
  );
}

export default App;
