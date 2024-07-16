const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        name: zod.string({
            required_error: 'City Name is required',
        }),
        code: zod.string({
            required_error: 'City Code is required',
        }),
        province_code: zod.string({
            required_error: 'Province Code is required',
        }),
    }),
})

