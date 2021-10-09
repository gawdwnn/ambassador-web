import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { RedirectToUsers } from "../components/RedirectToUsers";

const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Users = lazy(() => import("../pages/Users"));
const Links = lazy(() => import("../pages/Links"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductForm = lazy(() => import("../pages/Products/ProductForm"));
const Orders = lazy(() => import("../pages/Orders"));


const adminRoutes = [
  {
    exact: true,
    path: "/",
    component: <RedirectToUsers />,
  },
  {
    exact: false,
    path: "/login",
    component: <Login />,
  },
  {
    exact: false,
    path: "/register",
    component: <Register />,
  },
  {
    exact: true,
    path: "/users",
    component: <Users />,
  },
  {
    exact: false,
    path: "/users/:id/links",
    component: <Links />,
  },
  {
    exact: true,
    path: "/products",
    component: <Products />,
  },
  {
    exact: false,
    path: "/products/create",
    component: <ProductForm />,
  },
  {
    exact: false,
    path: "/products/:id/edit",
    component: <ProductForm />,
  },
  {
    exact: true,
    path: "/orders",
    component: <Orders />,
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
