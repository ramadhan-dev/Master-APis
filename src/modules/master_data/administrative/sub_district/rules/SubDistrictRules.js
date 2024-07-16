const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        name: zod.string({
            required_error: 'Sub District Name is required',
        }),
        code: zod.string({
            required_error: 'Sub District Code is required',
        }),
        district_code: zod.string({
            required_error: 'District Code is required',
        }),
    }),
})

