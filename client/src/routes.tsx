import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";


const HomePage = lazy(() => import("./pages/Home"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />

    }
]);

export default routes;