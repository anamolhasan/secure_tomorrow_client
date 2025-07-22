import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
// import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
// import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import AllPolicy from "../pages/AllPolicy/AllPolicy";
// import Blog from '../pages/Blog/Blog'
import AdminPolicyPage from "../pages/Dashboard/Admin/AdminPolicyPage/AdminPolicyPage";
import ManageApplications from "../pages/Dashboard/Admin/ManageApplications/ManageApplications";
import PolicesDetails from "../pages/PolicyDetails/PolicesDetails";
import QuotePage from "../pages/Dashboard/Customer/QuotePage";
import ApplicationForm from "../pages/Dashboard/Customer/ApplicationForm";
import Blogs from "../pages/Blog/Blogs";
import BlogDetails from "../pages/Blog/BlogDetails";
import AddBlog from "../pages/Blog/AddBlog";
import EditBlog from "../pages/Blog/EditBlog";
import ManageBlogs from "../pages/Blog/ManageBlogs";
import AssignedCustomers from "../pages/AssignedCustomers/AssignedCustomers";
import PolicyClearance from "../pages/PolicyClearance/PolicyClearance.";
import MyPolicies from "../pages/MyPolicies/MyPolicies";
import PaymentStatus from "../pages/PaymentStatus/PaymentStatus";
// import AdminPolicyPage from '../pages/Dashboard/Admin/AdminPolicyPage'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-policy",
        element: <AllPolicy />,
        // loader: () => fetch(`${import.meta.env.VITE_API_URL}/policies`)
      },
      {
        path: "/policy/:id",
        element: <PolicesDetails />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "/get-quote/:id",
        element: <QuotePage />,
      },
      {
        path: "/application-form",
        element: <ApplicationForm />,
      },
      // {
      //   path: '/FAQs',
      //   element: <Blog />
      // },
      // {
      //   path: '/plant/:id',
      //   element: <PlantDetails />,
      // },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "adminPolicyPage",
        element: (
          <PrivateRoute>
            <AdminPolicyPage />
          </PrivateRoute>
        ),
      },

      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-application",
        element: (
          <PrivateRoute>
            <ManageApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-blog/:id",
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`),
      },
      {
        path: "manage-blogs",
        element: <ManageBlogs />,
      },
      {
        path: "Assigned-customers",
        element: <AssignedCustomers />
      },
      {
        path: "Policy-clearance",
        element: <PolicyClearance />
      },
      {
        path: "my-policy",
        element: <MyPolicies />
      },
      {
        path: "payment-status",
        element: <PaymentStatus />
      },
    ],
  },
]); 
