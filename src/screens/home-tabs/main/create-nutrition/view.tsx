import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import {
  ButtonSecondary,
  Header,
  InputPrimary,
} from "../../../../components/common";
import SelectPrimary from "../../../../components/common/SelectPrimary";
import { Assets } from "../../../../utils/requireAssets";
import { CreateExerciseHook } from "./hooks";
import { styles } from "./style";

const CreateNutrition = () => {
  const {
    onChange,
    subcategories,
    categories,
    categoryModalVisible,
    onModalToggle,
    onCategoryChange,
    onCategorySubmit,
    onExerciseSubmit,
    onCategoryRemove,
  } = CreateExerciseHook();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Создание плана" />
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
        {!!subcategories && (
          <SelectPrimary
            title="Подкатегория"
            data={
              subcategories?.map((e) => ({ label: e.name.ru, value: e._id })) ||
              []
            }
            onChange={onChange("category")}
          />
        )}
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Название </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("title")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Описание</Text>
        <InputPrimary
          multiline={true}
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("description")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Описание(Meta)
        </Text>
        <InputPrimary
          multiline={true}
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("metadescription")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Ссылка на изображение
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("image")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Ссылка на видео
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("video")}
        />
        <ButtonSecondary
          containerStyle={{
            width: "100%",
            marginVertical: 20,
            paddingVertical: 15,
          }}
          text="Save"
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
            text="Save"
            onPress={onCategorySubmit}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default CreateNutrition;
