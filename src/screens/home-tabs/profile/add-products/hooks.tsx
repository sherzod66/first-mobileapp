import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ProfileStackParamList } from "..";
import { PRODUCT_AMOUNT } from "../../../../constants/AMOUNT";
import { PROFILE } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import {
  selectLanguage,
  selectUser,
  setUser,
} from "../../../../store/slices/appSlice";
import {
  selectDishCategories,
  selectProductCategories,
} from "../../../../store/slices/categorySlice";
import { selectDishes } from "../../../../store/slices/dishSlice";
import { selectProducts } from "../../../../store/slices/productSlice";
import {
  Category,
  CategoryType,
  Product,
  Response,
  SchemaNutrition1,
  User,
} from "../../../../types";
import { convertDishToProduct } from "../../../../utils/convertDishToProduct";
import EventEmitter from "../../../../utils/EventEmitter";

export type AddProductsScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  PROFILE.ADD_PRODUCTS
>;

export type AddProductsScreenRouteProp = RouteProp<
  ProfileStackParamList,
  PROFILE.ADD_PRODUCTS
>;

export const AddProductsHooks = () => {
  const navigation = useNavigation<AddProductsScreenNavigationProp>();
  const route = useRoute<AddProductsScreenRouteProp>();
  const [user, dispatch] = useRedux(selectUser);
  const [language] = useRedux(selectLanguage);
  const [productCategories] = useRedux(selectProductCategories);
  const [dishCategories] = useRedux(selectDishCategories);
  const [allProducts] = useRedux(selectProducts);
  const [allDishes] = useRedux(selectDishes);

  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { products: productss, schemaNutrition } = route.params ?? {};

  const getCategories = () => {
    setActiveCategory(0);

    if (activeTab === 0) {
      setCategories(dishCategories);
    } else {
      setCategories(productCategories);
    }
  };

  useEffect(() => {
    getCategories();
  }, [activeTab]);

  const getProducts = async () => {
    if (categories.length && user) {
      let arr: Product[] = [];

      if (activeTab) {
        if (activeTab === 2) {
          arr = [...allProducts];
        } else {
          arr = [...user.products];
        }
      } else {
        arr = [...allDishes.map((dish) => convertDishToProduct(dish))];
      }

      setProducts(
        arr.filter((p) => p.category._id === categories[activeCategory]._id)
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, [activeTab, categories, activeCategory]);

  const onSearch = () => {
    console.log("onSearch");
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
    if (schemaNutrition) {
      setLoading(true);

      let arr1: string[] = schemaNutrition.products.map((p) => p._id);
      let arr2: string[] = schemaNutrition.dishes.map((d) => d._id);
      let amountsP: number[] = [...schemaNutrition.amountsP];
      let amountsD: number[] = [...schemaNutrition.amountsD];

      selected.map((s) => {
        if (s.category.type === CategoryType.PRODUCT) {
          arr1.push(s._id);
          amountsP.push(PRODUCT_AMOUNT);
        } else {
          arr2.push(s._id);
          amountsD.push(
            // @ts-ignore
            (s.amounts as number[]).reduce((acc, val) => acc + val, 0)
          );
        }
      });

      // @ts-ignore
      const cd = new Date(JSON.parse(schemaNutrition.date));

      const date = {
        year: cd.getFullYear(),
        month: cd.getMonth() + 1,
        day: cd.getDate(),
      };

      const obj = {
        ...schemaNutrition,
        date,
        data: {
          ...schemaNutrition.data,
          type: schemaNutrition.data.nType,
        },
        products: arr1,
        dishes: arr2,
        amountsP,
        amountsD,
      };

      try {
        await saveSchemaNutrition(obj);
      } catch (e) {
        console.log("e: ", e);
      }

      setLoading(false);
    } else {
      EventEmitter.notify("onAddProducts", [...productss, ...selected]);
    }
    navigation.goBack();
  };

  const saveSchemaNutrition = async (obj: SchemaNutrition1) => {
    if (user) {
      await ApiService.put(`/users/set-schema-nutrition/${user._id}`, obj);

      const res = await ApiService.get<Response<User>>("/users/me");

      dispatch(setUser(res.data));
    }
  };

  return {
    searchValue,
    setSearchValue,
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    loading,
    products: !!searchValue
      ? products.filter((e) => e.name.ru.indexOf(searchValue) !== -1)
      : products,
    selected,
    onSearch,
    onSelect,
    onAdd,
    language,
    categories,
  };
};
