//client/src/hooks/mainCateogory/useMainCategories.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainCategories } from "../../features/mainCategory/mainCategorySlice";

export const useMainCategories = () => {
  const dispatch = useDispatch();

  const { items: categories, loading, error } = useSelector(
    (state) => state.mainCategory
  );

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchMainCategories());
    }
  }, [dispatch]);

  return { categories, loading, error };
};
