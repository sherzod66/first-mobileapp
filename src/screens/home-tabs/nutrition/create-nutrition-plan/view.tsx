import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import {
  ButtonPrimary,
  Controls,
  Header,
  InputPrimary,
} from "../../../../components/common";
import Modal from "./modal";
import { CreateNutritionHooks } from "./hooks";
import { styles } from "./style";
import Active_Button from "../../../../components/common/Active_Buutton";
import Active_ButtonMy from "../../../../components/common/Active_BuuttonMy";

const CreateNutritionView = () => {
  const {
    loading,
    creator,
    setCreator,
    title,
    setTitle,
    calories,
    setCalories,
    proteinPercent,
    setProteinPercent,
    protein,
    oilPercent,
    setOilPercent,
    oil,
    carbPercent,
    carb,
    description,
    setDescription,
    groupReceptions,
    show,
    setShow,
    isModalDisabled,
    onClose,
    onDec,
    onInc,
    onAddReceptions,
    onSave,
    isSuperAdmin,
    setToggle,
    toggle,
    price,
    setPrice,
    type,
    publicly,
    setPublic,
    isTrainer,
  } = CreateNutritionHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header title={"Создание своего плана"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.mt10}>
          <Text style={styles.inputTitle}>{"Имя составителя"}</Text>
          <InputPrimary
            value={creator}
            disablePlaceholder
            onChange={setCreator}
            inputStyle={styles.input}
            containerStyle={styles.inputCont}
          />
        </View> */}
        <View style={styles.mt10}>
          <Text style={styles.inputTitle}>{"Название плана питания"}</Text>
          <InputPrimary
            value={title}
            disablePlaceholder
            onChange={setTitle}
            inputStyle={styles.input}
            containerStyle={styles.inputCont}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.center}>
            <Text style={styles.inputTitle}>{"Ккал"}</Text>
            <TouchableOpacity
              style={styles.box1}
              onPress={() => setShow({ a: true })}
            >
              <Text style={styles.text}>{calories || ""}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.inputTitle}>{"Белки"}</Text>
            <TouchableOpacity
              style={styles.box2}
              onPress={() => setShow({ b: true })}
            >
              <View style={styles.col1}>
                {proteinPercent ? (
                  <Text style={styles.text}>{proteinPercent}</Text>
                ) : (
                  <View style={styles.colLine} />
                )}
              </View>
              <View style={styles.col2}>
                {protein ? (
                  <Text style={styles.text}>{protein}</Text>
                ) : (
                  <View style={styles.colLine} />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.inputTitle}>{"Жиры"}</Text>
            <TouchableOpacity
              style={styles.box2}
              onPress={() => setShow({ c: true })}
            >
              <View style={styles.col1}>
                {oilPercent ? (
                  <Text style={styles.text}>{oilPercent}</Text>
                ) : (
                  <View style={styles.colLine} />
                )}
              </View>
              <View style={styles.col2}>
                {oil ? (
                  <Text style={styles.text}>{oil}</Text>
                ) : (
                  <View style={styles.colLine} />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.inputTitle}>{"Углеводы"}</Text>
            <View style={styles.box2}>
              <View style={styles.col1}>
                <Text style={styles.text}>{carbPercent || ""}</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.text}>{carb || ""}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttons}>
          <Text style={styles.title}>{"Количество планов"}</Text>
          {groupReceptions.map((g, i) => (
            <ButtonPrimary
              fill
              key={i}
              onPress={() => onAddReceptions(i)}
              text={`План ${i + 1}`}
              textStyle={styles.text1}
              style={[styles[`${g.length ? "btn2" : "btn1"}`], styles.mt10]}
            />
          ))}
          <Controls
            text="План"
            style={styles.mt10}
            onDecrement={onDec}
            onIncrement={onInc}
          />
        </View>

        <View style={styles.description}>
          <Text style={styles.title}>{"Описание"}</Text>
          <InputPrimary
            multiline={true}
            disablePlaceholder
            value={description}
            onChange={(t) => setDescription(t)}
            inputStyle={styles.descInput}
            containerStyle={styles.descInputCont}
          />
        </View>
        {(isSuperAdmin || isTrainer) && (
          <>
            <Text style={styles.inputTopText}>
              {"Стоимость программы (В суммах)"}
            </Text>
            <InputPrimary
              value={price}
              onChange={(t) => setPrice(t)}
              placeholder=""
              containerStyle={styles.input}
              inputStyle={styles.inputInner}
            />
            <View style={styles.activeBox}>
              <Text style={styles.activeText}>Массанабор</Text>
              <Active_Button toggle={toggle} setToggle={setToggle} />
              <Text style={styles.activeText}>Жирожигание</Text>
            </View>
            <View style={styles.activeBox}>
              <Text style={styles.activeText}>Публично открытый</Text>
              <Active_ButtonMy toggle={publicly} setToggle={setPublic} />
              <Text style={styles.activeText}>Видно только мне</Text>
            </View>
          </>
        )}

        <ButtonPrimary
          fill
          onPress={onSave}
          loading={loading}
          style={styles.btn3}
          disabled={isModalDisabled}
          textStyle={styles.btn3Text}
          text="Сохранить в “ Мои планы “"
        />

        <View style={{ marginBottom: 100 }} />
      </ScrollView>

      <Modal
        show={show}
        onClose={onClose}
        calories={calories}
        setCalories={setCalories}
        proteinPercent={proteinPercent}
        setProteinPercent={setProteinPercent}
        protein={protein}
        oilPercent={oilPercent}
        setOilPercent={setOilPercent}
        oil={oil}
      />
    </View>
  );
};

export default CreateNutritionView;
