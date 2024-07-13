import { View, Text, ScrollView } from "react-native";
import { CustomCalendar, ProductList } from "../../../../../components";
import Modal from "./nmodal";
import { MyNutritionHooks } from "./nhooks";
import { styles } from "./nstyle";

const MyNutritionView = ({ apprenticeId = "" }) => {
  const {
    show,
    loading,
    modalLoading,
    monthlyData,
    activeTog,
    activeCalories,
    activeProtein,
    activeOil,
    activeCarb,
    calories,
    protein,
    oil,
    carb,
    products,
    amounts,
    activeDay,
    setActiveDay,
    activeMonth,
    setActiveMonth,
    activeYear,
    setActiveYear,
    modalValue,
    setModalValue,
    onShow,
    onCancel,
    onSave,
    onRemove,
    onRemoveByIndex,
    navigateAddProducts,
  } = MyNutritionHooks(apprenticeId);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.mh20, styles.mt7]}>
          <CustomCalendar
            special
            data={monthlyData}
            activeDay={activeDay}
            activeMonth={activeMonth}
            activeYear={activeYear}
            setActiveDay={setActiveDay}
            setActiveMonth={setActiveMonth}
            setActiveYear={setActiveYear}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>
              {`${activeTog ? "Профицитная" : "Дефицитная"} норма Ккал`}
            </Text>
            <View style={styles.col3}>
              <Text style={styles.text}>{activeCalories || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Б"}</Text>
            <View style={styles.col1}>
              <Text style={styles.text}>{activeProtein || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Ж"}</Text>
            <View style={styles.col1}>
              <Text style={styles.text}>{activeOil || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"У"}</Text>
            <View style={styles.col1}>
              <Text style={styles.text}>{activeCarb || ""}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row1}>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Фактические Ккал"}</Text>
            <View style={[styles.col3, styles.bgGrey]}>
              <Text style={styles.text}>{calories || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Б"}</Text>
            <View style={[styles.col1, styles.bgGrey]}>
              <Text style={styles.text}>{protein || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Ж"}</Text>
            <View style={[styles.col1, styles.bgGrey]}>
              <Text style={styles.text}>{oil || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"У"}</Text>
            <View style={[styles.col1, styles.bgGrey]}>
              <Text style={styles.text}>{carb || ""}</Text>
            </View>
          </View>
        </View>

        <View style={styles.mh20}>
          <ProductList
            title={"Добавить продукт"}
            loading={loading}
            amounts={amounts}
            products={products}
            onShow={onShow}
            onRemove={onRemove}
            onRemoveByIndex={onRemoveByIndex}
            navigateAddProducts={navigateAddProducts}
          />
        </View>

        <View style={{ marginBottom: 100 }} />
      </ScrollView>

      <Modal
        show={show}
        loading={modalLoading}
        value={modalValue}
        setValue={setModalValue}
        onCancel={onCancel}
        onSave={onSave}
      />
    </View>
  );
};

export default MyNutritionView;
