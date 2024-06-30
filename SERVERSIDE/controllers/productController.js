const productModel = require('../models/products');
const Mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { default: mongoose } = require('mongoose');

const addProduct = async (req, res) => {
    try {
        //let image_filename = `${req.file.filename}`;
        const {product_name, brand_name, description, old_price, new_price, category, sub_category, quantity} = req.body;
        if(!product_name) {
            return res.send({error: 'name required'});
        }
        if(!brand_name) {
            return res.send({error: 'brand_name required'});
        }
        if(!description) {
            return res.send({error: 'description required'});
        }
        if(!old_price) {
            return res.send({error: 'old_price required'});
        }
        if(!new_price) {
            return res.send({error: 'new_price required'});
        }
        if(!category) {
            return res.send({error: 'category required'});
        }
        if(!sub_category) {
            return res.send({error: 'sub_category required'});
        }
        if(!quantity) {
            return res.send({error: 'quantity required'});
        }
        const product = await new productModel({
            product_name,
            brand_name,
            description,
            old_price,
            new_price,
            image: req.file.filename,
            category,
            sub_category,
            quantity
        }).save();
        res.json({
            success: true,
            error: false,
            message: "Product Added"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Unable to add Product"
        })
    }
}

const productList = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({
            success: true,
            message: "Retrieved Product List",
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving product list"
        })
    }

 }

 const updateProduct = async (req, res) => {
    try {
        const {nowOld, nowNew, newQuantity, newSub_category} = req.body;
        
        if(!nowOld) {
            return res.send({error: 'old price required'});
        }
        if(!nowNew) {
            return res.send({error: 'new price required'});
        }
        if(!newQuantity) {
            return res.send({error: 'new quantity required'});
        }
        if(!newSub_category) {
            return res.send({error: 'new sub category required'});
        }
        const productUpdate = await productModel.findByIdAndUpdate(req.params.id, {
            old_price: nowOld,
            new_price: nowNew,
            quantity: newQuantity,
            sub_category: newSub_category
        }, {new: true});
        res.json({
            success: true,
            error: false,
            message: "Product Update Successful"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Unable to update Product"
        })
    }
 }

const getProductDetails = async(req, res)=> {
    try {
        const { id } = req.body;
        const product = await productModel.findById(id);
        res.json({
            data: product,
            success: true,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success:false,
            message: "An error occurred!"
        })
    }
}

const getProductCategories = async (req, res) => {
    try {
        const categoryTabs = await productModel.distinct('sub_category');
        const catTabList = [];

        for (const sub_category of categoryTabs) {
            const product = await productModel.findOne({sub_category});
            if(product) {
                catTabList.push(product)
            }
        }

        res.json({
            success: true,
            message: "Product categories",
            data: catTabList,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            message: "An error occured",
            success: false
        })
    }
}

const cardsByCartegory = async (req, res) => {
    try {
        const { gt_category } = req.body;
        const product = await productModel.find({ sub_category:gt_category });
        res.json({
            success: true,
            data: product,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success: false,
            message: 'An error occured'
        })
    }
}

const searchProducts = async (req, res) => {
    try {
        const {phrase} = req.params;
        const result = await productModel.find({
            $or: [
                {brand_name: {$regex : phrase, $options: "i"}},
                {category: {$regex: phrase, $options: "i"}},
                {sub_category: {$regex: phrase, $options: "i"}},
                {product_name: {$regex: phrase, $options: "i"}}
            ]
        });

        res.json({
            data: result,
            success:true,
            error: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true
        })
    }
}

const filterProducts = async(req, res) => {
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.brand_name = checked;
        if(radio.length) args.new_price = {$gte: radio[0], $lte: radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Error filtering products"
        })
    }
}

// sub_category and price filter

const c_and_p_filter = async(req, res) => {
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.sub_category = checked;
        if(radio.length) args.new_price = {$gte: radio[0], $lte: radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Error filtering products"
        })
    }
}

const removeProduct = async (req, res) => { 
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if(product) {
          res.json({
            success: true,
            message: "deleted Successfully",
          });  
        } else {
            res.json({
              success: true,
              message: "delete Usuccessful"
            });
        }
          
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: "Error in Deleting file",
            error: true
        })
    }
 }

module.exports = {addProduct, productList, updateProduct, filterProducts, c_and_p_filter, getProductDetails, searchProducts, removeProduct, getProductCategories, cardsByCartegory }