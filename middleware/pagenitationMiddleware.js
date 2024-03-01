const { ModelName } = require('../models'); // Import your Sequelize model

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const paginateMiddleware = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
    const offset = (page - 1) * limit;

    try {
        // Fetch data from the database with pagination
        const data = await ModelName.findAll({
            offset,
            limit,
            // You can add any other conditions here like where clause, order, etc.
        });

        // Fetch total count for pagination
        const totalCount = await ModelName.count();

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        // Attach pagination metadata to the response object
        res.pagination = {
            total: totalCount,
            totalPages,
            currentPage: page,
            hasNextPage,
            hasPreviousPage,
            limit,
            offset,
        };

        // Attach data to the response object
        res.data = data;

        next();
    } catch (error) {
        console.error('Error in pagination middleware:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = paginateMiddleware;