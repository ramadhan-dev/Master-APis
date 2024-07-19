const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        name: zod.string({
            required_error: 'Province Name is required',
        }),
        code: zod.string({
            required_error: 'Province Code is required',
        }),
    }),
})



exports.update = zod.object({
    body: zod.object({
        id: zod.string({
            required_error: 'Province ID  is required',
        }),
    }),
})