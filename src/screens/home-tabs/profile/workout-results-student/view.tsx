import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { ButtonSecondary, Header, InputSecondary } from '../../../../components/common'
import { WorkoutResultsHooks } from './hooks'
import { styles } from './style'

const WorkoutResultsStudentView = () => {
	const { workoutIndex, weekIndex, data, onPress, i18n, getRecordWight } = WorkoutResultsHooks()

	return (
		<View style={styles.container}>
			{data && (
				<>
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
											horizontal={true}
											contentContainerStyle={{ alignItems: 'center' }}
											showsHorizontalScrollIndicator={false}
										>
											<Text style={styles.text}>{`${i + 1}. ${
												a.exercise.title[i18n.language as 'ru']
											}`}</Text>
											<ButtonSecondary
												onPress={() => {}}
												containerStyle={{ marginLeft: 20 }}
												text={`${a.approach}x${a.repetitions}`}
												// textStyle={styles.btnTextStyle}
												// containerStyle={styles.btnStyle}
											/>
										</ScrollView>
									</View>
									<Text style={styles.textLast}>
										Рекордный вес:
										{getRecordWight(workoutIndex, weekIndex, i)}
									</Text>
									<View style={styles.main}>
										<View style={styles.mainLeft}>
											<Text style={styles.text2}>{'Вес'}</Text>
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
														<TouchableOpacity key={`${i}/${ii}`}>
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
				</>
			)}
		</View>
	)
}

export default WorkoutResultsStudentView
