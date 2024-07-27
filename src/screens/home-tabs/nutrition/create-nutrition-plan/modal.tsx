import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import {
  ButtonPrimary,
  Icon,
  InputPrimary,
} from "../../../../components/common";
import { COLORS } from "../../../../constants/COLORS";
import { normalizeOnlyNumbers } from "../../../../utils/normalizeOnlyNumbers";
import { Assets } from "../../../../utils/requireAssets";
import { styles } from "./style";

interface IProps {
  show: any;
  calories: number;
  setCalories: (c: number) => void;
  proteinPercent: number;
  setProteinPercent: (p: number) => void;
  protein: number;
  oilPercent: number;
  setOilPercent: (p: number) => void;
  oil: number;
  onClose: (p?: any) => void;
}

const CustomModal = ({
  show,
  calories,
  setCalories,
  proteinPercent,
  setProteinPercent,
  protein,
  oilPercent,
  setOilPercent,
  oil,
  onClose,
}: IProps) => {
  let value: any;
  let value1: any;
  let setValue: (t: string) => void = () => {};

  if (show.b) {
    value = proteinPercent ? proteinPercent.toString() : "";
    value1 = protein || "";
    setValue = (p: string) => {
      setProteinPercent(normalizeOnlyNumbers(p));
    };
  }

  if (show.c) {
    value = oilPercent ? oilPercent.toString() : "";
    value1 = oil || "";
    setValue = (p: string) => {
      setOilPercent(normalizeOnlyNumbers(p));
    };
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={!!Object.keys(show).length}
      onBackdropPress={() => onClose(Object.keys(show)[0])}
    >
      {show.a ? (
        <View style={styles.modalBox1}>
          <View style={styles.modalHeader1}>
            <View style={styles.modalTitleBox}>
              <Text style={styles.btn3Text}>
                {"От заданного кол-ва калорий будут высчитаваться БЖУ"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => onClose(Object.keys(show)[0])}>
              <Icon
                width={17}
                height={17}
                tintColor={COLORS.RED}
                source={Assets.icons.close}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalRow1}>
            <InputPrimary
              disablePlaceholder
              containerStyle={styles.modalInputCont1}
              value={calories ? calories.toString() : ""}
              inputStyle={[styles.modalInput1, styles.modalText]}
              keyboardType="number-pad"
              onChange={(c) => setCalories(normalizeOnlyNumbers(c))}
            />
            <ButtonPrimary
              text="Ок"
              onPress={onClose}
              style={styles.modalBtn1}
              textStyle={styles.modalBtnText1}
            />
          </View>
        </View>
      ) : (
        <View style={styles.modalBox2}>
          <View style={styles.modalHeader2}>
            <TouchableOpacity onPress={() => onClose(Object.keys(show)[0])}>
              <Icon
                width={14}
                height={14}
                tintColor={COLORS.RED}
                source={Assets.icons.close}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalRow2}>
            <View style={styles.modalCol}>
              <Text style={styles.modalText}>{"%"}</Text>
              <InputPrimary
                disablePlaceholder
                containerStyle={styles.modalInputCont2}
                inputStyle={[styles.modalInput2, styles.modalText]}
                value={value}
                keyboardType="number-pad"
                onChange={setValue}
              />
            </View>
            <View style={styles.modalCol}>
              <Text style={styles.modalText}>{"гр"}</Text>
              <View style={styles.modalInputCont3}>
                <Text style={styles.modalText}>{value1}</Text>
              </View>
            </View>
          </View>
          <View style={styles.center}>
            <ButtonPrimary
              text="Ок"
              onPress={onClose}
              style={styles.modalBtn2}
              textStyle={styles.modalBtnText2}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;
