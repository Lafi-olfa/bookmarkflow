import "./App.css";
// import Bookmarks from "./components/bookmarks";
import Navbar from "./components/navbar";
// import ResetPassword from "./components/reset-passwod";
// import SignIn from "./components/sign-in";
// import Sidebar from "./components/sibebar";
import SignUp from "./components/sign-up";
// import ForgotPassword from "./components/forgot-password";

function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <SignUp />
      {/* <ResetPassword /> */}
      {/* <SignIn />
      <SignUp /> 
      <ForgotPassword />
       <Sidebar />
      <Bookmarks /> */}
    </div>
  );
}

export default App;
