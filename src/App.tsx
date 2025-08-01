import {Routes, Route, HashRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameListPage from './pages/GameListPage';
import GamePlayPage from './pages/GamePlayPage';
import SubmitPage from "./pages/SubmitPage.tsx";
import {StatisticsPage} from "./pages/StatisticsPage.tsx";

const App = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/list" element={<GameListPage />} />
            <Route path="/game/:gameId" element={<GamePlayPage />} />
            <Route path={"/submit"} element={<SubmitPage/>}/>
            <Route path={"/stats"} element={<StatisticsPage/>}/>
        </Routes>
    </HashRouter>
);

export default App;
