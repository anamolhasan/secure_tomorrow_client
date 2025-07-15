import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'

import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyInventory'
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import AllPolicy from '../pages/AllPolicy/AllPolicy'
import Blog from '../pages/Blog/Blog'
import AdminPolicyPage from '../pages/Dashboard/Admin/AdminPolicyPage/AdminPolicyPage'
// import AdminPolicyPage from '../pages/Dashboard/Admin/AdminPolicyPage'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-policy',
        element: <AllPolicy />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/FAQs',
        element: <Blog />
      },
      {
        path: '/plant/:id',
        element: <PlantDetails />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
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
        path: 'adminPolicyPage',
        element: (
          <PrivateRoute>
            <AdminPolicyPage />
          </PrivateRoute>
        ),
      },
      // {
      //   path: 'manage-policies',
      //   element: (
      //     <PrivateRoute>
      //       <ManagePolicies />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
])
