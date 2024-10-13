import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRedux } from '../store/hooks'
import { selectUser } from '../store/slices/appSlice'
import { Icon } from './common'
import { Assets } from '../utils/requireAssets'
import { COLORS } from '../constants/COLORS'
import { MONTHS, MONTHS_EN, MONTHS_UZ, WEEK_DAYS } from '../constants/CALENDAR'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type IActiveDayProps = {
	weekIndex: number
	dayIndex: number
}

export type CalendarItem = {
	day: number
	text: string
	value?: number
	planned?: boolean
	past?: boolean
} | null

interface IProps {
	special?: boolean
	data: CalendarItem[][]
	activeDay: IActiveDayProps | null
	activeMonth: number
	activeYear: number
	setActiveDay: (activeDay: IActiveDayProps) => void
	setActiveMonth: (activeMonth: number) => void
	setActiveYear: (activeYear: number) => void
}

const CustomCalendar = ({
	special,
	data,
	activeDay,
	activeMonth,
	activeYear,
	setActiveDay,
	setActiveMonth,
	setActiveYear
}: IProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [user] = useRedux(selectUser)
	const { i18n } = useTranslation()

	const incrementMonth = () => {
		if (activeMonth < 11) {
			setActiveMonth(activeMonth + 1)
		} else {
			setActiveMonth(0)
			setActiveYear(activeYear + 1)
		}
	}

	const decrementMonth = () => {
		const createdTime = new Date(user ? user.createdAt : Date.now())
		const createdMonth = createdTime.getMonth()
		const createdYear = createdTime.getFullYear()

		if (special && createdYear >= activeYear && createdMonth > activeMonth - 1) {
			return
		}

		if (activeMonth > 0) {
			setActiveMonth(activeMonth - 1)
		} else {
			setActiveMonth(11)
			setActiveYear(activeYear - 1)
		}
	}

	const onSelectDay = ({ weekIndex, dayIndex }: IActiveDayProps) => {
		const day = data[weekIndex][dayIndex]

		setActiveDay({ weekIndex, dayIndex })
	}
	const today = new Date().getDate()
	const getMonthLang = () => {
		if (i18n.language === 'ru') return MONTHS
		else if (i18n.language === 'en') return MONTHS_EN
		else return MONTHS_UZ
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleRow}>
				<Text style={styles.title}>{`${today} ${getMonthLang()[activeMonth]} ${activeYear}`}</Text>
				<View style={styles.controls}>
					{isOpen ? (
						<>
							<TouchableOpacity onPress={decrementMonth}>
								<Icon
									width={15}
									height={15}
									tintColor={COLORS.GREY6}
									source={Assets.icons.arrow1}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={incrementMonth}>
								<Icon
									width={15}
									height={15}
									tintColor={COLORS.GREY6}
									source={Assets.icons.arrow1}
									style={{ marginLeft: 15, transform: [{ rotate: '180deg' }] }}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
								<Icon
									width={15}
									height={15}
									tintColor={COLORS.GREY6}
									source={Assets.icons.arrowTop}
									style={{ marginLeft: 15 }}
								/>
							</TouchableOpacity>
						</>
					) : (
						<TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
							<Icon
								width={15}
								height={15}
								tintColor={COLORS.GREY6}
								source={Assets.icons.arrowBottom}
								style={{ marginLeft: 15 }}
							/>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{isOpen && (
				<View style={styles.main}>
					<View style={styles.weekRow}>
						{WEEK_DAYS.map((d, di) => (
							<Text style={styles.weekText} key={di}>
								{d}
							</Text>
						))}
					</View>
					{data.map((sub, subI) => (
						<View style={[styles.row, !!subI && { marginTop: 10 }]} key={subI}>
							{sub.map((a, ai) => (
								<TouchableOpacity
									onPress={() => onSelectDay({ weekIndex: subI, dayIndex: ai })}
									key={ai}
								>
									<View style={[styles.col]}>
										{activeDay && activeDay.weekIndex === subI && activeDay.dayIndex === ai ? (
											<View style={styles.border}>
												<Text
													style={[
														styles.text2,
														a &&
															a.day.toString().length === 1 && {
																paddingHorizontal: 4
															}
													]}
												>
													{a && a.day}
												</Text>
											</View>
										) : (
											<Text
												style={[
													styles.text,
													a && a.planned && { color: COLORS.YELLOW2 },
													a && !a.value && { textAlignVertical: 'center' }
												]}
											>
												{!a ? '' : a.day}
											</Text>
										)}
										{!(activeDay && activeDay.weekIndex === subI && activeDay.dayIndex === ai) && (
											<Text style={styles.text1}>
												{!a ? '' : a.value && a.value > 0 ? a.value : '' ?? ''}
											</Text>
										)}
									</View>
								</TouchableOpacity>
							))}
						</View>
					))}
				</View>
			)}
		</View>
	)
}

export default CustomCalendar

const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: COLORS.GREY2,
		marginTop: 20
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 15,
		lineHeight: 15,
		fontWeight: '700',
		color: COLORS.WHITE
	},
	controls: {
		flexDirection: 'row'
	},
	main: {
		marginTop: 20,
		marginHorizontal: 20
	},
	weekRow: {
		marginBottom: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	weekText: {
		color: COLORS.RED
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	col: {
		width: 30,
		alignItems: 'center'
	},
	text: {
		fontSize: 12,
		lineHeight: 15,
		fontWeight: '400',
		color: COLORS.GREY13
	},
	text1: {
		fontSize: 10,
		lineHeight: 13,
		fontWeight: '400',
		color: COLORS.GREEN2
	},
	text2: {
		fontSize: 12,
		lineHeight: 15,
		fontWeight: '800',
		color: COLORS.WHITE
	},
	border: {
		padding: 2,
		borderWidth: 2,
		borderRadius: 30,
		borderColor: COLORS.WHITE
	}
})
