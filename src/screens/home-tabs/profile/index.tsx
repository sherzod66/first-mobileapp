import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AddProducts from './add-products'
import ExerciseScreen from './exercise'
import ProfileHome from './home'
import MyData from './my-data'
import MyTrainer from './my-trainer'
import Notifications from './notifications'
import Recommendation from './recommendation'
import Settings from './settings'
import Users from './users'
import WorkoutResults from './workout-results'

import { PROFILE } from '../../../navigation/ROUTES'
import { Exercise, Product, ScheduleWorkout, SchemaNutrition } from '../../../types'
import AdsScreen from './ads/view'
import UserView from './user/view'
import StudentInfo from './my-data/StudentInfo'
import TrainerStatistic from './trainer-statistic/TrainerStatistic'
import { TRecommendationContent } from '../nutrition/recommendation/hooks'
import WorkoutResultsStudent from './workout-results-student'

export type ProfileStackParamList = {
	[PROFILE.HOME]: undefined
	[PROFILE.MY_DATA]: undefined
	[PROFILE.STUDENT_DATA]: { apprenticeId: string }
	[PROFILE.USER]: {
		id: string
	}
	[PROFILE.MY_TRAINER]: undefined
	[PROFILE.TRAINER_STATISTIC]: undefined
	[PROFILE.NOTIFICATIONS]: undefined
	[PROFILE.ADS]: undefined
	[PROFILE.SETTINGS]: undefined
	[PROFILE.USERS]: { isTrainer?: boolean }
	[PROFILE.RECOMMENDATION]: {
		value: keyof TRecommendationContent
	}
	[PROFILE.WORKOUT_RESULTS]: {
		schedule: ScheduleWorkout
		workoutIndex: number
		weekIndex: number
	}
	[PROFILE.WORKOUT_RESULTS_STUDENT]: {
		userId: string
		workoutIndex: number
		weekIndex: number
	}
	[PROFILE.EXERCISE]: {
		exercise: Exercise
	}
	[PROFILE.ADD_PRODUCTS]: {
		products: Product[]
		schemaNutrition: SchemaNutrition
	}
}

const Stack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name={PROFILE.HOME} component={ProfileHome} options={{ headerShown: false }} />
			<Stack.Screen name={PROFILE.MY_DATA} component={MyData} options={{ headerShown: false }} />
			<Stack.Screen
				name={PROFILE.STUDENT_DATA}
				component={StudentInfo}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={PROFILE.TRAINER_STATISTIC}
				component={TrainerStatistic}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name={PROFILE.USER} component={UserView} options={{ headerShown: false }} />
			<Stack.Screen
				name={PROFILE.MY_TRAINER}
				component={MyTrainer}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={PROFILE.NOTIFICATIONS}
				component={Notifications}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name={PROFILE.SETTINGS} component={Settings} options={{ headerShown: false }} />
			<Stack.Screen
				name={PROFILE.RECOMMENDATION}
				component={Recommendation}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={PROFILE.EXERCISE}
				component={ExerciseScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={PROFILE.WORKOUT_RESULTS}
				component={WorkoutResults}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={PROFILE.WORKOUT_RESULTS_STUDENT}
				component={WorkoutResultsStudent}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={PROFILE.ADD_PRODUCTS}
				component={AddProducts}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name={PROFILE.USERS} component={Users} options={{ headerShown: false }} />
			<Stack.Screen name={PROFILE.ADS} component={AdsScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	)
}

export default ProfileStack
