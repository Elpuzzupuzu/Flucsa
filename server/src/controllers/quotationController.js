// quotationController.js
import * as QuotationService from '../services/quotationService.js';

// ==========================================================
// 1. CREATE (Crear Cotización) - RUTA: POST /api/quotations
// ==========================================================

async function createQuotation(req, res) {
    // 💡 Asumimos que el usuarioId viene de req.body, pero DEBERÍA venir de la autenticación (req.user.id)
    const usuarioId = req.body.usuario_id; 

    if (!usuarioId) {
        return res.status(401).json({ 
            message: "Acceso denegado. Se requiere autenticación del usuario (usuario_id)." 
        });
    }

    try {
        const cotizacion = await QuotationService.generateQuotation(usuarioId);
        
        res.status(201).json({ 
            message: "Cotización generada con éxito.", 
            cotizacion 
        });

    } catch (error) {
        console.error("Error en quotationController.createQuotation:", error.message);
        
        // Manejo de errores de negocio esperados
        if (error.message.includes("vacío") || error.message.includes("no válido")) {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error interno al procesar la cotización." });
    }
}

// ==========================================================
// 2. READ (Detalle por ID) - RUTA: GET /api/quotations/:id
// ==========================================================

async function getQuotationDetails(req, res) {
    const { id } = req.params;

    try {
        const cotizacion = await QuotationService.getQuotationDetails(id);

        if (!cotizacion) {
            return res.status(404).json({ message: "Cotización no encontrada." });
        }
        
        // 💡 Aquí se debería verificar que la cotización pertenezca al usuario autenticado (si no es admin)

        res.status(200).json(cotizacion);
    } catch (error) {
        console.error("Error en getQuotationDetails:", error.message);
        res.status(500).json({ message: "Error al obtener la cotización." });
    }
}

// ==========================================================
// 2B. READ (Listar por Usuario) - RUTA: GET /api/quotations
// ==========================================================

// 💡 Nota: Asumimos que esta ruta filtra por el usuario autenticado
async function getQuotationsByUser(req, res) {
    // Asumimos que el ID del usuario se obtiene del token o query params
    const usuarioId = req.query.usuario_id || req.body.usuario_id; 
    
    if (!usuarioId) {
        return res.status(401).json({ message: "Se requiere el ID de usuario para listar cotizaciones." });
    }

    try {
        // 💡 Asumimos que existe un método para listar en el servicio
        const cotizaciones = await QuotationService.getQuotationsByUserId(usuarioId);

        res.status(200).json(cotizaciones);
    } catch (error) {
        console.error("Error en getQuotationsByUser:", error.message);
        res.status(500).json({ message: "Error al listar las cotizaciones." });
    }
}


// ==========================================================
// 3. UPDATE (Actualizar Estado) - RUTA: PATCH /api/quotations/:id/status
// ==========================================================

async function updateQuotationStatus(req, res) {
    const { id } = req.params;
    const { estado } = req.body; // El nuevo estado (e.g., 'ACEPTADA')

    if (!estado) {
        return res.status(400).json({ message: "El campo 'estado' es requerido." });
    }

    try {
        const cotizacionActualizada = await QuotationService.updateQuotationStatus(id, estado);

        if (!cotizacionActualizada) {
            return res.status(404).json({ message: "Cotización no encontrada para actualizar." });
        }
        
        res.status(200).json({ 
            message: `Estado de cotización ${id} actualizado a ${estado}.`, 
            cotizacion: cotizacionActualizada 
        });
    } catch (error) {
        console.error("Error en updateQuotationStatus:", error.message);
        res.status(500).json({ message: "Error al actualizar el estado de la cotización." });
    }
}


// ==========================================================
// 4. DELETE (Eliminar) - RUTA: DELETE /api/quotations/:id
// ==========================================================

async function deleteQuotation(req, res) {
    const { id } = req.params;

    try {
        // 💡 Aquí es crucial: El servicio debe verificar permisos de borrado (Admin o propietario)
        await QuotationService.deleteQuotation(id);
        
        res.status(204).send(); // 204 No Content para borrado exitoso
    } catch (error) {
        console.error("Error en deleteQuotation:", error.message);
        
        // Si el error indica que no se encontró el registro (posiblemente un 404 del servicio)
        if (error.message.includes("no encontrada")) {
             return res.status(404).json({ message: error.message });
        }
        
        res.status(500).json({ message: "Error al eliminar la cotización." });
    }
}


export {
    createQuotation,
    getQuotationDetails,
    getQuotationsByUser, // Exportado
    updateQuotationStatus, // Exportado
    deleteQuotation // Exportado
};