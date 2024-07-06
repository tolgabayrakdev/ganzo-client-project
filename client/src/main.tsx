import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import Loading from './components/Loading'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications position="top-right" />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routes} />
      </Suspense>
    </MantineProvider>
  </React.StrictMode>,
)
