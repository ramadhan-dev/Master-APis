const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        name: zod.string({
            required_error: 'Product Status Name is required',
        }),
        code: zod.string({
            required_error: 'Product Status Code is required',
        })
    }),
})

