const { z } = require('zod');

const validateFile = (req, res, next) => {
    const fileSchema = z.object({
        mimetype: z.string().refine(mimetype => ['image/jpeg', 'image/png', 'image/gif'].includes(mimetype), {
            message: 'Invalid file type'
        }),
        size: z.number().max(5 * 1024 * 1024, {
            message: 'File size should be less than 5MB'
        })
    });

    if (req.file) {
        const result = fileSchema.safeParse({
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        if (!result.success) {
            return res.status(400).json({ error: result.error.issues[0].message });
        }
    } else {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    next();
};



module.exports = validateFile