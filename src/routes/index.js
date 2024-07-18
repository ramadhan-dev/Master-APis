const express = require('express');
const app = express();
const multer = require('multer');


const AuthVerifyMiddleware = require("./../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("./../middlewares/IsAdmin");

const contactRouter = require("../modules/contact/routers/contactRoute");
const doctorRouter = require("../modules/doctor/routes/doctorRoute");
const appointmentRouter = require("../modules/appointment/routes/appointmentRoute");
const userRouter = require("../modules/user/routes/userRoute");

const authRouter = require("../modules/auth/routes/authRoute");
const reportRouter = require("../modules/report/routes/reportRoute");
const uploadRouter = require("./uploadRoute");

const provinceRoute = require("../modules/master_data/administrative/province/routes/ProvinceRoutes");
const cityRoute = require("../modules/master_data/administrative/city/routes/CityRoutes");
const districtRoute = require("../modules/master_data/administrative/district/routes/DistrictRoutes");
const subDistrictRoute = require("../modules/master_data/administrative/sub_district/routes/SubDistrictRoutes");


// Product
const productBrandRoutes = require("../modules/master_data/ecommerce/product_brand/routes/ProductBrandRoutes");
const productCategoryRoutes = require("../modules/master_data/ecommerce/product_category/routes/ProductCategoryRoutes");
const productSizeRoutes = require("../modules/master_data/ecommerce/product_size/routes/ProductSizeRoutes");
const productStatusRoutes = require("../modules/master_data/ecommerce/product_status/routes/ProductStatusRoutes");
const productTypeRoutes = require("../modules/master_data/ecommerce/product_type/routes/ProductTypeRoutes");
const productVisibilityRoutes = require("../modules/master_data/ecommerce/product_visibility/routes/ProductVisibilityRoutes");
const productRoutes = require("../modules/master_data/ecommerce/product/routes/ProductRoutes");



app.use('/api/auth', authRouter);

/**
 * 
 */
app.use('/api/contact', AuthVerifyMiddleware, IsAdmin, contactRouter);
app.use('/api/user', AuthVerifyMiddleware, IsAdmin, userRouter);
app.use('/api/doctor', AuthVerifyMiddleware, IsAdmin, doctorRouter);
app.use('/api/appointment', AuthVerifyMiddleware, IsAdmin, appointmentRouter);
app.use('/api/report', AuthVerifyMiddleware, IsAdmin, reportRouter);
app.use('/api/upload', AuthVerifyMiddleware, IsAdmin, uploadRouter);


/**
 * * APi's Administrative
 */
app.use('/api/province', AuthVerifyMiddleware, IsAdmin, provinceRoute);
app.use('/api/city', AuthVerifyMiddleware, IsAdmin, cityRoute);
app.use('/api/district', AuthVerifyMiddleware, IsAdmin, districtRoute);
app.use('/api/sub-district', AuthVerifyMiddleware, IsAdmin, subDistrictRoute);


/**
 * * API's Product
 */
app.use('/api/product-brand', AuthVerifyMiddleware, IsAdmin, productBrandRoutes);
app.use('/api/product-category', AuthVerifyMiddleware, IsAdmin, productCategoryRoutes);
app.use('/api/product-size', AuthVerifyMiddleware, IsAdmin, productSizeRoutes);
app.use('/api/product-status', AuthVerifyMiddleware, IsAdmin, productStatusRoutes);
app.use('/api/product-type', AuthVerifyMiddleware, IsAdmin, productTypeRoutes);
app.use('/api/product-visibility', AuthVerifyMiddleware, IsAdmin, productVisibilityRoutes);
app.use('/api/product', AuthVerifyMiddleware, IsAdmin, productRoutes);



/**
 * Error handling multer
 */
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Jika terjadi kesalahan Multer
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size should be less than 5MB' });
        }
    } else if (err) {
        // Jika terjadi kesalahan lain
        return res.status(400).json({ error: err.message });
    }
    next();
});

module.exports = app;



// Product Title
// Product Description
// Product Image
// Product Gallery
// Manufacturer Name

// Brand
// Stocks
// Price
// Discount
// Orders

// Status
// Visibility
// Publish Date & Time
// Product Categories
// Product Tags
// Product Short Description