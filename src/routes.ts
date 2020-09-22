import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as ProductController from './controllers/product';
import * as CategoryController from './controllers/category';
import * as TransactionController from './controllers/transaction';
import * as AnalyticsController from './controllers/analytics';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// product routes
router.post('/product/add', ProductController.add);
router.get('/product/all', ProductController.all);
router.get('/product/search', ProductController.search);
router.put('/product/update', ProductController.update);
router.delete('/product/delete', ProductController.del);

// category routes
router.post('/category/add', CategoryController.add);
router.get('/category/all', CategoryController.all);
router.put('/category/update', CategoryController.update);
router.delete('/category/delete', CategoryController.del);

// transaction routes
router.post('/transaction/add', TransactionController.add);
router.get('/transaction/all', TransactionController.all);

router.get('/analytics/all', AnalyticsController.all);

// Dev routes
// if (process.env.NODE_ENV === 'development') {
router.use('/dev/api-docs', swaggerUi.serve);
router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
// }

export default router;
