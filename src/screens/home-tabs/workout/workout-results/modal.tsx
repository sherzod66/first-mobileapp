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
  show: boolean;
  loading: boolean;
  modalError: string;
  weight: string;
  setWeight: (s: string) => void;
  repeat: string;
  setRepeat: (s: string) => void;
  onHide: () => void;
  onSubmit: () => void;
}

const CustomModal = ({
  show,
  loading,
  modalError,
  weight,
  setWeight,
  repeat,
  setRepeat,
  onHide,
  onSubmit,
}: IProps) => {
  return (
    <Modal isVisible={show} style={styles.modal}>
      <View style={styles.modalBox}>
        <View style={{ alignSelf: "flex-end" }}>
          <TouchableOpacity onPress={onHide}>
            <Icon
              width={14}
              height={14}
              tintColor={COLORS.RED}
              source={Assets.icons.close}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalMain}>
          <View style={styles.modalLeft}>
            <Text style={styles.modalTitle}>{"Вес"}</Text>
            <InputPrimary
              value={weight}
              onChange={(s) => setWeight(s)}
              disablePlaceholder
              inputStyle={styles.modalInput}
              keyboardType="phone-pad"
              containerStyle={styles.modalInputCont}
            />
          </View>
          <View style={styles.modalRight}>
            <Text style={styles.modalTitle}>{"Повтор"}</Text>
            <InputPrimary
              value={repeat}
              onChange={(s) => setRepeat(s)}
              disablePlaceholder
              inputStyle={styles.modalInput}
              keyboardType="phone-pad"
              containerStyle={styles.modalInputCont}
            />
          </View>
        </View>
        {!!modalError && <Text style={styles.modalError}>{modalError}</Text>}
        <View style={{ marginTop: 20 }}>
          <ButtonPrimary
            text="Ок"
            loading={loading}
            onPress={onSubmit}
            loadingColor={COLORS.WHITE}
            style={styles.modalBtn}
            textStyle={styles.modalBtnText}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
