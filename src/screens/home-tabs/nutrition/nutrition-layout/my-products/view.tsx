import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  ButtonPrimary,
  ButtonTabs,
  Icon,
  InputPrimary,
} from "../../../../../components/common";
import Modal from "./modal";
import { MyProductsHooks } from "./hooks";
import { styles } from "./style";
import EditModal from "./modalEdit";
import { COLORS } from "../../../../../constants/COLORS";
import { Assets } from "../../../../../utils/requireAssets";
import ButtonTabsMy from "../../../../../components/common/ButtonTabsMy";
import { addProduct } from "../../../../../store/slices/productSlice";

const MyProductsView = () => {
  const {
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
    setShowEdit,
    showEdit,
    onHideEdit,
    editId,
    setEditId,
    onEdit,
    navigateSearch,
    navigateUpdateDish,
  } = MyProductsHooks();
  console.log(name);

  return (
    <View style={styles.container}>
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
      {/* <InputPrimary
        value={search}
        onChange={(value) => setSearch(value)}
        placeholder={"Поиск"}
        placeholderColor={COLORS.WHITE}
        containerStyle={{
          backgroundColor: COLORS.GREY3,
          marginTop: 10,
          borderRadius: 10,
        }}
        inputStyle={{
          backgroundColor: COLORS.GREY3,
          color: COLORS.WHITE,
        }}
        onSearch={() => console.log("onSearch!!")}
      /> */}
      <View style={styles.scrollCont}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setActiveTab(null)}>
            <Text style={styles.greenText}>{"Мои блюда"}</Text>
            {activeTab === null && <View style={styles.greenLine} />}
          </TouchableOpacity>

          <ButtonTabsMy
            marginLeft={10}
            // @ts-ignore
            active={activeTab}
            setActive={setActiveTab}
            containerStyle={styles.tabCont}
            textStyle={{ backgroundColor: "aquamarine" }}
            titles={[...productCategories.map((a) => a.name[language])]}
          />
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === null && (
          <ButtonPrimary
            fill
            onPress={onCreate}
            style={styles.button}
            text="Сделать новое блюдо"
            textStyle={styles.buttonText}
          />
        )}
        {activeTab !== null && (
          <ButtonPrimary
            fill
            onPress={onShow}
            style={styles.btn}
            textStyle={styles.buttonText}
            text="Добавить свой продукт"
          />
        )}
        {products.map((a, i) => (
          <View style={styles.box} key={a._id}>
            <View style={styles.header}>
              <View>
                <Text style={styles.text1}>{a.name.ru}</Text>
                {activeTab !== null && (
                  <Text style={styles.text2}>{"на 100гр. продукта"}</Text>
                )}
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
                    if (activeTab === null) {
                      navigateUpdateDish(a);
                    } else {
                      setEditId(a._id);
                      setName(a.name[language]);
                      setCalories(String(a.calories));
                      setProtein(String(a.protein));
                      setOil(String(a.oil));
                      setCarb(String(a.carb));
                      setShowEdit(!showEdit);
                    }
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
        categories={productCategories}
        activeTab={activeTab}
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

      <Modal
        categories={productCategories}
        activeTab={activeTab}
        show={show}
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
        onHide={onHide}
        onPress={onPress}
        onAdd={onAdd}
      />
    </View>
  );
};

export default MyProductsView;
