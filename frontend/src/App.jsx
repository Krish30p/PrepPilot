// import { HashRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";

// export default function App() {
//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </HashRouter>
//   );
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
