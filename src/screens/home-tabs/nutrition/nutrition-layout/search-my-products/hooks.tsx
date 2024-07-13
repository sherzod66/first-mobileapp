import { useEffect, useState } from "react";
import { useRedux } from "../../../../../store/hooks";
import { selectUser, setUser } from "../../../../../store/slices/appSlice";
import { Dish, Product, Response } from "../../../../../types";
import { ApiService } from "../../../../../services";
import { convertDishToProduct } from "../../../../../utils/convertDishToProduct";
import { useNavigation } from "@react-navigation/native";
import { MyProductsScreenNavigationProp } from "../my-products/hooks";
import { NUTRITION } from "../../../../../navigation/ROUTES";

export const SearchHooks = () => {
  const [loading, setLoading] = useState<Product | null>(null);
  const [foundProduct, setFoundProduct] = useState<Product[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [oil, setOil] = useState("");
  const [carb, setCarb] = useState("");
  const [editId, setEditId] = useState<string>("");
  const [editProductCategory, setEditProductCategory] = useState<string>("");
  const [user, dispatch] = useRedux(selectUser);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigation = useNavigation<MyProductsScreenNavigationProp>();

  useEffect(() => {
    if (user)
      if (searchValue.length > 1)
        setFoundProduct([
          ...user.products.filter((e) =>
            e.name?.ru?.toLowerCase().includes(searchValue.toLowerCase())
          ),
        ]);
      else setFoundProduct([]);
  }, [searchValue, user]);

  const onRemove = async (product: Product) => {
    if (user) {
      setLoading(product);

      try {
        await ApiService.patch(`/users/remove-product/${user._id}`, {
          productId: product._id,
        });

        dispatch(
          setUser({
            ...user,
            products: [...user.products.filter((p) => p._id !== product._id)],
          })
        );
      } catch (e) {}

      setLoading(null);
    }
  };
  const onPress = () => {
    navigation.navigate(NUTRITION.RECOMMENDATION as never);
  };
  const onHideEdit = () => {
    setShowEdit(false);
    setName("");
    setCalories("");
    setProtein("");
    setOil("");
    setCarb("");
    setEditProductCategory("");
  };
  const onEdit = async () => {
    if (editProductCategory.length > 0 && user) {
      setModalLoading(true);
      try {
        const res = await ApiService.put<Response<Product>>(
          `/products/${editId}`,
          {
            name: {
              en: name,
              ru: name,
              uz: name,
            },
            calories,
            protein,
            oil,
            carb,
            category: editProductCategory,
            creator: user._id,
          }
        );
        console.log(res);
        dispatch(
          setUser({
            ...user,
            products: [...user.products, res.data],
          })
        );

        setModalLoading(false);
        setShowEdit(false);
      } catch (e) {
        setModalLoading(false);
      }
    }
  };
  const isModalBtnDisabled = !name || !calories || !protein || !oil || !carb;
  return {
    searchValue,
    setSearchValue,
    loading,
    setLoading,
    foundProduct,
    name,
    setName,
    calories,
    setCalories,
    protein,
    setProtein,
    oil,
    setOil,
    carb,
    setCarb,
    editId,
    setEditId,
    showEdit,
    setShowEdit,
    modalLoading,
    isModalBtnDisabled,
    onHideEdit,
    onPress,
    onRemove,
    setEditProductCategory,
    onEdit,
  };
};
