const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        // title: zod.string({
        //     required_error: 'Product Title is required',
        // }),
        // description: zod.string({
        //     required_error: 'Product Description is required',
        // }),
        // manufacturer_name: zod.string({
        //     required_error: 'Product Manufacturer Name is required',
        // }),
        // brand: zod.string({
        //     required_error: 'Product Brand is required',
        // }),
        // stock: zod.string({
        //     required_error: 'Product Stock is required',
        // }),
        // price: zod.string({
        //     required_error: 'Product Price is required',
        // }),
        // discount: zod.string({
        //     required_error: 'Product Discount is required',
        // }),
        // status: zod.string({
        //     required_error: 'Product Status is required',
        // }),
        // visibility: zod.string({
        //     required_error: 'Product Visibility is required',
        // }),
        // publish_date: zod.string({
        //     required_error: 'Product Publish Date is required',
        // }),
        // category: zod.string({
        //     required_error: 'Product Category is required',
        // }),
        // sort_description: zod.string({
        //     required_error: 'Product Sort Description is required',
        // }),
        // tag: zod.string({
        //     required_error: 'Product Tag is required',
        // })
    }),
})
