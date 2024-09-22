import { View, Text, SafeAreaView } from 'react-native'
import { ButtonTabs, Header } from '../../../../components/common'
import { styles } from './style'
import { useStudentInfo } from './useStudentInfo'
import StudentNutrition from './student-info/StudentNutrition'
import StudentMeasurementsView from './student-measurements/view'
import StudentWorkout from './Student-workout'

const StudentInfo = () => {
	const { active, setActive, apprenticeId, userName } = useStudentInfo()

	return (
		<View style={styles.container}>
			<SafeAreaView />

			<View style={styles.mh25}>
				<Header title={userName} bottom={active === 2} />

				<View style={styles.mt18}>
					<ButtonTabs
						primary
						active={active}
						setActive={setActive}
						titles={['Питание', 'Тренинг', 'Замеры']}
						scroll={false}
					/>
				</View>
			</View>

			{active === 0 && <StudentNutrition apprenticeId={apprenticeId} />}
			{active === 1 && <StudentWorkout apprenticeId={apprenticeId} />}
			{active === 2 && <StudentMeasurementsView apprenticeId={apprenticeId} />}
		</View>
	)
}

export default StudentInfo
