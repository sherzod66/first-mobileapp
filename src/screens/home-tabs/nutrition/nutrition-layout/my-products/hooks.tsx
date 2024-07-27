import { useEffect, useState } from "react";
import { useRedux } from "../../../../../store/hooks";
import {
  selectLanguage,
  selectUser,
  setUser,
} from "../../../../../store/slices/appSlice";
import { Product, Response } from "../../../../../types";
import { convertDishToProduct } from "../../../../../utils/convertDishToProduct";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NutritionStackParamList } from "../..";
import { NUTRITION } from "../../../../../navigation/ROUTES";
import { useNavigation } from "@react-navigation/native";
import { selectProductCategories } from "../../../../../store/slices/categorySlice";
import { ApiService } from "../../../../../services";

export type MyProductsScreenNavigationProp = NativeStackNavigationProp<
  NutritionStackParamList,
  NUTRITION.NUTRITION_LAYOUT
>;

export const MyProductsHooks = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Product | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [oil, setOil] = useState("");
  const [carb, setCarb] = useState("");
  const [editId, setEditId] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const [language] = useRedux(selectLanguage);
  const [productCategories] = useRedux(selectProductCategories);
  const [user, dispatch] = useRedux(selectUser);

  const navigation = useNavigation<MyProductsScreenNavigationProp>();

  const effect = () => {
    if (user) {
      if (activeTab === null) {
        setProducts([...user.dishes.map((dish) => convertDishToProduct(dish))]);
      } else {
        setProducts([
          ...user.products.filter(
            (p) => p.category?._id === productCategories[activeTab]?._id
          ),
        ]);
      }
    }
  };

  useEffect(() => {
    effect();
  }, [activeTab, user]);

  useEffect(() => {
    if (search.length > 1) {
      if (user)
        setProducts([
          ...user.products.filter((e) =>
            e.name.ru.toLowerCase().includes(search.toLowerCase())
          ),
        ]);
    } else {
      setProducts([
        ...user.products.filter(
          (p) => p.category?._id === productCategories[activeTab]?._id
        ),
      ]);
    }
  }, [search]);

  const onCreate = () => {
    navigation.navigate(NUTRITION.CREATE_DISH as never);
  };

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

  const onShow = () => {
    setShow(true);
  };
  const navigateSearch = () => {
    navigation.navigate(NUTRITION.SEARCH_MY_PRODUCT as never);
  };

  const onHide = () => {
    setShow(false);
    setName("");
    setCalories("");
    setProtein("");
    setOil("");
    setCarb("");
  };
  const onHideEdit = () => {
    setShowEdit(false);
    setName("");
    setCalories("");
    setProtein("");
    setOil("");
    setCarb("");
  };

  const onPress = () => {
    navigation.navigate(NUTRITION.RECOMMENDATION, { value: "createProduct" });
    setShow(false);
  };

  const onAdd = async () => {
    if (activeTab !== null && user) {
      setModalLoading(true);

      try {
        const res = await ApiService.post<Response<Product>>("/products", {
          name: {
            en: name,
            ru: name,
            uz: name,
          },
          calories,
          protein,
          oil,
          carb,
          category: productCategories[activeTab]._id,
          creator: user._id,
          userProduct: true,
        });
        console.log(JSON.stringify(res.data, null, 4));
        dispatch(
          setUser({
            ...user,
            products: [...user.products, res.data],
          })
        );

        setModalLoading(false);
        setShow(false);
      } catch (e) {
        setModalLoading(false);
        setShow(false);
      }
    }
  };
  const onEdit = async () => {
    if (activeTab !== null && user) {
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
            category: productCategories[activeTab]._id,
            creator: user._id,
          }
        );
        res.data;

        const findProduct = user.products.findIndex((el) => el._id === editId);
        const productsUser = [...user.products];
        productsUser.splice(findProduct, 1);
        dispatch(
          setUser({
            ...user,
            products: [...productsUser, res.data],
          })
        );

        setModalLoading(false);
        setShowEdit(false);
      } catch (e) {
        setModalLoading(false);
        setShow(false);
      }
    }
  };

  const isModalBtnDisabled = !name || !calories || !protein || !oil || !carb;

  return {
    activeTab,
    setActiveTab,
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
    products,
    loading,
    show,
    modalLoading,
    isModalBtnDisabled,
    language,
    productCategories,
    onCreate,
    onRemove,
    onShow,
    onHide,
    onPress,
    onAdd,
    showEdit,
    setShowEdit,
    onHideEdit,
    editId,
    setEditId,
    onEdit,
    search,
    setSearch,
    navigateSearch,
  };
};
