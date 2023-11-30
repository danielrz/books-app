import { lazy } from 'react'
import PATHS from './constants/paths'

const Home = lazy(() => import('../pages/Home'))
const Search = lazy(() => import('../pages/books/Search'))

const routes = [
  {
    path: PATHS.HOME,
    element: <Home />
  },
  {
    path: PATHS.SEARCH,
    element: <Search />
  }
]

export default routes