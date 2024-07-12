import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";


const HomePage = lazy(() => import("./pages/Home"));


const AppLayout = lazy(() => import("./layouts/AppLayout"));
const AppIndexPage = lazy(() => import('./pages/app/Index'));
const AppSettingsPage = lazy(() => import('./pages/app/Settings'));

const SignInPage = lazy(() => import('./pages/authentication/SignIn'));
const SignUpPage = lazy(() => import('./pages/authentication/SignUp'));
const ResetPasswordPage = lazy(() => import('./pages/authentication/ResetPassword'));


const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/sign-in",
        element: <SignInPage />
    },
    {
        path: "/sign-up",
        element: <SignUpPage />
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />
    },
    {
        path: "/app",
        element: <AppLayout />,
        children: [
            { path: "", element: <AppIndexPage />, index: true },
            { path: "settings", element: <AppSettingsPage /> }
        ]
    }
]);

export default routes;