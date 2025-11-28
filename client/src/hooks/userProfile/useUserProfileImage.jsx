// src/hooks/useUserProfileImage.jsx
import { useState, useCallback, useEffect } from "react";
import api from "../../api/axios";

export const useUserProfileImage = (initialUrl = "") => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialUrl); // inicializamos con la URL
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Selección de archivo manual
  const handleFileChange = useCallback((e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(selected.type)) {
      setUploadError("Solo se permiten imágenes JPG, PNG o WEBP");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setUploadError("La imagen no puede superar los 5MB");
      return;
    }

    setFile(selected);
    setImagePreview(URL.createObjectURL(selected));
    setUploadError(null);
  }, []);

  // Drag & drop
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const selected = e.dataTransfer.files[0];
        handleFileChange({ target: { files: [selected] } });
      }
    },
    [handleFileChange]
  );

  // Subida a Cloudinary vía backend
  const uploadImage = useCallback(async () => {
    if (!file) return imagePreview;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("imagen", file);

      const response = await api.post("/products/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ⚡ Aquí usamos response.data.imageUrl tal como lo hace el otro hook
      const uploadedUrl = response.data.imageUrl || "";
      setImagePreview(uploadedUrl);
      return uploadedUrl;
    } catch (err) {
      setUploadError(err.response?.data?.message || "Error al subir la imagen");
      return null;
    } finally {
      setUploading(false);
    }
  }, [file, imagePreview]);

  const resetImage = useCallback(() => {
    setFile(null);
    setImagePreview(initialUrl);
    setUploadError(null);
  }, [initialUrl]);

  useEffect(() => {
    setImagePreview(initialUrl);
  }, [initialUrl]);

  return {
    file,
    imagePreview,
    uploading,
    uploadError,
    handleFileChange,
    handleDrag,
    handleDrop,
    uploadImage,
    resetImage,
  };
};
