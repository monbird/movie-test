import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';

import store from "./store";
import { NavBar, Footer } from './components';
import {
    MoviesList,
    SeriesList,
    MovieCreate,
    SeriesCreate,
    MovieUpdate,
    SeriesUpdate,
} from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './style/theme.scss';
import './style/custom.scss';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div id="content-wrap">
                    <NavBar />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={6000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Switch>
                        <Route path="/" exact component={MoviesList} />
                        <Route path="/movies" exact component={MoviesList} />
                        <Route path="/series" exact component={SeriesList} />
                        <Route
                            path="/movie/create"
                            exact
                            component={MovieCreate}
                        />
                        <Route
                            path="/series/create"
                            exact
                            component={SeriesCreate}
                        />
                        <Route
                            path="/movie/edit/:imdb_id"
                            exact
                            component={MovieUpdate}
                        />
                        <Route
                            path="/series/edit/:imdb_id"
                            exact
                            component={SeriesUpdate}
                        />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </Provider>
    );
}

export default App;
