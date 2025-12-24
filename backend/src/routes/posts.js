/**
 * @file posts.js
 * @description
 * Definición de las rutas relacionadas con la gestión de posts.
 *
 * Este módulo expone endpoints para:
 * - Obtener posts agrupados por nombre.
 * - Aplicar filtros opcionales mediante query params.
 */
const express = require("express");

const { getGroupedPosts } = require("../services/postsService");

const router = express.Router();

/**
 * @openapi
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Obtener posts agrupados por nombre
 *     description: |
 *       Retorna una lista de posts agrupados por el campo **name**,
 *       indicando cuántos posts existen por cada nombre.
 *
 *       - Los registros con nombre vacío o nulo son ignorados.
 *       - Permite aplicar un filtro opcional por nombre.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           Filtro opcional para buscar por nombre.
 *           La búsqueda no distingue entre mayúsculas y minúsculas.
 *         example: Luke
 *     responses:
 *       200:
 *         description: Lista de posts agrupados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Luke
 *                   postCount:
 *                     type: integer
 *                     example: 3
 */
router.get("/", async (req, res) => {
  try {
    const nameFilter = (req.query.name || "").trim();
    const data = await getGroupedPosts({ nameFilter });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
