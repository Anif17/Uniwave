import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Expesnse from './pages/Expense';

// ----------------------------------------------------------------------

const isAuthenticated = () => {
  // Check if user is authenticated (e.g., by checking local storage, cookies, or an authentication context)
  // Return true if authenticated, false otherwise
  const token = localStorage.getItem('user-token'); // You may have your own way to check authentication
  return !!token;
};

const ProtectedRoute = ({ element, path }) => {
  if (isAuthenticated()) {
    return element;
  }
  return <Navigate to="/login" />;
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute element={<DashboardAppPage />} /> },
        { path: 'user', element: <ProtectedRoute element={<UserPage />} /> },
        { path: 'products', element: <ProtectedRoute element={<ProductsPage />} /> },
        { path: 'blog', element: <ProtectedRoute element={<BlogPage />} /> },
        { path: 'expense-tracker', element: <ProtectedRoute element={<Expesnse />} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
