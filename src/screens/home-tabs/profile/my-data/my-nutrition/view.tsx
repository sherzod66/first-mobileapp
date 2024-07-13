import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment";
import { CustomCalendar, ProductList } from "../../../../../components";
import { ButtonTabs } from "../../../../../components/common";

import { styles } from "./style";
import { MyNutritionHooks } from "./hooks";

const titles = [
  "Сегодня",
  "Вчера",
  "Текущая неделя",
  "Прошлая неделя",
  "Месяц",
];

const MyNutritionView = () => {
  const {
    currentDate,
    yesterday,
    calories,
    protein,
    oil,
    carb,
    activeWeekDay,
    weeklyData,
    monthlyData,
    activeTab,
    setActiveTab,
    products,
    setProducts,
    amounts,
    setAmounts,
    activeDay,
    setActiveDay,
    activeMonth,
    setActiveMonth,
    activeYear,
    setActiveYear,
    onSelectWeekDay,
    navigateAddProducts,
    onRecommendationPress,
  } = MyNutritionHooks();

  return (
    <View style={styles.container}>
      <View style={styles.scrollCont}>
        <ScrollView horizontal>
          <ButtonTabs
            secondary
            marginLeft={8}
            titles={titles}
            active={activeTab}
            setActive={setActiveTab}
            containerStyle={styles.tabsCont}
          />
        </ScrollView>
      </View>

      <ScrollView>
        {activeTab === 0 || activeTab === 1 ? (
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>
              {moment([currentDate, yesterday][activeTab]).format("DD.MM.YYYY")}
            </Text>
            {activeTab === 0 && (
              <TouchableOpacity
                onPress={onRecommendationPress}
                style={styles.recommendation}
              >
                <Text style={styles.recommendationText}>
                  {"Развёрнутые рекомендации"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        {activeTab === 2 || activeTab === 3 ? (
          <View style={styles.weekRow}>
            {weeklyData.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => onSelectWeekDay(i)}
                style={[
                  styles.weekItem,
                  i === activeWeekDay && styles.borderWhite,
                  item?.planned && styles.borderYellow,
                  i === activeWeekDay && item?.past && styles.borderNone,
                ]}
              >
                <Text
                  style={[
                    styles.weekText,
                    i === activeWeekDay && styles.textWhite,
                    item?.planned && styles.textYellow,
                  ]}
                >
                  {(item && item.day) || ""}
                </Text>
                <Text
                  style={[
                    [
                      styles.weekText,
                      styles.mt2,
                      i === activeWeekDay && styles.textWhite,
                      item?.planned && styles.textYellow,
                    ],
                  ]}
                >
                  {(item && item.text) || ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        {activeTab === 4 ? (
          <View style={styles.calendar}>
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
        ) : null}

        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Дефицитная норма Ккал"}</Text>
            <View style={styles.col2}>
              <Text style={styles.text}>{""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Б"}</Text>
            <View style={styles.col1}>
              <Text style={styles.text}>{""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Ж"}</Text>
            <View style={styles.col1}>
              <Text style={styles.text}>{""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"У"}</Text>
            <View style={styles.col1}>
              <Text style={styles.text}>{""}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row1}>
          <View style={styles.box}>
            <Text style={styles.rowTitle}>{"Фактические Ккал"}</Text>
            <View style={[styles.col2, styles.bgGrey]}>
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
            amounts={amounts}
            setAmounts={setAmounts}
            products={products}
            setProducts={setProducts}
            navigateAddProducts={navigateAddProducts}
            isDisabled={activeTab === 1 || activeTab === 3}
          />
        </View>

        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </View>
  );
};

export default MyNutritionView;
