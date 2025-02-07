import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import PageNotFoundPage from '../components/PageNotFound';
import { Login } from '../pages/Login';
import MedicineListPage from '../pages/MedicineListPage';
import AddMedicinePage from '../pages/AddMedicinePage';
import { AdminLayout } from '../components/AdminLayout';
import { DoseForm } from '../pages/DoseForm';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element:<AdminLayout/>,
        children:[
          {
            element:<DoseForm/>,
            path:'/dose-form'
          }
        ]
      },
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <MedicineListPage />,
        path: '/',  
      },
      {
        element: <AddMedicinePage />,
        path: '/add-medicine/:id?',  
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFoundPage />,
  },
]);

export default router;
