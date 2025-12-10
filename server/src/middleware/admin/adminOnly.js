// src/middleware/adminOnly.js
export const adminOnly = (req, res, next) => {
    try {
        const user = req.user; // viene desde authMiddleware

        if (!user) {
            return res.status(401).json({ ok: false, message: "Token no válido." });
        }

        if (user.rol !== "admin") {
            return res.status(403).json({ ok: false, message: "Acceso denegado. Requiere rol admin." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ ok: false, message: "Acceso denegado." });
    }
};
