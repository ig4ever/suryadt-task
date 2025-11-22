/**
 * @openapi
 * tags:
 *   - name: master
 * paths:
 *   /master:
 *     get:
 *       tags: [master]
 *       summary: get a list of master
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags: [master]
 *       summary: Create a master
 *   /master/{id}:
 *     get:
 *       tags: [master]
 *       summary: get a list of master by ID.
 *     patch:
 *       security:
 *         - bearerAuth: []
 *       tags: [master]
 *       summary: Update a master.
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags: [master]
 *       summary: delete a single master by id.
 */
export {}