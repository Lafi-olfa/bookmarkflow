import "./App.css";
import Bookmarks from "./components/bookmarks";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <Bookmarks />
    </div>
  );
}

export default App;
