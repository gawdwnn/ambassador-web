import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Users = lazy(() => import("../pages/Users"));

const adminRoutes = [
  {
    exact: true,
    path: "/login",
    component: <Login />,
  },
  {
    exact: true,
    path: "/register",
    component: <Register />,
  },
  {
    exact: true,
    path: "/",
    component: <Users />,
  },
];

const Loader = () => <div>Loading</div>;

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={Loader}>
        <Switch>
          {adminRoutes.map((r) => (
            <Route key={r.path} exact={r.exact} path={r.path}>
              <Suspense fallback={Loader}>{r.component}</Suspense>
            </Route>
          ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
