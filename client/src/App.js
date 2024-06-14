import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import Signin from "./pages/SignIn"
import Signup from "./pages/SignUp"
import About from "./pages/About"
import Header from "./components/Header"
import axios from "axios"
import PrivateRoute from "./components/PrivateRoute";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

const Profile = lazy(() => import("./pages/Profile.js"));
const CreateListing = lazy(() => import("./pages/CreateListing.js"));
const UpdateListing = lazy(() => import("./pages/UpdateListing.js"));

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signin" element={<Signin />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/listing/:id" element={<Listing />}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Suspense><Profile /></Suspense>}></Route>
                    <Route path="/createlisting" element={<Suspense><CreateListing /></Suspense>}></Route>
                    <Route path="/updatelisting/:id" element={<Suspense><UpdateListing /></Suspense>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
