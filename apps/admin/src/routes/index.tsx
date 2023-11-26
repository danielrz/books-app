import { lazy } from 'react'
import PATHS from './constants/paths'

const Home = lazy(() => import('../pages/Home'))

const routes = [
  {
    path: PATHS.HOME,
    element: <Home />
  }
]

export default routes