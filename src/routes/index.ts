import express from 'express';
import exchangesRoutes from './exchanges.routes'

const router = express.Router();


const defaultRoutes = [
  {
    path: '/exchanges',
    route: exchangesRoutes
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router;