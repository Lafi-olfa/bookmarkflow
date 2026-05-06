import "./App.css";
import Bookmarks from "./components/bookmarks";
import Navbar from "./components/navbar";
import SignIn from "./components/sign-in";
import Sidebar from "./components/sibebar";

function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <SignIn />
      <Sidebar />
      <Bookmarks />
    </div>
  );
}

export default App;
