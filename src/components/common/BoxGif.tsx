import {
	View,
	Text,
	StyleSheet,
	StyleProp,
	TextStyle,
	ImageBackground,
	ImageSourcePropType,
	ViewStyle,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native'
import { COLORS } from '../../constants/COLORS'
import FastImage from 'react-native-fast-image'

interface IProps {
	cover: string
	containerStyle?: StyleProp<ViewStyle>
	title?: string
	titleStyle?: StyleProp<TextStyle>
	text?: string
	textStyle?: StyleProp<TextStyle>
	right?: string
	rightStyle?: StyleProp<TextStyle>
	show?: boolean
	setShow?: () => void
	dots?: boolean
	dotsLoading?: boolean
	onRemove?: () => void
	canSelect?: boolean
	select?: boolean
	onSelect?: () => void
	canSelectIn?: boolean
	selectIn?: boolean
	onSelectIn?: () => void
	onEdit?: () => void
}

const BoxGif = ({
	cover,
	containerStyle,
	title,
	titleStyle,
	text,
	textStyle,
	right,
	rightStyle,
	show,
	setShow,
	dots,
	dotsLoading,
	onRemove,
	canSelect,
	select,
	onSelect,
	canSelectIn,
	selectIn,
	onSelectIn,
	onEdit
}: IProps) => {
	return (
		<View style={[styles.container, containerStyle]}>
			<FastImage source={{ uri: cover }} style={styles.image} resizeMode='cover'>
				<View style={styles.row}>
					<View style={{ alignSelf: 'flex-start' }}>
						{title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
					</View>
					{dots && (
						<View style={styles.dotsCont}>
							<TouchableOpacity
								onPress={setShow}
								style={{
									paddingHorizontal: 10,
									position: 'absolute',
									top: -10,
									right: 0
								}}
							>
								<View style={styles.dot} />
								<View style={styles.dot} />
								<View style={styles.dot} />
							</TouchableOpacity>
							{show ? (
								dotsLoading ? (
									<View style={styles.absolute}>
										<ActivityIndicator color={COLORS.WHITE} size={'small'} />
									</View>
								) : (
									<TouchableOpacity style={styles.touchableWrapper}>
										<View style={styles.absolute}>
											<Text onPress={onRemove} style={styles.absoluteText}>
												{'Удалить'}
											</Text>
										</View>
										{onEdit && (
											<View style={styles.absolute}>
												<Text onPress={onEdit} style={styles.absoluteText}>
													{'Редактировать'}
												</Text>
											</View>
										)}
									</TouchableOpacity>
								)
							) : null}
						</View>
					)}
				</View>
				<View style={styles.row}>
					<View>{text && <Text style={[styles.text, textStyle]}>{text}</Text>}</View>
					<View>
						{canSelectIn ? (
							<TouchableOpacity onPress={onSelectIn} style={styles.selectInCont}>
								{selectIn && <View style={styles.selectBox} />}
							</TouchableOpacity>
						) : right ? (
							<Text style={[styles.right, rightStyle]}>{right}</Text>
						) : null}
					</View>
				</View>
			</FastImage>
			{canSelect && (
				<TouchableOpacity style={styles.selectCont} onPress={onSelect}>
					{select && <View style={styles.selectBox} />}
				</TouchableOpacity>
			)}
		</View>
	)
}

export default BoxGif

const styles = StyleSheet.create({
	container: {
		height: 160,
		flexDirection: 'row'
	},
	image: {
		flex: 1,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 5,
		borderRadius: 16,
		overflow: 'hidden',
		justifyContent: 'space-between'
	},
	selectCont: {
		width: 32,
		height: 32,
		padding: 3,
		marginLeft: 30,
		borderWidth: 1,
		borderRadius: 5,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: COLORS.GREY6
	},
	selectInCont: {
		width: 20,
		height: 20,
		padding: 2,
		borderWidth: 1,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: COLORS.WHITE
	},
	selectBox: {
		flex: 1,
		width: '100%',
		height: '100%',
		borderRadius: 5,
		backgroundColor: COLORS.RED2
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 17,
		lineHeight: 23,
		fontWeight: '700',
		color: COLORS.WHITE
	},
	text: {
		fontSize: 14,
		lineHeight: 19,
		fontWeight: '600',
		color: COLORS.WHITE
	},
	right: {
		fontSize: 17,
		lineHeight: 23,
		fontWeight: '700',
		color: COLORS.WHITE
	},
	dotsCont: {
		alignItems: 'flex-end'
	},
	dot: {
		width: 5,
		height: 5,
		marginTop: 2,
		borderRadius: 5,
		backgroundColor: COLORS.RED2
	},
	absolute: {
		marginTop: 5,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 40,
		backgroundColor: COLORS.GREY3
	},
	touchableWrapper: {
		position: 'absolute',
		right: 0,
		top: 20
	},
	absoluteText: {
		fontSize: 11,
		lineHeight: 15,
		fontWeight: '400',
		color: COLORS.WHITE
	}
})

// MainHome
// Exercises
// WorkoutPlans
// MyWorkoutPlans
// MyExercises
