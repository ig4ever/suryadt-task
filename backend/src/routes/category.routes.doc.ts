/**
 * @openapi
 * tags:
 *   - name: category
 * paths:
 *   /category:
 *     get:
 *       tags: [category]
 *       summary: get a list of category.
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags: [category]
 *       summary: Create a category.
 *   /category/{id}:
 *     get:
 *       tags: [category]
 *       summary: get a list of category by ID.
 *     patch:
 *       security:
 *         - bearerAuth: []
 *       tags: [category]
 *       summary: Create a category.
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags: [category]
 *       summary: delete a single category by id.
 */
export {};
