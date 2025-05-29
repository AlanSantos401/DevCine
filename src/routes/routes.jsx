import { Route, Routes } from "react-router-dom";

import Animes from "../containers/Animes";
import Detail from "../containers/Detail";
import Home from "../containers/Home";
import Movies from "../containers/Movies";
import Series from "../containers/Series";
import DefaultLayout from "../layout/DefaultLayout";
import DetailSeries from "../containers/DetailSeries";
import DetailAnimes from "../containers/DetailAnimes";

function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/filmes" element={<Movies />} />
        <Route path="/detalhe/movie/:id" element={<Detail />} />
        <Route path="/series" element={<Series />} />
        <Route path="/detalhe/serie/:id" element={<DetailSeries />} />
        <Route path="/animes" element={<Animes />} />
        <Route path="/detalhe/anime/:id" element={<DetailAnimes />} />
      </Route>
    </Routes>
  );
}


export default Router;
