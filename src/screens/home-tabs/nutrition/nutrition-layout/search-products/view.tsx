import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import {
  ButtonPrimary,
  Header,
  InputPrimary,
} from "../../../../../components/common";
import { SearchHooks } from "./hooks";
import { COLORS } from "../../../../../constants/COLORS";

const SearchProductsView = () => {
  const {
    searchState,
    setSearchState,
    onSearch,
    setOnSearch,
    allProducts,
    searchProduct,
    findProduct,
    onSelect,
    selected,
    loading,
    onAdd,
  } = SearchHooks();
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header />
      <InputPrimary
        onChange={(v) => searchProduct(v)}
        placeholder={"Поиск"}
        placeholderColor={COLORS.WHITE}
        containerStyle={{
          backgroundColor: COLORS.GREY3,
          marginTop: 0,
          borderRadius: 10,
        }}
        autoFocus={true}
        inputStyle={{
          backgroundColor: COLORS.GREY3,
          color: COLORS.WHITE,
        }}
        onSearch={() => console.log("")}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {findProduct.length > 0 ? (
          findProduct.map((a, i) => (
            <View style={styles.box} key={i}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.text1}>{a.name.ru}</Text>
                  <Text style={styles.text2}>{"на 100гр. продукта"}</Text>
                </View>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => onSelect(a)}
                >
                  {selected.find((s) => s._id === a._id) && (
                    <View style={styles.checkboxFilled} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.main}>
                <View>
                  <Text style={styles.text3}>
                    {"Б - "}
                    <Text style={styles.text4}>{`${a.protein} гр`}</Text>
                  </Text>
                  <Text style={styles.text3}>
                    {"Ж - "}
                    <Text style={styles.text4}>{`${a.oil} гр`}</Text>
                  </Text>
                  <Text style={styles.text3}>
                    {"У - "}
                    <Text style={styles.text4}>{`${a.carb} гр`}</Text>
                  </Text>
                </View>
                <Text style={styles.text5}>{`${a.calories} каллорий`}</Text>
              </View>
              {/* <TouchableOpacity
              onPress={() => onDeletePress(a)}
              style={styles.row}
            >
              <Text style={styles.text5}>Удалить</Text>
            </TouchableOpacity> */}
            </View>
          ))
        ) : (
          <Text>Найдите нужный продукт</Text>
        )}
        <View style={{ marginBottom: 200 }} />
      </ScrollView>
      <View style={styles.createButtonContainer}>
        {selected.length > 0 && (
          <ButtonPrimary
            fill
            onPress={onAdd}
            loading={loading}
            style={styles.btn}
            textStyle={styles.btnText}
            disabled={!!!selected.length}
            text="Добавить в “ Мои продукты “"
          />
        )}
      </View>
    </View>
  );
};

export default SearchProductsView;
