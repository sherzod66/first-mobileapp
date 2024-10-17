import { View, Text, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import { ButtonPrimary, ButtonSecondary, InputPrimary } from '../../../../../components/common'
import { COLORS } from '../../../../../constants/COLORS'
import { useRedux } from '../../../../../store/hooks'
import { selectLanguage } from '../../../../../store/slices/appSlice'
import { Category } from '../../../../../types'
import { normalizeOnlyNumbers } from '../../../../../utils/normalizeOnlyNumbers'
import { styles } from './style'
import { countCalories } from '../../../../../utils/countCalories'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
	categories: Category[]
	activeTab: number | null
	showEdit: boolean
	modalLoading: boolean
	isModalBtnDisabled: boolean
	name: string
	setName: (s: string) => void
	calories: string
	setCalories: (s: string) => void
	protein: string
	setProtein: (s: string) => void
	oil: string
	setOil: (s: string) => void
	carb: string
	setCarb: (s: string) => void
	onHide: () => void
	onPress: () => void
	onAdd: () => void
}

const EditModal = ({
	categories,
	activeTab,
	showEdit,
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
	onAdd
}: IProps) => {
	const { t, i18n } = useTranslation()
	useEffect(() => {
		setCalories(String(countCalories(protein, oil, carb)))
	}, [protein, oil, carb])
	return (
		<Modal isVisible={showEdit} style={styles.modal} onBackdropPress={onHide}>
			<View style={styles.modalBox}>
				<Text style={styles.modalTitle}>{t('edit')}</Text>

				<View style={{ marginTop: 20 }}>
					<Text style={styles.modalText}>{t('product-name')}</Text>
					<InputPrimary
						value={name}
						disablePlaceholder
						onChange={t => setName(t)}
						inputStyle={styles.modalInput}
						containerStyle={styles.modalInputCont}
					/>
				</View>
				<View style={styles.modalInputCol}>
					<Text style={styles.modalText33}>{t('calories2')}</Text>
					<Text style={styles.modalTextCont}>{calories}</Text>
				</View>

				<View style={styles.modalInputRow}>
					<View style={styles.modalInputCol}>
						<Text style={styles.modalText}>{t('reduction-protein')}</Text>
						<InputPrimary
							value={protein}
							disablePlaceholder
							inputStyle={styles.modalInput}
							containerStyle={[styles.modalInputCont, styles.modalInputCont2]}
							onChange={t => setProtein(normalizeOnlyNumbers(t).toString())}
						/>
					</View>
					<View style={styles.modalInputCol}>
						<Text style={styles.modalText}>{t('reduction-fats')}</Text>
						<InputPrimary
							value={oil}
							disablePlaceholder
							inputStyle={styles.modalInput}
							onChange={t => setOil(normalizeOnlyNumbers(t).toString())}
							containerStyle={[styles.modalInputCont, styles.modalInputCont2]}
						/>
					</View>
					<View style={styles.modalInputCol}>
						<Text style={styles.modalText}>{t('reduction-carbohydrates')}</Text>
						<InputPrimary
							value={carb}
							disablePlaceholder
							inputStyle={styles.modalInput}
							onChange={t => setCarb(normalizeOnlyNumbers(t).toString())}
							containerStyle={[styles.modalInputCont, styles.modalInputCont2]}
						/>
					</View>
				</View>

				<View style={styles.modalBtnRow}>
					<ButtonSecondary
						onPress={onPress}
						text={t('recomendation-by-user')}
						textStyle={styles.modalBtnText1}
						containerStyle={styles.modalBtn1}
					/>
					<ButtonPrimary
						text={t('change')}
						onPress={onAdd}
						loading={modalLoading}
						style={styles.modalBtn2}
						loadingColor={COLORS.WHITE}
						disabled={isModalBtnDisabled}
						textStyle={styles.modalBtnText2}
					/>
				</View>

				{activeTab !== null && (
					<Text style={styles.modalMiniText}>{`${t('product_will_be_added_to_category')} "${
						categories[activeTab].name[i18n.language as 'ru']
					}"`}</Text>
				)}
			</View>
		</Modal>
	)
}

export default EditModal
