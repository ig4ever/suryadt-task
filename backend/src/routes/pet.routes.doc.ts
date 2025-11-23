/**
 * @openapi
 * tags:
 *   - name: pet
 * paths:
 *   /pet:
 *     get:
 *       tags: [pet]
 *       summary: get a list of pet.
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags: [pet]
 *       summary: Create a pet.
 *   /pet/{id}:
 *     get:
 *       tags: [pet]
 *       summary: get a list of pet by ID.
 *     patch:
 *       security:
 *         - bearerAuth: []
 *       tags: [pet]
 *       summary: Update a pet.
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags: [pet]
 *       summary: delete a single pet by id.
 */
export {};
