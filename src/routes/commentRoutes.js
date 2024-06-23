const { Router } = require("express");
const { getCommentsHandler } = require("../handlers/commentHandler/getComments");
const createCommentHandler = require("../handlers/commentHandler/createComment");
const updateCommentStatusHandler = require("../handlers/commentHandler/updateCommentStatus");
const { authenticateFirebaseToken } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const commentRouter = Router();

// Ruta para obtener comentarios de un restaurante específico
commentRouter.get("/:restaurant_id", getCommentsHandler);

// Ruta para crear un nuevo comentario
commentRouter.post("/", authenticateFirebaseToken, createCommentHandler);

// Ruta para actualizar el estado de un comentario (activar/desactivar)
commentRouter.put("/:comment_id/status", authenticateFirebaseToken, authorize(['superadmin', 'restaurant_owner']), updateCommentStatusHandler);

module.exports = commentRouter;



