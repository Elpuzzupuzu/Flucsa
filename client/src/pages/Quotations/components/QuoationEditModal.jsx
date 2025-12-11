import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateQuotationItems, fetchQuotationById } from "../../../features/quotations/quotationSlice";
import QuotationSearchAdd from "./QuotationSearchAdd";
import { X } from "lucide-react";

const QuotationEditModal = ({ isOpen, onClose, quotation }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (quotation) {
      setItems(
        (quotation.cotizaciones_items || []).map((item) => ({
          producto_id: item.producto_id,
          nombre_producto: item.nombre_producto,
          precio_unitario_aplicado: item.precio_unitario_aplicado || 0,
          cantidad: item.cantidad || 1,
          tipo_precio: item.tipo_precio || "publico",
          imagen_producto: item.imagen_producto || null,
        }))
      );
    }
  }, [quotation]);

  if (!isOpen) return null;

  const handleAddProduct = (product) => {
    const exists = items.find((i) => i.producto_id === product.id);
    if (!exists) {
      setItems([
        ...items,
        {
          producto_id: product.id,
          nombre_producto: product.nombre,
          precio_unitario_aplicado: product.precio || 0,
          cantidad: 1,
          tipo_precio: "publico",
          imagen_producto: product.imagen || null,
        },
      ]);
    }
  };

  const handleRemoveItem = (producto_id) => {
    setItems(items.filter((i) => i.producto_id !== producto_id));
  };

  const handleChangeQuantity = (producto_id, cantidad) => {
    setItems(
      items.map((i) =>
        i.producto_id === producto_id ? { ...i, cantidad } : i
      )
    );
  };

  const handleSave = async () => {
    try {
      const payloadItems = items.map((item) => ({
        producto_id: item.producto_id,
        nombre_producto: item.nombre_producto,
        cantidad: item.cantidad,
        precio_unitario_aplicado: item.precio_unitario_aplicado,
        tipo_precio: item.tipo_precio || "publico",
        imagen_producto: item.imagen_producto || null,
      }));

      // 1️⃣ Actualizamos los ítems
      await dispatch(updateQuotationItems({ id: quotation.id, items: payloadItems })).unwrap();

      // 2️⃣ Recargamos la cotización actualizada desde el backend
      await dispatch(fetchQuotationById(quotation.id)).unwrap();

      // 3️⃣ Cerramos el modal
      onClose();
    } catch (error) {
      console.error("Error al actualizar los ítems:", error);
      alert(error.message || "Error al actualizar los ítems");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Editar Cotización</h2>

        <QuotationSearchAdd onProductSelect={handleAddProduct} />

        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.producto_id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div>
                <p className="font-medium">{item.nombre_producto}</p>
                <p className="text-sm text-gray-500">
                  ${item.precio_unitario_aplicado}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) =>
                    handleChangeQuantity(item.producto_id, Number(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => handleRemoveItem(item.producto_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-gray-500">No hay productos añadidos.</p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationEditModal;
