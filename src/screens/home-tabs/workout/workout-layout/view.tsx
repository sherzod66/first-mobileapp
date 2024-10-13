import { View, SafeAreaView } from 'react-native'
import ScheduleWorkoutView from './schedule-workout'
import MyWorkoutPlansView from './my-workout-plans'
import MyExercisesView from './my-exercises'
import { ButtonTabs } from '../../../../components/common'
import { WorkoutLayoutHooks } from './hooks'
import { styles } from './style'

const WorkoutLayoutView = () => {
	const { activeTab, setActiveTab, t } = WorkoutLayoutHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView />

			<ButtonTabs
				active={activeTab}
				setActive={setActiveTab}
				titles={[t('training-diary'), t('my-programs'), t('my-exercise')]}
				secondary
				containerStyle={styles.btnCont}
				buttonStyle={styles.btn}
				textStyle={styles.btnText}
				scroll={false}
				inActiveTextStyle={{ fontSize: 11 }}
			/>

			<View style={styles.main}>
				{activeTab === 0 && <ScheduleWorkoutView />}
				{activeTab === 1 && <MyWorkoutPlansView />}
				{activeTab === 2 && <MyExercisesView />}
			</View>
		</View>
	)
}

export default WorkoutLayoutView
