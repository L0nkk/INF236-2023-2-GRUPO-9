import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./pages/Form";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home</h1>,
  },
  {
    path: '/Form',
    element: <Form />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
])

export default function App() {
  return (
    <RouterProvider router={router}/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);