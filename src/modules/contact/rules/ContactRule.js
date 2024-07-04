const zod = require('zod')

exports.create = zod.object({
    body: zod.object({
        names: zod.string({
            required_error: 'Full name is required',
        }),
        name2: zod.string({
            required_error: 'Full name is required',
        }),
    }),
})



/**
 * * schema untuk validasi update data  
 */
exports.update = zod.object({
    body: zod.object({
        names: zod.string({
            required_error: 'Full name is required',
        }),
    }),
})