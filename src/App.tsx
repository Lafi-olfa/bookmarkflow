import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import ForgotPassword from "./components/forgot-password";
import ResetPassword from "./components/reset-passwod";

import AppLayout from "./components/layouts/app-layout";
// import ProtectedRoute from "./components/protected-route";

// function App() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);

//   const handleTagToggle = (tag: string) => {
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
//     );
//   };

//   return (
//     <div className="min-h-screen dark:bg-[#051513]">
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <aside className="hidden min-h-screen w-64 lg:block dark:bg-[#002E2D]">
//           <Sidebar
//             selectedTags={selectedTags}
//             onTagToggle={handleTagToggle}
//             onClose={() => setIsSidebarOpen(false)}
//           />
//         </aside>

//         {/*navbar + content */}
//         <div className="flex min-h-screen flex-1 flex-col">
//           <Navbar
//             onMenuClick={() => setIsSidebarOpen(true)}
//             searchQuery={searchQuery}
//             onSearch={setSearchQuery}
//           />

//           <main className="min-h-screen dark:bg-[#051513]">
//             <Routes>
//               <Route path="/" element={<SignUp />} />
//               <Route path="/sign-in" element={<SignIn />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/reset-password" element={<ResetPassword />} />
//               <Route
//                 path="/bookmarks"
//                 element={
//                   <Bookmarks
//                     searchQuery={searchQuery}
//                     selectedTags={selectedTags}
//                   />
//                 }
//               />
//             </Routes>
//           </main>
//         </div>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 z-50 flex lg:hidden">
//           <aside className="min-h-screen w-64 dark:bg-[#002E2D]">
//             <Sidebar
//               selectedTags={selectedTags}
//               onTagToggle={handleTagToggle}
//               onClose={() => setIsSidebarOpen(false)}
//             />
//           </aside>
//           <div
//             className="flex-1 bg-black/50"
//             onClick={() => setIsSidebarOpen(false)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/bookmarks"
        element={
          isAuthenticated ? <AppLayout /> : <Navigate to="/sign-in" replace />
        }
      />
    </Routes>
  );
}

export default App;
