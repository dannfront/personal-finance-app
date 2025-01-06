import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/layout/Layout";
import Overview from "../features/overview/Overview";
import Budgets from "../features/budgtes/Budgets";
import Login from "../features/login/login";
import Register from "../features/register/register";
import Pots from "../features/pots/Pots";
import Transactions from "../features/transactions/Transactions";
import RecurringBills from "../features/recurring-bills/RecurringBills";
import LayoutAuth from "../layouts/layoutAuth/LayoutAuth";
import ProtectedRoute from "../components/ProtectedRoute ";
import { Suspense } from "react";
import Loader from "../components/Loader";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute>
                    <Suspense fallback={<Loader />}>
                        <Overview />
                    </Suspense>
                </ProtectedRoute >,
            },
            {
                path: "/budgets",

                element:
                    <ProtectedRoute>
                        <Suspense fallback={<Loader />}>
                            <Budgets />
                        </Suspense>
                    </ProtectedRoute>
            },
            {
                path: "/pots",
                element:
                    <ProtectedRoute>
                        <Suspense fallback={<Loader />}>
                            <Pots />,
                        </Suspense>
                    </ProtectedRoute>
            },
            {
                path: "/transactions",
                element:
                    <ProtectedRoute>
                        <Suspense fallback={<Loader />}>
                            <Transactions />
                        </Suspense>
                    </ProtectedRoute>
            },
            {
                path: "/recurring-bills",
                element:
                    <ProtectedRoute>
                        <Suspense fallback={<Loader />}>
                            <RecurringBills />
                        </Suspense>
                    </ProtectedRoute>
            }
        ]
    },
    {
        path: "/",
        element: <LayoutAuth />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },

])

export default routes

