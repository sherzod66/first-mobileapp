import { useState } from "react";
import { useRedux } from "../../../../../store/hooks";
import { selectUser, setUser } from "../../../../../store/slices/appSlice";
import { selectProducts } from "../../../../../store/slices/productSlice";
import { Product } from "../../../../../types";
import { ApiService } from "../../../../../services";

export const SearchHooks = () => {
  const [user, dispatch] = useRedux(selectUser);
  const [loading, setLoading] = useState(false);
  const [allProducts] = useRedux(selectProducts);
  const [searchState, setSearchState] = useState("");
  const [onSearch, setOnSearch] = useState("");
  const [findProduct, setFindProduct] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product[]>([]);

  const searchProduct = (value: string) => {
    if (value.length > 1)
      setFindProduct([
        ...allProducts.filter((elem) =>
          elem.name.ru.toLowerCase().includes(value.toLowerCase())
        ),
      ]);
    else setFindProduct([]);
  };

  const onSelect = (product: Product) => {
    let arr = [...selected];

    if (selected.find((s) => s._id === product._id)) {
      arr = arr.filter((a) => a._id !== product._id);
    } else {
      arr.push(product);
    }

    setSelected(arr);
  };
  const onAdd = async () => {
    if (user) {
      setLoading(true);

      for (let i = 0; i < selected.length; i++) {
        await ApiService.put(`/users/add-product/${user._id}`, {
          productId: selected[i]._id,
        });
      }

      dispatch(
        setUser({
          ...user,
          products: [...user.products, ...selected],
        })
      );

      setLoading(false);
      setSelected([]);
    }
  };

  return {
    searchState,
    setSearchState,
    setOnSearch,
    onSearch,
    allProducts,
    searchProduct,
    findProduct,
    onSelect,
    selected,
    onAdd,
    loading,
  };
};
