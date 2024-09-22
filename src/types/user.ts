import {
	BaseUser,
	Measurement,
	Trainer,
	Exercise,
	WorkoutPlan,
	ScheduleWorkout,
	Product,
	Dish,
	NutritionPlan,
	SchemaNutrition,
	EnumSubscriptionStatus,
	EnumSubscription
} from '.'

export type User = BaseUser & {
	isProAccount: boolean
	startDate: Date
	endDate: Date
	subscriptionStatus: EnumSubscriptionStatus
	subscription: EnumSubscription
	myTrainers: Trainer[]
	favoriteExercises: Exercise[]
	workoutPlans: WorkoutPlan[]
	scheduleWorkouts: ScheduleWorkout[]
	products: Product[]
	dishes: Dish[]
	nutritionPlans: NutritionPlan[]
	schemaNutritions: SchemaNutrition[]
	myMeasurements: Measurement[]
}
