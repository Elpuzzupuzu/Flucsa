import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../features/location/locationSlice";

export const useLocations = () => {
  const dispatch = useDispatch();

  const { items: locations, loading, error } = useSelector(
    (state) => state.location
  );

  useEffect(() => {
    if (!locations || locations.length === 0) {
      dispatch(fetchLocations());
    }
  }, [dispatch]);

  return { locations, loading, error };
};
