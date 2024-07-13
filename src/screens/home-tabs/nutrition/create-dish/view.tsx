import { View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  ButtonPrimary,
  ButtonTabs,
  Header,
  InputPrimary,
} from "../../../../components/common";
import { ProductList } from "../../../../components";
import Modal from "./modal";
import { CreateDishHooks } from "./hooks";
import { styles } from "./style";

const CreateDishView = () => {
  const {
    categories,
    show,
    loading,
    language,
    calories,
    protein,
    oil,
    carb,
    products,
    amounts,
    name,
    setName,
    activeIndex,
    setActiveIndex,
    modalValue,
    setModalValue,
    onSubmit,
    onShow,
    onCancel,
    onSaveAmount,
    onRemove,
    onRemoveByIndex,
    navigateAddProducts,
  } = CreateDishHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header />

      <Text style={styles.miniTitle}>{"Название блюда"}</Text>
      <InputPrimary
        value={name}
        onChange={setName}
        inputStyle={styles.input}
        placeholder="----------"
        containerStyle={styles.inputCont}
      />

      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.rowTitle}>{"Ккал"}</Text>
          <View style={styles.col3}>
            <Text style={styles.input}>
              {Math.round(calories * 10) / 10 || ""}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.rowTitle}>{"Б"}</Text>
          <View style={styles.col1}>
            <Text style={styles.input}>
              {Math.round(protein * 10) / 10 || ""}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.rowTitle}>{"Ж"}</Text>
          <View style={styles.col1}>
            <Text style={styles.input}>{Math.round(oil * 10) / 10 || ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.rowTitle}>{"У"}</Text>
          <View style={styles.col1}>
            <Text style={styles.input}>
              {Math.round(carb * 10) / 100 || ""}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductList
          title="Добавить продукт"
          amounts={amounts}
          products={products}
          style={{ marginTop: 25 }}
          onShow={onShow}
          onRemove={onRemove}
          onRemoveByIndex={onRemoveByIndex}
          navigateAddProducts={navigateAddProducts}
        />

        <View style={styles.scrollCont}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ButtonTabs
              marginLeft={15}
              active={activeIndex}
              setActive={setActiveIndex}
              containerStyle={styles.tabCont}
              titles={[...categories.map((a) => a.name[language])]}
            />
          </ScrollView>
        </View>

        <ButtonPrimary
          fill
          loading={loading}
          onPress={onSubmit}
          style={styles.btn}
          textStyle={styles.btnText}
          text="Добавить в “ Мои блюда “"
          disabled={!(name && products.length)}
        />

        <View style={{ marginBottom: 100 }} />
      </ScrollView>

      <Modal
        show={show}
        value={modalValue}
        setValue={setModalValue}
        onCancel={onCancel}
        onSave={onSaveAmount}
      />
    </View>
  );
};

export default CreateDishView;
