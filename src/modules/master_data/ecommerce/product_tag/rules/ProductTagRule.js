const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        name: zod.string({
            required_error: 'Product Tag Name is required',
        }),
        code: zod.string({
            required_error: 'Product Tag Code is required',
        })
    }),
})

