import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import {
  ButtonPrimary,
  ButtonSecondary,
  Icon,
  InputPrimary,
} from "../../../../../components/common";
import { COLORS } from "../../../../../constants/COLORS";
import { normalizeOnlyNumbers } from "../../../../../utils/normalizeOnlyNumbers";
import { Assets } from "../../../../../utils/requireAssets";
import { styles } from "./style";

interface IProps {
  activeTab: number;
  show: any;
  error: string;
  loading: boolean;
  state: string;
  setState: (s: string) => void;
  state1: string;
  state2: string;
  setState1: (s: string) => void;
  setState2: (s: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onPress: () => void;
}

const CustomModal = ({
  activeTab,
  loading,
  show,
  error,
  state,
  setState,
  state1,
  state2,
  setState1,
  setState2,
  onSave,
  onCancel,
  onPress,
}: IProps) => {
  return (
    <Modal
      style={styles.modal}
      onBackdropPress={() => onCancel()}
      isVisible={!!Object.keys(show).length}
    >
      <View style={styles.modalBox}>
        <View style={styles.modalTitleRow}>
          <Text style={styles.modalTitle}>
            {show.a
              ? "Суточная норма"
              : show.b
              ? `Рекомендованное кол-во ${activeTab ? "профицита" : "дефицита"}`
              : show.c
              ? `Рекомендованное кол-во белка от ${
                  activeTab ? "20% до 25%" : "20% до 30%"
                }`
              : show.d
              ? `Рекомендованное кол-во жиров от ${
                  activeTab ? "15% до 20%" : "20% до 30%"
                }`
              : ""}
          </Text>
          <TouchableOpacity onPress={() => onCancel()}>
            <Icon
              width={18}
              height={18}
              tintColor={COLORS.RED}
              style={{ marginLeft: 60 }}
              source={Assets.icons.close}
            />
          </TouchableOpacity>
        </View>
        {show.b && (
          <>
            <View style={{ marginTop: 10 }} />
            <Text style={styles.modalText1}>{"от 200 до 500 ккал"}</Text>
          </>
        )}
        {show.e ? (
          <>
            <View style={styles.modalInputRow}>
              <View style={styles.modalInputBox}>
                <InputPrimary
                  value={state1}
                  disablePlaceholder
                  inputStyle={styles.modalInput}
                  containerStyle={styles.modalInputCont}
                  keyboardType="number-pad"
                  onChange={(t) =>
                    setState1(normalizeOnlyNumbers(t).toString())
                  }
                />
                <Text style={styles.modalText1}>{"%"}</Text>
              </View>
              <View style={styles.ml20}>
                <Text style={styles.modalText2}>
                  {activeTab
                    ? "Увеличение профицитной нормы калорий"
                    : "Уменьшение дефицитной калорийности"}
                </Text>
              </View>
            </View>
            {/* <Text style={styles.modalText3}>{"или"}</Text>
            <View style={styles.modalInputRow}>
              <View style={styles.modalInputBox}>
                <InputPrimary
                  value={state2}
                  disablePlaceholder
                  inputStyle={styles.modalInput}
                  containerStyle={styles.modalInputCont}
                  onChange={(t) =>
                    setState2(normalizeOnlyNumbers(t).toString())
                  }
                />
                <Text style={styles.modalText1}>{"гр."}</Text>
              </View>
              <View style={styles.ml20}>
                <Text style={styles.modalText2}>
                  {`${
                    !activeTab ? "Уменьшение" : "Увеличение"
                  } количества  углеводов`}
                </Text>
              </View>
            </View> */}
          </>
        ) : (
          <View style={styles.modalInputRow}>
            <View style={styles.modalInputBox}>
              <InputPrimary
                disablePlaceholder
                value={state}
                inputStyle={styles.modalInput}
                containerStyle={styles.modalInputCont}
                keyboardType="number-pad"
                onChange={(t) => setState(normalizeOnlyNumbers(t).toString())}
              />
              <Text style={styles.modalText1}>
                {show.a || show.b ? "ккал" : "%"}
              </Text>
            </View>
            <View style={styles.ml20}>
              <Text style={styles.modalText2}>
                {show.a
                  ? "Суточная норма"
                  : show.b
                  ? `Кол-во ${activeTab ? "профицита" : "дефицита"} калорий`
                  : show.c
                  ? "Кол-во белка"
                  : "Кол-во жира"}
              </Text>
            </View>
          </View>
        )}
        {!!error && <Text style={styles.modalErrorText}>{error}</Text>}
        <View style={styles.modalBtnRow}>
          <ButtonSecondary
            onPress={onPress}
            text="Развёрнутые рекомендации"
            textStyle={styles.modalBtnText1}
            containerStyle={styles.modalBtn1}
          />
          <ButtonPrimary
            text="Ок"
            onPress={onSave}
            loading={loading}
            style={styles.modalBtn2}
            loadingColor={COLORS.WHITE}
            textStyle={styles.modalBtnText2}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
