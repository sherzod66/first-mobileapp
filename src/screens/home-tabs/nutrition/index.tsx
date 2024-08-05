import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NutritionLayout from "./nutrition-layout";
import CalcDailyNormScreen from "./calc-daily-norm";
import RecommendationScreen from "./recommendation";
import ConsumeCalendarScreen from "./consume-calendar";
import AddProductsScreen from "./add-products";
import AddOnlyProductsScreen from "./add-only-products";
import MeasurementsScreen from "./measurements";
import CreateDishScreen from "./create-dish";
import NutritionPlanScreen from "./nutrition-plan";
import CreateNutritionPlanScreen from "./create-nutrition-plan";
import AddPartPlanScreen from "./add-part-plan";
import AddReceptionScreen from "./add-reception";
import UpdatePartPlanScreen from "./update-part-plan";

import { NUTRITION } from "../../../navigation/ROUTES";
import {
  NutritionPlan,
  NUTRITION_TYPE,
  Product,
  Reception,
  SchemaNutrition,
} from "../../../types";
import CreateProductScreen from "./nutrition-layout/create-product";
import SearchScreen from "./nutrition-layout/search-products";
import SearchMyProductsScreen from "./nutrition-layout/search-my-products";
import AddProductsSearchScreen from "./add-products-search";
import { TRecommendationContent } from "./recommendation/hooks";
import AddOnlySearchScreen from "./add-only-search";
import UpdateDish from "./update-dish";

export type NutritionStackParamList = {
  [NUTRITION.NUTRITION_LAYOUT]: undefined;
  [NUTRITION.CREATE_PRODUCT]: undefined;
  [NUTRITION.CALC_DAILY_NORM]: {
    onSave: (val: string) => Promise<void>;
    tab: number;
  };
  [NUTRITION.RECOMMENDATION]: {
    value: keyof TRecommendationContent;
  };
  [NUTRITION.CONSUME_CALENDAR]: { tab: number };
  [NUTRITION.SEARCH_PRODUCT]: undefined;
  [NUTRITION.ADD_ONLY_SEARCH]: { products: Product[] };
  [NUTRITION.SEARCH_MY_PRODUCT]: undefined;
  [NUTRITION.ADD_PRODUCTS]: {
    products: Product[];
    schemaNutrition?: SchemaNutrition;
    activeType?: number;
    goBackNavigation: "CONSUME_CALENDAR" | "ADD_RECEPTION";
    index?: number;
    reception?: Reception | null;
  };
  [NUTRITION.ADD_PRODUCTS_SEARCH]: {
    products: Product[];
    schemaNutrition?: SchemaNutrition;
    activeType?: number;
    goBackNavigation: "CONSUME_CALENDAR" | "ADD_RECEPTION";
    index?: number;
    reception?: Reception | null;
  };
  [NUTRITION.ADD_ONLY_PRODUCTS]: {
    products: Product[];
  };
  [NUTRITION.MEASUREMENTS]: { tab: number };
  [NUTRITION.CREATE_DISH]: undefined;
  [NUTRITION.UPDATE_DISH]: { data: Product };
  [NUTRITION.NUTRITION_PLAN]: {
    plan: NutritionPlan;
  };
  [NUTRITION.CREATE_NUTRITION_PLAN]: {
    type: NUTRITION_TYPE;
  };
  [NUTRITION.ADD_PART_PLAN]: {
    index: number;
    topCalories: number;
    topProtein: number;
    topOil: number;
    topCarb: number;
    defaultReceptions: Reception[];
  };
  [NUTRITION.ADD_RECEPTION]: { index: number; reception: Reception | null };
  [NUTRITION.UPDATE_PART_PLAN]: {
    index: number;
    topCalories: number;
    topProtein: number;
    topOil: number;
    topCarb: number;
    receptions: Reception[];
  };
};

const Stack = createNativeStackNavigator<NutritionStackParamList>();

const NutritionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NUTRITION.NUTRITION_LAYOUT}
        component={NutritionLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.CALC_DAILY_NORM}
        component={CalcDailyNormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.RECOMMENDATION}
        component={RecommendationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.CONSUME_CALENDAR}
        component={ConsumeCalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.SEARCH_PRODUCT}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.SEARCH_MY_PRODUCT}
        component={SearchMyProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.ADD_PRODUCTS}
        component={AddProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.ADD_PRODUCTS_SEARCH}
        component={AddProductsSearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.ADD_ONLY_PRODUCTS}
        component={AddOnlyProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.ADD_ONLY_SEARCH}
        component={AddOnlySearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.MEASUREMENTS}
        component={MeasurementsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.CREATE_DISH}
        component={CreateDishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.UPDATE_DISH}
        component={UpdateDish}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.NUTRITION_PLAN}
        component={NutritionPlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.CREATE_NUTRITION_PLAN}
        component={CreateNutritionPlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.ADD_PART_PLAN}
        component={AddPartPlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.ADD_RECEPTION}
        component={AddReceptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.UPDATE_PART_PLAN}
        component={UpdatePartPlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NUTRITION.CREATE_PRODUCT}
        component={CreateProductScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NutritionStack;
