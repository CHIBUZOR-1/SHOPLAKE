const express = require('express');
const dotenv = require("dotenv").config();
const multer = require('multer');
const { addProduct, productList, removeProduct, updateProduct, getProductCategories, cardsByCartegory, getProductDetails, searchProducts, filterProducts, c_and_p_filter, cateProducts } = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../utils/authHelper');

const productRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=> {
        return cb(null, `${file.originalname}`);
    }
})

const upload = multer({storage:storage});

productRouter.post('/add_product',verifyToken, isAdmin, upload.single("image"),  addProduct);

productRouter.get('/product_list', productList);

productRouter.put('/update_product/:id', verifyToken, isAdmin, updateProduct);

productRouter.delete('/remove_product/:id', verifyToken, isAdmin, removeProduct);

productRouter.post('/card_category', cardsByCartegory);

productRouter.post('/product_details', getProductDetails);

productRouter.get('/search/:phrase', searchProducts);

productRouter.post('/filter-products', filterProducts);

productRouter.post('/filter_categories', c_and_p_filter);

productRouter.post('/category_products', cateProducts);

productRouter.get('/product_categories', getProductCategories);


module.exports = productRouter;