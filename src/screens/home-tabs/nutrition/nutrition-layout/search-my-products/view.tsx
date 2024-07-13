import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styles } from "./style";
import {
  ButtonPrimary,
  Header,
  InputPrimary,
} from "../../../../../components/common";
import { SearchHooks } from "./hooks";
import { COLORS } from "../../../../../constants/COLORS";
import EditModal from "../my-products/modalEdit";

const SearchMyProductsView = () => {
  const {
    loading,
    searchValue,
    setSearchValue,
    foundProduct,
    calories,
    carb,
    editId,
    name,
    oil,
    protein,
    setCalories,
    setCarb,
    setEditId,
    setName,
    setOil,
    setProtein,
    setShowEdit,
    showEdit,
    modalLoading,
    isModalBtnDisabled,
    onHideEdit,
    onPress,
    onRemove,
    setEditProductCategory,
    onEdit,
  } = SearchHooks();
  console.log(foundProduct);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header />
      <InputPrimary
        onChange={(v) => setSearchValue(v)}
        placeholder={"Поиск"}
        value={searchValue}
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
        {foundProduct.map((a, i) => (
          <View style={styles.box} key={i}>
            <View style={styles.header}>
              <View>
                <Text style={styles.text1}>{a.name.ru}</Text>
                <Text style={styles.text2}>{"на 100гр. продукта"}</Text>
              </View>
              <View>
                <ButtonPrimary
                  text="Удалить"
                  style={styles.deleteBtn}
                  textStyle={styles.deleteBtnText}
                  onPress={() => !loading && onRemove(a)}
                  loading={!!(loading && loading._id === a._id)}
                />
                <Text
                  onPress={() => {
                    setEditId(a._id);
                    setName(a.name.ru);
                    setCalories(String(a.calories));
                    setProtein(String(a.protein));
                    setOil(String(a.oil));
                    setCarb(String(a.carb));
                    setShowEdit(!showEdit);
                    setEditProductCategory(a.category._id);
                  }}
                  style={styles.editBtn}
                >
                  Изменить
                </Text>
              </View>
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
          </View>
        ))}

        <View style={{ marginBottom: 100 }} />
      </ScrollView>

      <EditModal
        categories={[]}
        activeTab={null}
        showEdit={showEdit}
        modalLoading={modalLoading}
        isModalBtnDisabled={isModalBtnDisabled}
        name={name}
        setName={setName}
        calories={calories}
        setCalories={setCalories}
        protein={protein}
        setProtein={setProtein}
        oil={oil}
        setOil={setOil}
        carb={carb}
        setCarb={setCarb}
        onHide={onHideEdit}
        onPress={onPress}
        onAdd={onEdit}
      />
    </View>
  );
};

export default SearchMyProductsView;
