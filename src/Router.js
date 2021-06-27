import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import Spinner from './components/spinner/Loading-spinner';
import { Redirect } from 'react-router-dom';

// Route-based code splitting
const home = lazy(() => import('./components/Home'));
const sso = lazy(() => import('./components/SSO'));
const notAuthorized = lazy(() => import('./components/NotAuthorized'));

class AppRouter extends React.Component {
    render() {
        const RouteConfig = ({ component: Component }) => (
            <Route
                render={(props) => {
                    return (
                        <>
                            <Suspense fallback={<Spinner />}>
                                <Component {...props} />
                                {/*
                                 * checking for tokens
                                 */}
                                {!localStorage.getItem('access_token') &&
                                    !localStorage.getItem('refresh_token') && (
                                        <Redirect to="/sso" />
                                    )}
                            </Suspense>
                        </>
                    );
                }}
            />
        );

        return (
            // Set the directory path if you are deploying in sub-folder
            <>
                <Router history={history}>
                    <Switch>
                        <RouteConfig exact path="/" component={home} />

                        <RouteConfig path="/sso" component={sso} />
                        <RouteConfig
                            path="/not-authorized"
                            component={notAuthorized}
                        />
                    </Switch>
                </Router>
            </>
        );
    }
}

export default AppRouter;
