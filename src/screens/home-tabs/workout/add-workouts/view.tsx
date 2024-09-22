import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Modal from 'react-native-modal'
import { styles } from './style'
import {
	ButtonPrimary,
	ButtonSecondary,
	Header,
	Icon,
	InputPrimary,
	InputSecondary
} from '../../../../components/common'
import { Assets } from '../../../../utils/requireAssets'
import { COLORS } from '../../../../constants/COLORS'
import { AddWorkoutHooks, WeightAndRepititionHooks } from './hooks'
import { FlatList } from 'react-native-gesture-handler'
import { DraxList, DraxProvider, DraxView } from 'react-native-drax'
import { useRef } from 'react'

const { height } = Dimensions.get('screen')

const AddWorkoutView = () => {
	const {
		show,
		approach,
		setApproach,
		repetitions,
		setRepetitions,
		modalError,
		onPress,
		onShow,
		onHide,
		onSet,
		workouts,
		onAddExercise,
		onSave,
		index,
		i18n,
		setWorkouts
	} = AddWorkoutHooks()

	const {
		currentIndex,
		onDissmiss,
		onShow: onModalShow,
		onSubmit,
		repititions,
		weight
	} = WeightAndRepititionHooks()
	const listRef = useRef<FlatList | null>(null)
	return (
		<View style={styles.container}>
			<Header title={`Тренировка ${index + 1}`} />

			<View style={{ flex: 1, justifyContent: 'center', marginBottom: 160 }}>
				<DraxProvider>
					<SafeAreaView edges={['top', 'left', 'right']}>
						<DraxList
							data={workouts}
							ref={listRef}
							renderItemContent={({ item, index }) => (
								<View key={index} style={{ marginTop: 30 }}>
									<View style={styles.head}>
										<ScrollView
											horizontal={false}
											contentContainerStyle={{
												alignItems: 'center',
												flexDirection: 'row'
											}}
											showsHorizontalScrollIndicator={false}
										>
											<Text style={styles.text}>{`${index + 1}. ${
												item.exercise.title[i18n.language as 'ru' | 'en' | 'uz']
											}`}</Text>
											<ButtonSecondary
												onPress={() => onShow(index)}
												containerStyle={[
													{ marginLeft: 5 },
													!!!(item.approach && item.repetitions) && {
														width: 70
													}
												]}
												text={
													item.approach && item.repetitions
														? `${item.approach}x${item.repetitions ?? '     '}`
														: ''
												}
											/>
											<ButtonSecondary
												text='Техника'
												onPress={() => onPress(index)}
												textStyle={styles.btnTextStyle}
												containerStyle={styles.btnStyle}
											/>
										</ScrollView>
									</View>
									<View style={styles.main}>
										<View style={styles.mainLeft}>
											<Text style={styles.text2}>{'Вес'}</Text>
											<Text style={styles.text2}>{'Повтор'}</Text>
										</View>
										<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
											<View style={styles.mainRight}>
												{new Array(item.approach).fill(1).map((aa, ii) => (
													<InputSecondary
														key={`${index}/${ii}`}
														text1={''}
														text2={''}
														disabled1
														disabled2
														containerStyle={!!ii && { marginLeft: 7 }}
													/>
												))}
											</View>
										</ScrollView>
									</View>
								</View>
							)}
							onItemDragStart={({ index, item }) => {
								console.log(item)
								console.log(`Item #${index} (${item}) drag start`)
							}}
							onItemDragPositionChange={({ index, item, toIndex, previousIndex }) => {
								console.log(
									`Item #${index} (${item}) dragged to index ${toIndex} (previous: ${previousIndex})`
								)
							}}
							onItemDragEnd={({ index, item, toIndex, toItem }) => {
								console.log(`Item #${index} (${item}) drag ended at index ${toIndex} (${toItem})`)
							}}
							onItemReorder={({ fromIndex, fromItem, toIndex, toItem }) => {
								console.log(
									`Item dragged from index ${fromIndex} (${fromItem}) to index ${toIndex} (${toItem})`
								)
								const newData = workouts.slice()
								newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0])
								setWorkouts(newData)
							}}
							keyExtractor={item => item.exercise._id}
						/>
						<ButtonPrimary
							fill
							text='Добавить упражнение'
							onPress={onAddExercise}
							style={[styles.button, !workouts.length && { marginTop: height * 0.3 }]}
							textStyle={styles.buttonText}
						/>
					</SafeAreaView>
				</DraxProvider>
			</View>

			{!!workouts.length && (
				<ButtonPrimary
					text='Утвердить'
					fill
					onPress={onSave}
					style={styles.saveBtn}
					textStyle={styles.saveBtnText}
				/>
			)}

			<Modal isVisible={typeof show === 'number'} style={styles.modal}>
				<View style={styles.modalBox}>
					<View style={{ alignSelf: 'flex-end' }}>
						<TouchableOpacity onPress={onHide}>
							<Icon width={14} height={14} tintColor={COLORS.RED} source={Assets.icons.close} />
						</TouchableOpacity>
					</View>
					<View style={styles.modalMain}>
						<View style={styles.modalLeft}>
							<Text style={styles.modalTitle}>{'Кол-во подходов'}</Text>
							<InputPrimary
								value={approach}
								onChange={setApproach}
								disablePlaceholder
								inputStyle={styles.modalInput}
								containerStyle={styles.modalInputCont}
							/>
						</View>
						<View style={styles.modalRight}>
							<Text style={styles.modalTitle}>{'Кол-во повторений'}</Text>
							<InputPrimary
								value={repetitions}
								onChange={setRepetitions}
								disablePlaceholder
								inputStyle={styles.modalInput}
								containerStyle={styles.modalInputCont}
							/>
						</View>
					</View>
					{!!modalError && <Text style={styles.modalError}>{modalError}</Text>}
					<View style={{ marginTop: 20 }}>
						<ButtonPrimary
							text='Ок'
							onPress={onSet}
							loadingColor={COLORS.WHITE}
							style={styles.modalBtn}
							textStyle={styles.modalBtnText}
						/>
					</View>
				</View>
			</Modal>
			{/* <CustomModal
        show={currentIndex !== -1}
        loading={false}
        modalError={""}
        weight={weight.toString()}
        repeat={repetitions}
        setRepeat={setRepeat}
        onHide={onHide}
        onSubmit={onSubmit}
        setWeight={}
      /> */}
		</View>
	)
}

export default AddWorkoutView
