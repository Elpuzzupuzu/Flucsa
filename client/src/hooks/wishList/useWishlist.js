// useWishlist.js
import { useDispatch, useSelector } from 'react-redux';
import { 
  addProductToWishlist,
  removeProductFromWishlist,
} from '../../features/wishlist/wishListSlice';

const useWishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlist, loading } = useSelector((state) => state.wishlist);

  const user = useSelector((state) => state.user.user);
  const isAuthenticated = !!user;

  const isInWishlist = (productId) => {
    return wishlist?.some((item) => item.producto_id === productId);
  };

  const toggleWishlist = async (productId) => {
    if (!isAuthenticated) {
      return { error: "AUTH_REQUIRED" };
    }

    if (loading) {
      return { error: "LOADING" };
    }

    // 👉 Eliminando
    if (isInWishlist(productId)) {
      await dispatch(
        removeProductFromWishlist({ userId: user.id, productId })
      );

      return {
        removed: true,
        added: false,
        productId
      };
    }

    // 👉 Añadiendo
    await dispatch(
      addProductToWishlist({ userId: user.id, productId })
    );

    return {
      removed: false,
      added: true,
      productId
    };
  };

  return {
    wishlist,
    isAuthenticated,
    isLoading: loading,
    isInWishlist,
    toggleWishlist,
  };
};

export default useWishlist;
