import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as AuthController from './controllers/auth';
import * as BuyerController from './controllers/buyerauth';
import * as ProductController from './controllers/product';
import * as CategoryController from './controllers/category';
import * as TransactionController from './controllers/transaction';
import * as AnalyticsController from './controllers/analytics';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// user
router.post('/auth/add', AuthController.add);

// user
router.post('/buyer/add', BuyerController.add);

// product routes
router.post('/product/add', ProductController.add);
router.get('/product/all/:id', ProductController.all);
router.get('/product/search', ProductController.search);
router.put('/product/update', ProductController.update);
router.delete('/product/delete/:id', ProductController.del);

// category routes
router.post('/category/add', CategoryController.add);
router.get('/category/all/:id', CategoryController.all);
router.put('/category/update', CategoryController.update);
router.delete('/category/delete/:id', CategoryController.del);

// transaction routes
router.post('/transaction/add', TransactionController.add);
router.get('/transaction/all', TransactionController.all);

router.get('/analytics/pcount/:id', AnalyticsController.productCount);
router.get('/analytics/ccount/:id', AnalyticsController.categoryCount);
router.get('/analytics/sale/:id', AnalyticsController.sale);
router.get('/analytics/daily/:id', AnalyticsController.dailySale);
router.get('/analytics/customers/:id', AnalyticsController.customerCount);

// Dev routes
// if (process.env.NODE_ENV === 'development') {
router.use('/dev/api-docs', swaggerUi.serve);
router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
// }

export default router;
