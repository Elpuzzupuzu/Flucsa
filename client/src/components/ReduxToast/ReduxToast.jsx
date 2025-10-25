// client/src/components/ReduxToast.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearSuccessMessage } from "../../features/user/usersSlice";

const ReduxToast = () => {
  const dispatch = useDispatch();
  const { notificationMessage } = useSelector((state) => state.user);

  useEffect(() => {
    if (notificationMessage) {
      toast.error(notificationMessage); // muestra el toast con estilo de error
      dispatch(clearSuccessMessage());  // limpia el mensaje después de mostrarlo
    }
  }, [notificationMessage]);

  return null;
};

export default ReduxToast;
