import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../../features/products/adminProductsSlice";
import api from "../../../../api/axios";

// Estado inicial del formulario
const initialFormData = {
  nombre: "",
  descripcion: "",
  precio: "",
  imagen: "",
  categoria_principal_id: "",
  subcategoria_id: "",
  ubicacion_id: "",
  codigo: "",
  marca: "",
  existencias: "",
  disponible: true,
  ventas_anuales: "",
};

export const useProductCreatorForm = (onClose) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  // Manejo de inputs normales (texto, número, checkbox)
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // Manejo para selects personalizados
  const handleSelectChange = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // File upload handlers
  const handleFileChange = useCallback((e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFormData((prev) => ({
        ...prev,
        imagen: URL.createObjectURL(selected),
      }));
    }
  }, []);

  // Drag & Drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setFormData((prev) => ({
        ...prev,
        imagen: URL.createObjectURL(selected),
      }));
    }
  }, []);

  // Lógica de guardado principal (corregida)
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let imageUrl = formData.imagen;

      // 1. Subir imagen si existe archivo
      if (file) {
        const formDataImage = new FormData();
        formDataImage.append("imagen", file);

        const response = await api.post("/products/upload-image", formDataImage);
        imageUrl = response.data.imageUrl;
      }

      // 2. Preparar datos del producto
      const newProduct = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio || "0"),
        imagen: imageUrl,
        categoria_principal_id: formData.categoria_principal_id,
        subcategoria_id: formData.subcategoria_id,
        ubicacion_id: formData.ubicacion_id,
        codigo: formData.codigo,
        marca: formData.marca,
        existencias: parseInt(formData.existencias || "0", 10),
        disponible: Boolean(formData.disponible),
        ventas_anuales: parseInt(formData.ventas_anuales || "0", 10),
      };

      // 3. Crear producto con Redux Toolkit
      await dispatch(createProduct({ ...newProduct, file })).unwrap();

      // 4. Si llegamos aquí, todo fue exitoso
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Error al crear producto";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    saving,
    dragActive,
    error,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleSave,
  };
};
