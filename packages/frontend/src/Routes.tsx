import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";

export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}