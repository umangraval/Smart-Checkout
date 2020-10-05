import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Product from '../../models/Product';
import User from '../../models/User';

const details: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const seller = await User.findById(product.owner);
  const ProductDetail = {
    id: product._id,
    shop: seller.shop,
    price: product.price,
    name: product.name,
    category: product.category,
    quantity: product.quantity,
    address: seller.address
  };
  res.send(ProductDetail);
};

export default requestMiddleware(details);
