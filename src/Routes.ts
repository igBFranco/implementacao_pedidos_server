import express, { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/UserController';
import { getClients, getClientById, createClient, updateClient, deleteClient } from './controllers/ClientController';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './controllers/ProductController';
import { getOrderProduct, getOrderProductById, createOrderProduct, updateOrderProduct, deleteOrderProduct } from './controllers/OrderProductController';
import { getOrder, getOrderById, createOrder, updateOrder, deleteOrder } from './controllers/OrderController';
const router: Router = express.Router();

router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/clients/:id', getClientById);
router.get('/clients', getClients);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/products/:id', getProductById);
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/orderproduct/:id', getOrderProductById);
router.get('/orderproduct', getOrderProduct);
router.post('/orderproduct', createOrderProduct);
router.put('/orderproduct/:id', updateOrderProduct);
router.delete('/orderproduct/:id', deleteOrderProduct);

router.get('/order/:id', getOrderById);
router.get('/order', getOrder);
router.post('/order', createOrder);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);

export default router;