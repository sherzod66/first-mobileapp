import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { CreateProductHook } from "./hooks";
import { styles } from "./style";
import {
  ButtonSecondary,
  Header,
  InputPrimary,
} from "../../../../../components/common";
import SelectPrimary from "../../../../../components/common/SelectPrimary";
import { Assets } from "../../../../../utils/requireAssets";

const CreateProductView = () => {
  const {
    onChange,
    categories,
    categoryModalVisible,
    onModalToggle,
    onCategoryChange,
    onCategorySubmit,
    onExerciseSubmit,
    onCategoryRemove,
    product,
    closeUpdateCategory,
    openUpdateCategory,
    updateCategoryValue,
    updateLoading,
    updateCategory,
    setUpdateCategoryValue,
    categoryProductUpdateSubmit,
  } = CreateProductHook();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Создание продукта" />
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.categoryContainer}>
          <View style={{ flex: 1, marginBottom: 10 }}>
            <SelectPrimary
              hasRemove
              title="Категория"
              data={categories.map((e) => ({ label: e.name.ru, value: e._id }))}
              onChange={onChange("category")}
              onRemove={onCategoryRemove}
              isUpdate={openUpdateCategory}
            >
              <TouchableOpacity
                onPress={onModalToggle}
                style={styles.plusContainer}
              >
                <Image source={Assets.icons.close} style={styles.plusIcon} />
              </TouchableOpacity>
            </SelectPrimary>
          </View>
        </View>
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Название(RU)
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("name.ru")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Название(UZ)
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("name.uz")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Название(EN)
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("name.en")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Каллории</Text>
        <Text style={styles.inputContMy}>
          {product?.calories ? product.calories : 0}
        </Text>
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Белки</Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          keyboardType="number-pad"
          onChange={onChange("protein")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Жиры</Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          keyboardType="number-pad"
          onChange={onChange("oil")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Углеводы</Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          keyboardType="number-pad"
          onChange={onChange("carb")}
        />

        <ButtonSecondary
          containerStyle={{
            width: "100%",
            marginVertical: 20,
            paddingVertical: 15,
          }}
          text="Создать"
          onPress={onExerciseSubmit}
        />
      </ScrollView>
      <ReactNativeModal
        isVisible={categoryModalVisible}
        onDismiss={onModalToggle}
        onBackButtonPress={onModalToggle}
        onBackdropPress={onModalToggle}
      >
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle]}>Добавление категории</Text>
          <Text style={{ color: "white", marginBottom: 30 }}>
            Для добавления под-категории, выберите основную категорию нажав на
            окно "Категория" внизу. Для добавления категории, введите названия
            категории,игнорируя окно "Категория"
          </Text>
          <SelectPrimary
            title="Категория"
            data={
              categories.map((e) => ({ label: e.name.ru, value: e._id })) || []
            }
            onChange={onCategoryChange("parent")}
          />
          <Text style={[styles.textOne, { marginVertical: 10 }]}>
            Название(RU)
          </Text>
          <InputPrimary
            disablePlaceholder
            inputStyle={styles.input}
            containerStyle={styles.inputCont}
            onChange={onCategoryChange("name.ru")}
          />
          <Text style={[styles.textOne, { marginVertical: 10 }]}>
            Название(UZ)
          </Text>
          <InputPrimary
            disablePlaceholder
            inputStyle={styles.input}
            containerStyle={styles.inputCont}
            onChange={onCategoryChange("name.uz")}
          />
          <Text style={[styles.textOne, { marginVertical: 10 }]}>
            Название(EN)
          </Text>
          <InputPrimary
            disablePlaceholder
            inputStyle={styles.input}
            containerStyle={styles.inputCont}
            onChange={onCategoryChange("name.en")}
          />
          <ButtonSecondary
            containerStyle={{
              width: "100%",
              marginVertical: 20,
              paddingVertical: 15,
            }}
            text="Создать"
            onPress={onCategorySubmit}
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={updateCategory.isOpen}
        onDismiss={closeUpdateCategory}
        onBackButtonPress={closeUpdateCategory}
        onBackdropPress={closeUpdateCategory}
      >
        {updateCategoryValue && (
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitle]}>Редактировать</Text>
            <Text style={[styles.textOne, { marginVertical: 10 }]}>
              Название(RU)
            </Text>
            <InputPrimary
              disablePlaceholder
              inputStyle={styles.input}
              value={updateCategoryValue.ru}
              containerStyle={styles.inputCont}
              onChange={(v) =>
                setUpdateCategoryValue((prev) => ({ ...prev, ru: v }))
              }
            />
            <Text style={[styles.textOne, { marginVertical: 10 }]}>
              Название(UZ)
            </Text>
            <InputPrimary
              disablePlaceholder
              inputStyle={styles.input}
              containerStyle={styles.inputCont}
              value={updateCategoryValue.uz}
              onChange={(v) =>
                setUpdateCategoryValue((prev) => ({ ...prev, uz: v }))
              }
            />
            <Text style={[styles.textOne, { marginVertical: 10 }]}>
              Название(EN)
            </Text>
            <InputPrimary
              disablePlaceholder
              inputStyle={styles.input}
              containerStyle={styles.inputCont}
              value={updateCategoryValue.en}
              onChange={(v) =>
                setUpdateCategoryValue((prev) => ({ ...prev, en: v }))
              }
            />
            <ButtonSecondary
              loading={updateLoading}
              disabled={updateLoading}
              containerStyle={{
                width: "100%",
                marginVertical: 20,
                paddingVertical: 15,
              }}
              text="Редактировать"
              onPress={categoryProductUpdateSubmit}
            />
          </View>
        )}
      </ReactNativeModal>
    </View>
  );
};

export default CreateProductView;

