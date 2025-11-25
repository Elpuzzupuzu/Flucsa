import { useEffect, useState } from "react";
import api from "../../api/axios";

export const useSubCategories = (mainCategoryId) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mainCategoryId) {
      setSubcategories([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/Subcategory/`);
        setSubcategories(res.data);
      } catch (err) {
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mainCategoryId]);

  return { subcategories, loading };
};
