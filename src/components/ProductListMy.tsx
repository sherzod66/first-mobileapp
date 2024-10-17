import {
	View,
	Text,
	StyleProp,
	ViewStyle,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native'
import Controls from './common/Controls'
import { COLORS } from '../constants/COLORS'
import { Product } from '../types'
import { ButtonSecondary } from './common'
import { Dispatch, SetStateAction } from 'react'
import { IActiveDayProps } from './CustomCalendar'
import { showErrToast } from '../utils/showToast'
import { useTranslation } from 'react-i18next'

interface IProps {
	title: string
	isDisabled?: boolean
	loading?: number | boolean
	products: Product[]
	amounts: number[]
	navigateAddProducts: () => void
	onShow: (index: number, value: string) => void
	onRemove: () => void
	onRemoveByIndex: (index: number) => void
	style?: StyleProp<ViewStyle>
	isDots: boolean
	setIsDots: Dispatch<SetStateAction<boolean>>
	setDateCopy: (
		value: SetStateAction<{
			day: IActiveDayProps | null
			products: Product[]
		}>
	) => void
	dateCopy: {
		day: IActiveDayProps | null
		products: Product[]
	}
	activeDay: IActiveDayProps | null
	onPaste: () => Promise<void>
}

const ProductListMy = ({
	title,
	isDisabled,
	loading,
	products,
	amounts,
	navigateAddProducts,
	onShow,
	onRemove,
	onRemoveByIndex,
	style,
	isDots,
	setIsDots,
	dateCopy,
	setDateCopy,
	activeDay,
	onPaste
}: IProps) => {
	const { t, i18n } = useTranslation()
	return (
		<View style={[styles.container, style]}>
			<View style={[styles.header, styles.radiusTop]}>
				<View style={styles.left}>
					<Text style={styles.title}>{t('product-name')}</Text>
					<TouchableOpacity style={styles.dots} onPress={() => setIsDots(!isDots)}>
						<View style={styles.dot} />
						<View style={styles.dot} />
						<View style={styles.dot} />
					</TouchableOpacity>
				</View>
				<View style={styles.right}>
					<Text style={styles.text4}>{t('quantity')}</Text>
				</View>
			</View>
			{products.map((product, index) => (
				<View
					key={`${product._id}/${index}`}
					style={[styles.row, index === products.length - 1 && styles.radiusBottom]}
				>
					<View style={styles.left}>
						<Text style={styles.textMy}>{product.name[i18n.language as 'ru']}</Text>
						<TouchableOpacity onPress={() => onRemoveByIndex(index)}>
							{typeof loading === 'number' && loading === index ? (
								<ActivityIndicator size={'small'} />
							) : (
								<Text style={styles.text2}>{'Удалить'}</Text>
							)}
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.right}
						onPress={() => {
							if (product.category) onShow(index, `${amounts[index]}`)
							else showErrToast('Кол-во блюда нельзя редактировать')
						}}
					>
						<Text style={styles.text1}>{amounts[index]}</Text>
					</TouchableOpacity>
				</View>
			))}
			<View
				style={{
					marginTop: 20,
					flexDirection: 'row',
					justifyContent: 'center'
				}}
			>
				<ButtonSecondary
					textStyle={{ fontSize: 16 }}
					text={title}
					onPress={navigateAddProducts}
					containerStyle={{}}
				/>
			</View>
			{/* {!isDisabled && (
        <Controls
          text={title}
          onDecrement={onRemove}
          onIncrement={() => navigateAddProducts()}
          loading={typeof loading === "boolean" && loading}
          textStyle={{ marginTop: 3 }}
        />
      )} */}
			{isDots && (
				<View style={styles.touchableWrapper}>
					{products.length > 0 && (
						<TouchableOpacity
							style={styles.absolute}
							onPress={() => {
								setDateCopy({ day: activeDay, products })
								setIsDots(!isDots)
							}}
						>
							<Text style={styles.absoluteText}>{'Скопировать'}</Text>
						</TouchableOpacity>
					)}
					{dateCopy.products.length > 0 && dateCopy.day?.dayIndex !== activeDay?.dayIndex && (
						<TouchableOpacity
							onPress={() => {
								onPaste()
							}}
							style={styles.absolute}
						>
							{loading && <ActivityIndicator size={'small'} />}
							{!loading && <Text style={styles.absoluteText}>{'Вставить'}</Text>}
						</TouchableOpacity>
					)}
				</View>
			)}
		</View>
	)
}

export default ProductListMy

const styles = StyleSheet.create({
	container: {},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.GREY3
	},
	title: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: '800',
		color: COLORS.WHITE
	},
	left: {
		flex: 1,
		borderRightWidth: 1,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 23,
		borderColor: COLORS.GREY11,
		justifyContent: 'space-between'
	},
	right: {
		width: 90,
		borderLeftWidth: 1,
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: COLORS.GREY11
	},
	row: {
		borderTopWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: COLORS.GREY11,
		backgroundColor: COLORS.GREY2
	},
	input: {
		width: '50%',
		fontSize: 11,
		lineHeight: 16,
		fontWeight: '600',
		color: COLORS.WHITE
	},
	text1: {
		fontSize: 11,
		lineHeight: 15,
		fontWeight: '700',
		color: COLORS.WHITE
	},
	textMy: {
		fontSize: 11,
		lineHeight: 18,
		fontWeight: '700',
		color: COLORS.WHITE,
		width: 170
	},
	text2: {
		fontSize: 11,
		lineHeight: 16,
		fontWeight: '600',
		color: COLORS.GREY11
	},

	text4: {
		fontSize: 12,
		lineHeight: 15,
		fontWeight: '600',
		color: COLORS.GREEN2
	},
	dot: {
		width: 5,
		height: 5,
		marginTop: 3,
		borderRadius: 5,
		backgroundColor: COLORS.RED2
	},
	dots: {
		paddingHorizontal: 10,
		position: 'absolute',
		top: 3,
		right: 0
	},
	radiusTop: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	radiusBottom: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	absolute: {
		marginTop: 5,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 40,
		backgroundColor: COLORS.BLACK
	},
	touchableWrapper: {
		position: 'absolute',
		right: 98,
		top: 35,
		zIndex: 50
	},
	absoluteText: {
		fontSize: 11,
		lineHeight: 15,
		fontWeight: '400',
		color: COLORS.WHITE
	}
})
