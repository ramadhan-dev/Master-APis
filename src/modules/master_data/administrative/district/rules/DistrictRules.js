const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        name: zod.string({
            required_error: 'District Name is required',
        }),
        code: zod.string({
            required_error: 'District Code is required',
        }),
        city_code: zod.string({
            required_error: 'City Code is required',
        }),
    }),
})

