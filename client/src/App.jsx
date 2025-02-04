import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '@pages/Layout/Layout'
import { ErrorPage } from '@pages/Error/ErrorPage'
import { JobPageLayout } from '@pages/Job/JobPageLayout'
import { JobPage } from '@pages/Job/JobPage'
import { CreateJobPage } from '@pages/Job/CreateJobPage'
import { EditJobPage } from '@pages/Job/EditJobPage'
import { UserPageLayout } from '@pages/User/UserPageLayout'
import { CreateUserPage } from '@pages/User/CreateUserPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <JobPageLayout />,
                children: [
                    {
                        index: true,
                        element: <JobPage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <EditJobPage />,
                    },
                    {
                        path: 'create',
                        element: <CreateJobPage />,
                    },
                ],
            },

            {
                path: 'users',
                element: <UserPageLayout />,
                children: [
                    {
                        path: 'create',
                        element: <CreateUserPage />,
                    },
                ],
            },
        ],
    },
])

const App = () => <RouterProvider router={router} />

export default App
