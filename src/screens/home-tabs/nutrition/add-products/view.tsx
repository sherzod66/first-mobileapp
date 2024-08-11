import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ButtonPrimary,
  ButtonTabs,
  Header,
  Icon,
  InputPrimary,
} from "../../../../components/common";
import { PRODUCT_AMOUNT } from "../../../../constants/AMOUNT";
import { COLORS } from "../../../../constants/COLORS";
import { Dish } from "../../../../types";
import { getSumValues } from "../../../../utils/getSumValues";
import { AddProductsHooks } from "./hooks";
import { styles } from "./style";
import { Assets } from "../../../../utils/requireAssets";
import ButtonTabsMy from "../../../../components/common/ButtonTabsMy";

const navAll = ["База продуктов", "Мои продукты", "Мои блюда"];
const navMin = ["База продуктов"];

const AddProductsView = () => {
  const {
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    loading,
    products,
    selected,
    onSearch,
    onCreate,
    onSelect,
    onAdd,
    language,
    categories,
    navigateSearch,
    goBackNavigation,
  } = AddProductsHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header />

      <TouchableOpacity onPress={navigateSearch} style={styles.containerMy}>
        <ButtonPrimary
          style={{
            padding: 0,
            backgroundColor: "transparent",
          }}
          icon={<Icon source={Assets.icons.search} />}
        />
        <Text style={styles.textMy}>Поиск</Text>
      </TouchableOpacity>

      <ButtonTabs
        secondary
        active={activeTab}
        setActive={setActiveTab}
        containerStyle={styles.tab1Cont}
        titles={goBackNavigation === "ADD_RECEPTION" ? navMin : navAll}
      />

      <View style={styles.scrollCont}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ButtonTabsMy
            marginLeft={15}
            active={activeCategory}
            setActive={setActiveCategory}
            containerStyle={styles.tab2Cont}
            titles={[...categories.map((a) => a.name[language])]}
          />
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {!activeTab && (
          <ButtonPrimary
            fill
            onPress={onCreate}
            style={styles.button}
            text="Сделать новое блюдо"
            textStyle={styles.buttonText}
          />
        )} */}

        {products.map((p, pI) => {
          let amount = 0;
          let name = p.name[language];
          let protein = p.protein;
          let oil = p.oil;
          let carb = p.carb;
          let calories = p.calories;

          if (p.category?.type === "PRODUCT") {
            amount = PRODUCT_AMOUNT;
          } else {
            // @ts-ignore
            const dish: Dish = { ...p };

            amount = dish.amounts.reduce((acc, val) => acc + val);
            protein = getSumValues(dish.products, dish.amounts, "protein");
            oil = getSumValues(dish.products, dish.amounts, "oil");
            carb = getSumValues(dish.products, dish.amounts, "carb");
            calories = getSumValues(dish.products, dish.amounts, "calories");
          }

          return (
            <View style={styles.box} key={`${p._id}/${pI}`}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.text1}>{name}</Text>
                  <Text style={styles.text2}>{`на ${amount}гр. продукта`}</Text>
                </View>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => onSelect(p)}
                >
                  {selected.find((s) => s._id === p._id) && (
                    <View style={styles.checkboxFilled} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.main}>
                <View>
                  <Text style={styles.text3}>
                    {"Б - "}
                    <Text style={styles.text4}>{`${protein} гр`}</Text>
                  </Text>
                  <Text style={styles.text3}>
                    {"Ж - "}
                    <Text style={styles.text4}>{`${oil} гр`}</Text>
                  </Text>
                  <Text style={styles.text3}>
                    {"У - "}
                    <Text style={styles.text4}>{`${carb} гр`}</Text>
                  </Text>
                </View>
                <Text style={styles.text5}>{`${calories} каллорий`}</Text>
              </View>
            </View>
          );
        })}
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
      {selected.length > 0 && (
        <ButtonPrimary
          fill
          text="Добавить"
          onPress={onAdd}
          loading={loading}
          style={styles.btn}
          textStyle={styles.btnText}
          loadingColor={COLORS.WHITE}
          disabled={!selected.length}
        />
      )}
    </View>
  );
};

export default AddProductsView;
