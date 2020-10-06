import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';
import { checkJwt } from './middleware/checkJwt';
import { checkRole } from './middleware/checkRole';

import * as AuthController from './controllers/auth';
import * as BuyerController from './controllers/buyerauth';
import * as ProductController from './controllers/product';
import * as CategoryController from './controllers/category';
import * as TransactionController from './controllers/transaction';
import * as AnalyticsController from './controllers/analytics';
import * as QrcodeController from './controllers/qrcode';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// user
router.post('/auth/add', AuthController.add);
router.post('/auth/login', AuthController.login);

// user
router.post('/buyer/add', BuyerController.add);
router.post('/buyer/login', BuyerController.login);

// product routes
router.post('/product/add', checkJwt, checkRole(['SELLER']), ProductController.add);
router.get('/product/all/:id', checkJwt, checkRole(['SELLER']), ProductController.all);
router.get('/product/search', checkJwt, checkRole(['SELLER']), ProductController.search);
router.put('/product/update/:id', checkJwt, checkRole(['SELLER']), ProductController.update);
router.delete('/product/delete/:id', checkJwt, checkRole(['SELLER']), ProductController.del);

// category routes
router.post('/category/add', checkJwt, checkRole(['SELLER']), CategoryController.add);
router.get('/category/all/:id', checkJwt, checkRole(['SELLER']), CategoryController.all);
router.put('/category/update', checkJwt, checkRole(['SELLER']), CategoryController.update);
router.delete('/category/delete/:id', checkJwt, checkRole(['SELLER']), CategoryController.del);

// transaction routes
router.post('/transaction/add', checkJwt, checkRole(['SELLER']), TransactionController.add);
router.get('/transaction/all/:id', checkJwt, checkRole(['SELLER']), TransactionController.all);

// analytics
router.get('/analytics/pcount/:id', checkJwt, checkRole(['SELLER']), AnalyticsController.productCount);
router.get('/analytics/ccount/:id', checkJwt, checkRole(['SELLER']), AnalyticsController.categoryCount);
router.get('/analytics/sale/:id', checkJwt, checkRole(['SELLER']), AnalyticsController.sale);
router.get('/analytics/daily/:id', checkJwt, checkRole(['SELLER']), AnalyticsController.dailySale);
router.get('/analytics/customers/:id', checkJwt, checkRole(['SELLER']), AnalyticsController.customerCount);
router.get('/analytics/outofstock/:id', checkJwt, checkRole(['SELLER']), AnalyticsController.outOfstock);

// qrcode
router.get('/qrcode/:id', checkJwt, checkRole(['BUYER']), QrcodeController.details);

// Dev routes
// if (process.env.NODE_ENV === 'development') {
router.use('/dev/api-docs', swaggerUi.serve);
router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
// }

export default router;
