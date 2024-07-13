import React from "react";
import { View, SafeAreaView } from "react-native";
import SchemaNutritionView from "./schema-nutrition";
import MyNutritionPlansView from "./my-nutrition-plans";
import MyProductsView from "./my-products";
import BaseProductsView from "./base-products";
import { ButtonTabs } from "../../../../components/common";
import { NutritionLayoutHooks } from "./hooks";
import { styles } from "./style";

const NutritionLayoutView = () => {
  const { activeTab, setActiveTab } = NutritionLayoutHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <ButtonTabs
        secondary
        active={activeTab}
        setActive={setActiveTab}
        titles={[
          "Схемы питания",
          "Мои планы",
          "Мои продукты",
          "База продуктов",
        ]}
        containerStyle={styles.btnCont}
        buttonStyle={styles.btn}
        textStyle={styles.btnText1}
        inActiveTextStyle={styles.btnText2}
      />

      <View style={styles.main}>
        {activeTab === 0 && <SchemaNutritionView />}
        {activeTab === 1 && <MyNutritionPlansView />}
        {activeTab === 2 && <MyProductsView />}
        {activeTab === 3 && <BaseProductsView />}
      </View>
    </View>
  );
};

export default NutritionLayoutView;
