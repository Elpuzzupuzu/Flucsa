// src/repositories/pdfRepository.js

const projectRef = "dhsuozqvqqurvlbkovgy";
const bucket = "Catalogos";

export const pdfRepository = {
  getPublicUrl: (fileName) => {
    return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${fileName}`;
  },
};
