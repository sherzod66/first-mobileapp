import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
  loading: boolean;
  value: string;
  setValue: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CustomModal = ({
  show,
  loading,
  value,
  setValue,
  onSave,
  onCancel,
}: IProps) => {
  return (
    <Modal
      style={styles.modal}
      onBackdropPress={onCancel}
      isVisible={!!Object.keys(show).length}
    >
      <View style={styles.modalBox}>
        <TouchableOpacity onPress={onCancel} style={styles.modalHeader}>
          <Icon
            width={15}
            height={14}
            tintColor={COLORS.RED}
            source={Assets.icons.close}
          />
        </TouchableOpacity>
        <Text style={styles.modalText}>{`Количество`}</Text>
        <InputPrimary
          value={value}
          disablePlaceholder
          inputStyle={styles.modalInput}
          containerStyle={styles.modalInputCont}
          onChange={(v) => setValue(normalizeOnlyNumbers(v).toString())}
        />
        <ButtonPrimary
          text="Ок"
          onPress={onSave}
          loading={loading}
          style={styles.modalBtn}
          loadingColor={COLORS.WHITE}
          textStyle={styles.modalBtnText}
        />
      </View>
    </Modal>
  );
};

export default CustomModal;
