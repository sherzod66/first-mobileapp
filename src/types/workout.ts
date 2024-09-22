import { GENDER, LEVEL, User, Trainer, Exercise, BaseData } from '.'

export type WorkoutPlan = BaseData & {
	title: string
	description: string
	price: number
	gender: GENDER
	level: LEVEL
	week: number
	creator: User | Trainer
	workouts: Workout[][]
	users: string[]
	creatorUser?: User | Trainer
}

export type Workout = {
	exercise: Exercise
	approach: number
	repetitions: string
}
