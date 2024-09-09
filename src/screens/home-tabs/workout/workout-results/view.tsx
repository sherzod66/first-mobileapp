import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import {
	Header,
	InputSecondary,
	ButtonSecondary,
	ButtonPrimary
} from '../../../../components/common'
import Modal from './modal'
import { WorkoutResultsHooks } from './hooks'
import { styles } from './style'
import { COLORS } from '../../../../constants/COLORS'

const WorkoutResultsView = () => {
	const {
		loading,
		show,
		weight,
		setWeight,
		repeat,
		setRepeat,
		modalError,
		workoutIndex,
		weekIndex,
		data,
		onPress,
		onShow,
		onHide,
		onSubmit,
		i18n,
		getRecordWight
	} = WorkoutResultsHooks()

	return (
		data && (
			<View style={styles.container}>
				<SafeAreaView />

				<Header />

				<View style={styles.titleRow}>
					<Text style={styles.title}>{`Тренировка ${workoutIndex + 1}`}</Text>
					<ButtonSecondary
						text={`Неделя ${weekIndex + 1}`}
						onPress={() => {}}
						textStyle={styles.title2}
					/>
				</View>

				<View style={styles.content}>
					<ScrollView showsVerticalScrollIndicator={false}>
						{data.plan.workouts[workoutIndex].map((a, i) => (
							<View key={i} style={{ marginTop: 30 }}>
								<View style={styles.head}>
									<ScrollView
										contentContainerStyle={{
											alignItems: 'center',
											flexDirection: 'row'
										}}
										showsHorizontalScrollIndicator={false}
									>
										<Text style={styles.text}>{`${i + 1}. ${
											a.exercise
												? a.exercise.title[i18n.language as 'ru' | 'en' | 'uz']
												: 'Упражнение было удалено'
										}`}</Text>
										<ButtonSecondary
											onPress={() => {}}
											text={`${a.approach}x${a.repetitions}`}
											// textStyle={styles.btnTextStyle}
											// containerStyle={styles.btnStyle}
										/>
										{a.exercise && (
											<ButtonSecondary
												text='Техника'
												onPress={() => onPress(i)}
												textStyle={styles.btnTextStyle}
												containerStyle={styles.btnStyle}
											/>
										)}
									</ScrollView>
								</View>
								<Text style={styles.textLast}>
									Рекордный вес:
									{getRecordWight(workoutIndex, weekIndex, i)}
								</Text>
								<View style={styles.main}>
									<View style={styles.mainLeft}>
										<Text style={styles.text2}>{'Вес (кг)'}</Text>
										<Text style={styles.text2}>{'Повтор'}</Text>
									</View>
									<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
										<View style={styles.mainRight}>
											{new Array(a.approach).fill(1).map((aa, ii) => {
												let text1 = ''
												let text2 = ''
												const { weight, repeat } = data.results[workoutIndex][weekIndex][i][ii]

												if (weight && repeat) {
													text1 = weight.toString()
													text2 = repeat.toString()
												}

												return (
													<TouchableOpacity key={`${i}/${ii}`} onPress={() => onShow(i, ii)}>
														<InputSecondary
															text1={text1}
															text2={text2}
															disabled1
															disabled2
															containerStyle={!!ii && { marginLeft: 7 }}
														/>
													</TouchableOpacity>
												)
											})}
										</View>
									</ScrollView>
								</View>
							</View>
						))}
					</ScrollView>
				</View>

				<Modal
					show={show}
					loading={loading}
					modalError={modalError}
					weight={weight}
					setWeight={setWeight}
					repeat={repeat}
					setRepeat={setRepeat}
					onHide={onHide}
					onSubmit={onSubmit}
				/>
			</View>
		)
	)
}

export default WorkoutResultsView
