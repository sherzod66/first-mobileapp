import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { ButtonPrimary } from "../../../../../components/common";
import { COLORS } from "../../../../../constants/COLORS";
import { styles } from "./style";

interface IProps {
  show: boolean;
  loading: boolean;
  onHide: () => void;
  onPress: () => void;
}

const CustomModal = ({ show, loading, onHide, onPress }: IProps) => {
  return (
    <Modal isVisible={show} style={styles.modal} onBackdropPress={onHide}>
      <View style={styles.modalBox}>
        <Text style={styles.modalTitle}>{"Выберите статус"}</Text>
        <View style={styles.modalRow}>
          <ButtonPrimary
            onPress={onHide}
            text="В процессе"
            style={styles.modalBtn1}
            textStyle={styles.modalBtnText1}
          />
          <ButtonPrimary
            text="Выполнено"
            loading={loading}
            onPress={onPress}
            style={styles.modalBtn2}
            loadingColor={COLORS.GREEN}
            textStyle={styles.modalBtnText2}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
