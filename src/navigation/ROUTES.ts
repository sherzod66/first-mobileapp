export enum PUBLIC {
	SELECT_LANGUAGE = 'SELECT_LANGUAGE',
	WELCOME = 'WELCOME',
	SIGN_IN = 'SIGN_IN',
	SIGN_UP = 'SIGN_UP',
	VERIFY_CODE = 'VERIFY_CODE'
}

export enum MAIN {
	TAB = 'MAIN_TAB',
	HOME = 'MAIN_HOME',
	CREATE_EXERCISE = 'CREATE_EXERCISE',
	EXERCISE = 'MAIN_EXERCISE',
	EDIT_EXERCISE = 'EDIT_EXERCISE',
	EXERCISES = 'MAIN_EXERCISES',
	TRAINER = 'MAIN_TRAINER',
	FITNESS_CLUB = 'FITNESS_CLUB',
	TRAINERS = 'MAIN_TRAINERS',
	FITNESS_CLUBS = 'FITNESS_CLUBS',
	WORKOUT_PLAN = 'MAIN_WORKOUT_PLAN',
	WORKOUT_PLANS = 'MAIN_WOKROUT_PLANS',
	NUTRITION_PLAN = 'MAIN_NUTRITION_PLAN',
	NUTRITION_PLANS = 'MAIN_NUTRITION_PLANS',
	NUTRITION_DETAIL = 'NUTRITION_DETAIL',
	PAYMENT = 'PAYMENT',
	CREATE_TRAINER = 'CREATE_TRAINER',
	UPDATE_TRAINER = 'UPDATE_TRAINER',
	CREATE_FITNESS_CLUB = 'CREATE_FITNESS_CLUB'
}

export enum WORKOUT {
	TAB = 'WORKOUT_TAB',
	WORKOUT_LAYOUT = 'WORKOUT_LAYOUT',
	SCHEDULE_WORKOUT = 'SCHEDULE_WORKOUT',
	MY_WORKOUT_PLANS = 'MY_WORKOUT_PLANS',
	MY_EXERCISES = 'MY_EXERCISES',
	WORKOUT_RESULTS = 'WORKOUT_RESULTS',
	CREATE_WORKOUT_PLAN = 'CREATE_WORKOUT_PLAN',
	ADD_WORKOUTS = 'ADD_WORKOUTS',
	EXERCISES = 'WORKOUT_EXERCISES',
	WORKOUT_PLAN = 'WORKOUT_PLAN',
	EXERCISE = 'EXERCISE'
}

export enum NUTRITION {
	TAB = 'NUTRITION_TAB',
	NUTRITION_LAYOUT = 'NUTRITION_LAYOUT',
	SCHEMA_NUTRITION = 'SCHEMA_NUTRITION',
	MY_NUTRITION_PLANS = 'MY_NUTRITION_PLANS',
	MY_PRODUCTS = 'MY_PRODUCTS',
	BASE_PRODUCTS = 'BASE_PRODUCTS',
	CALC_DAILY_NORM = 'CALC_DAILY_NORM',
	RECOMMENDATION = 'NUTRITION_RECOMMENDATION',
	CONSUME_CALENDAR = 'CONSUME_CALENDAR',
	ADD_PRODUCTS = 'NUTRITION_ADD_PRODUCTS',
	ADD_PRODUCTS_SEARCH = 'NUTRITION_ADD_PRODUCTS_SEARCH',
	MEAL_PLANS_SEARCH = 'NUTRITION_MEAL_PLANS_SEARCH',
	ADD_ONLY_PRODUCTS = 'ADD_ONLY_PRODUCTS',
	MEASUREMENTS = 'MEASUREMENTS',
	CREATE_DISH = 'CREATE_DISH',
	UPDATE_DISH = 'UPDATE_DISH',
	NUTRITION_PLAN = 'NUTRITION_PLAN',
	CREATE_NUTRITION_PLAN = 'CREATE_NUTRITION_PLAN',
	ADD_PART_PLAN = 'ADD_PART_PLAN',
	ADD_RECEPTION = 'ADD_RECEPTION',
	UPDATE_PART_PLAN = 'UPDATE_PART_PLAN',
	CREATE_PRODUCT = 'CREATE_PRODUCT',
	ADD_ONLY_SEARCH = 'ADD_ONLY_SEARCH',
	SEARCH_PRODUCT = 'SEARCH_PRODUCT',
	SEARCH_MY_PRODUCT = 'SEARCH_MY_PRODUCT'
}

export enum PROFILE {
	TAB = 'PROFILE_TAB',
	HOME = 'PROFILE_HOME',
	ADD_PRODUCTS = 'PROFILE_ADD_PRODUCTS',
	MY_DATA = 'MY_DATA',
	TRAINER_STATISTIC = 'TRAINER_STATISTIC',
	STUDENT_DATA = 'STUDENT_DATA',
	USER = 'USER',
	WORKOUT_RESULTS = 'PROFILE_WORKOUT_RESULTS',
	MY_TRAINER = 'MY_TRAINER',
	RECOMMENDATION = 'PROFILE_RECOMMENDATION',
	NOTIFICATIONS = 'NOTIFICATIONS',
	SETTINGS = 'SETTINGS',
	EXERCISE = 'PROFILE_EXERCISE',
	USERS = 'USERS',
	ADS = 'ADS'
}

export const ROUTES = {
	PUBLIC,
	TABS: {
		MAIN,
		WORKOUT,
		NUTRITION,
		PROFILE
	}
} as const
