import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import {
  ButtonPrimary,
  Icon,
  InputPrimary,
} from "../../../../../components/common";
import { CustomCalendar } from "../../../../../components";
import {
  CalendarItem,
  IActiveDayProps,
} from "../../../../../components/CustomCalendar";
import { Assets } from "../../../../../utils/requireAssets";
import { styles } from "./style";
import { COLORS } from "../../../../../constants/COLORS";

interface IProps {
  show: any;
  modalLoading: boolean;
  monthlyData: CalendarItem[][];
  modalValue: string;
  setModalValue: (v: string) => void;
  activeDay: IActiveDayProps | null;
  setActiveDay: (v: IActiveDayProps | null) => void;
  activeMonth: number;
  setActiveMonth: (v: number) => void;
  activeYear: number;
  setActiveYear: (v: number) => void;
  onAddCol: () => void;
  onSetValue: () => void;
  onSetDateValue: () => void;
  onRemoveRow: () => void;
  onClose: () => void;
}

const CustomModal = ({
  show,
  modalLoading,
  modalValue,
  monthlyData,
  setModalValue,
  activeDay,
  setActiveDay,
  activeMonth,
  setActiveMonth,
  activeYear,
  setActiveYear,
  onAddCol,
  onSetValue,
  onSetDateValue,
  onRemoveRow,
  onClose,
}: IProps) => {
  return (
    <Modal
      style={styles.modal}
      onBackdropPress={onClose}
      isVisible={!!Object.keys(show).length}
    >
      {show.a || show.b ? (
        <View style={styles.modalBox}>
          <TouchableOpacity onPress={onClose} style={styles.modalHeader}>
            <Icon
              width={14}
              height={14}
              tintColor={COLORS.RED}
              source={Assets.icons.close}
            />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            {show.a ? "Часть тела" : `Значение ${show.key}`}
          </Text>
          <InputPrimary
            value={modalValue}
            disablePlaceholder
            onChange={setModalValue}
            inputStyle={styles.modalInput}
            containerStyle={styles.modalInputCont}
          />
          <ButtonPrimary
            text="Ок"
            loading={modalLoading}
            loadingColor={COLORS.WHITE}
            style={styles.modalBtn}
            textStyle={styles.modalBtnText}
            onPress={show.a ? onAddCol : onSetValue}
            disabled={show.a && modalValue.length === 0}
          />
        </View>
      ) : show.c ? (
        <View style={styles.modalBox}>
          <TouchableOpacity onPress={onClose} style={styles.modalHeader}>
            <Icon
              width={14}
              height={14}
              tintColor={COLORS.RED}
              source={Assets.icons.close}
            />
          </TouchableOpacity>
          <Text style={styles.modalText}>{"Выберите дату"}</Text>
          <View style={styles.modalCalendar}>
            <CustomCalendar
              data={monthlyData}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
              activeMonth={activeMonth}
              setActiveMonth={setActiveMonth}
              activeYear={activeYear}
              setActiveYear={setActiveYear}
            />
          </View>
          <ButtonPrimary
            text="Сохранить"
            loading={modalLoading}
            style={styles.modalBtn}
            onPress={onSetDateValue}
            loadingColor={COLORS.WHITE}
            textStyle={styles.modalBtnText}
          />
        </View>
      ) : (
        <View style={styles.modalBox1}>
          <Text style={styles.modalText1}>
            {"Вы действительно хотите удалить строку"}
          </Text>
          <View style={styles.modalBtnRow}>
            <ButtonPrimary
              text="Да"
              onPress={onRemoveRow}
              loading={modalLoading}
              style={styles.modalBtn1}
              loadingColor={COLORS.WHITE}
              textStyle={styles.modalText2}
            />
            <ButtonPrimary
              text="Нет"
              onPress={onClose}
              style={styles.modalBtn1}
              textStyle={styles.modalText2}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;
