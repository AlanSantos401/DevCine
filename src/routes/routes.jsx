import { Route, Routes } from "react-router-dom";

import DefaultLayout from '../layout/DefaultLayout'
import Home from "../containers/Home"
import Movies from '../containers/Movies'
import Series from  "../containers/Series"

function Router(){
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
               <Route path="/" element={<Home />} />
               <Route path="/fimes" element={<Movies />} />
               <Route path="/series" element={<Series />} />
            </Route>
        </Routes>
    )
}

export default Router;