import { View, SafeAreaView, ScrollView } from "react-native";
import { MeasurementBox } from "../../../../../components";
import { ButtonPrimary, Header } from "../../../../../components/common";
import { COLORS } from "../../../../../constants/COLORS";
import { MeasurementsHooks } from "./hooks";
import Modal from "./modal";
import { styles } from "./style";
import ReactNativeModal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";

const MyMeasurementsView = ({ apprenticeId = "" }) => {
  const {
    measurements,
    modalLoading,
    loading,
    monthlyData,
    modalValue,
    setModalValue,
    show,
    setShow,
    activeDay,
    setActiveDay,
    activeMonth,
    setActiveMonth,
    activeYear,
    setActiveYear,
    onAddCol,
    onSet,
    onSetValue,
    onSetDate,
    onSetDateValue,
    onAddRow,
    onRemoveRow,
    onRemind,
    onClose,
    date,
    setDate,
    pickerState,
    setPickerState,
    user,
  } = MeasurementsHooks(apprenticeId);

  return (
    <View style={styles.container}>
      <ScrollView>
        <MeasurementBox
          onSet={onSet}
          onSetDate={onSetDate}
          myMeasurements={measurements ?? []}
          onAdd={() => setShow({ a: true })}
        />

        {!!(measurements ?? []).length && (
          <View style={styles.row}>
            <ButtonPrimary
              onPress={onRemind}
              style={styles.noneBtn}
              textStyle={styles.redText}
              text="Напомнить о следующем замере"
            />
            {(measurements ?? []).length > 1 && (
              <ButtonPrimary
                text="Удалить строку"
                style={styles.noneBtn}
                textStyle={styles.text}
                onPress={() => setShow({ d: true })}
              />
            )}
          </View>
        )}
        {user?.role !== "TRAINER" && (
          <ButtonPrimary
            fill
            loading={loading}
            onPress={onAddRow}
            style={styles.btn}
            text="Добавить строку"
            textStyle={styles.btnText}
            loadingColor={COLORS.WHITE}
          />
        )}

        <View style={{ marginBottom: 100 }} />
      </ScrollView>

      <Modal
        show={show}
        monthlyData={monthlyData}
        modalLoading={modalLoading}
        modalValue={modalValue}
        setModalValue={setModalValue}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        onAddCol={onAddCol}
        onSetValue={onSetValue}
        onSetDateValue={onSetDateValue}
        onRemoveRow={onRemoveRow}
        onClose={onClose}
      />
      {/* <ReactNativeModal>
      </ReactNativeModal> */}
      {!!pickerState && (
        <DateTimePicker
          mode={pickerState}
          value={date}
          onChange={(e) => {
            setPickerState(pickerState === "time" ? "date" : null);
            setDate(new Date(e.nativeEvent.timestamp));
          }}
        />
      )}
    </View>
  );
};

export default MyMeasurementsView;
