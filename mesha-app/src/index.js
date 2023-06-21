import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import HomePage from './screens/HomePage'


export default function App() {

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        
      </Routes>
    </HashRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);