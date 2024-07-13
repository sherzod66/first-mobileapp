import { View, Text, TextInput } from "react-native";
import Modal from "react-native-modal";
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
} from "../../../../../components/common";
import { COLORS } from "../../../../../constants/COLORS";
import { useRedux } from "../../../../../store/hooks";
import { selectLanguage } from "../../../../../store/slices/appSlice";
import { Category } from "../../../../../types";
import { normalizeOnlyNumbers } from "../../../../../utils/normalizeOnlyNumbers";
import { styles } from "./style";
import { countCalories } from "../../../../../utils/countCalories";
import { useEffect } from "react";

interface IProps {
  categories: Category[];
  activeTab: number | null;
  show: any;
  modalLoading: boolean;
  isModalBtnDisabled: boolean;
  name: string;
  setName: (s: string) => void;
  calories: string;
  setCalories: (s: string) => void;
  protein: string;
  setProtein: (s: string) => void;
  oil: string;
  setOil: (s: string) => void;
  carb: string;
  setCarb: (s: string) => void;
  onHide: () => void;
  onPress: () => void;
  onAdd: () => void;
}

const CustomModal = ({
  categories,
  activeTab,
  show,
  modalLoading,
  isModalBtnDisabled,
  name,
  setName,
  calories,
  setCalories,
  protein,
  setProtein,
  oil,
  setOil,
  carb,
  setCarb,
  onHide,
  onPress,
  onAdd,
}: IProps) => {
  const [language] = useRedux(selectLanguage);
  useEffect(() => {
    setCalories(String(countCalories(protein, oil, carb)));
  }, [protein, oil, carb]);
  return (
    <Modal isVisible={show} style={styles.modal} onBackdropPress={onHide}>
      <View style={styles.modalBox}>
        <Text style={styles.modalTitle}>{"Добавить свой продукт"}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.modalText}>{"Название продукта"}</Text>
          <InputPrimary
            value={name}
            disablePlaceholder
            onChange={(t) => setName(t)}
            inputStyle={styles.modalInput}
            containerStyle={styles.modalInputCont}
          />
        </View>
        <View style={styles.modalInputCol}>
          <Text style={styles.modalText33}>{"Ккал"}</Text>
          <Text style={styles.modalTextCont}>{calories}</Text>
        </View>
        <View style={styles.modalInputRow}>
          <View style={styles.modalInputCol}>
            <Text style={styles.modalText}>{"Б"}</Text>
            <InputPrimary
              value={protein}
              inputStyle={styles.modalInput}
              placeholder="—"
              containerStyle={[styles.modalInputCont, styles.modalInputCont2]}
              onChange={(t) => setProtein(normalizeOnlyNumbers(t).toString())}
            />
          </View>
          <View style={styles.modalInputCol}>
            <Text style={styles.modalText}>{"Ж"}</Text>
            <InputPrimary
              value={oil}
              inputStyle={styles.modalInput}
              placeholder="—"
              onChange={(t) => setOil(normalizeOnlyNumbers(t).toString())}
              containerStyle={[styles.modalInputCont, styles.modalInputCont2]}
            />
          </View>
          <View style={styles.modalInputCol}>
            <Text style={styles.modalText}>{"У"}</Text>
            <InputPrimary
              value={carb}
              placeholder="—"
              inputStyle={styles.modalInput}
              onChange={(t) => setCarb(normalizeOnlyNumbers(t).toString())}
              containerStyle={[styles.modalInputCont, styles.modalInputCont2]}
            />
          </View>
        </View>

        <View style={styles.modalBtnRow}>
          <ButtonSecondary
            onPress={onPress}
            text="Развёрнутые рекомендации"
            textStyle={styles.modalBtnText1}
            containerStyle={styles.modalBtn1}
          />
          <ButtonPrimary
            text="Добавить"
            onPress={onAdd}
            loading={modalLoading}
            style={styles.modalBtn2}
            loadingColor={COLORS.WHITE}
            disabled={isModalBtnDisabled}
            textStyle={styles.modalBtnText2}
          />
        </View>

        {activeTab !== null && (
          <Text
            style={styles.modalMiniText}
          >{`Данный продукт, будет добавлен в категорию "${categories[activeTab].name[language]}"`}</Text>
        )}
      </View>
    </Modal>
  );
};

export default CustomModal;
