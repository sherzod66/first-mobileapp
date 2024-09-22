import { BaseUser, GENDER, User, WorkoutPlan } from '.'

export type Trainer = BaseUser & {
	trainerGenderType: GENDER
	age: number
	email: string
	city: string
	isPhoneNumber: boolean
	avatar: string
	isEducation: boolean
	startDate: Date
	endDate: Date
	subscriptionStatus: EnumSubscriptionStatus
	subscription: EnumSubscription
	speciality: string
	experience: number
	education: string
	aboutMe: string
	telegramLink: string
	instagramLink: string
	disciples: User[]
	requestedDisciples: User[]
	workoutPlans: WorkoutPlan[]
}

export enum EnumSubscription {
	NO_SUBSCRIPTION = 'NO_SUBSCRIPTION',
	STARTER = 'STARTER',
	STANDARD = 'STANDARD',
	PREMIUM = 'PREMIUM',
	ELITE = 'ELITE'
}

export enum EnumSubscriptionStatus {
	ACTIVE = 'ACTIVE',
	EXPIRED = 'EXPIRED',
	CANCELED = 'CANCELED',
	IN_PROGRESS = 'IN_PROGRESS'
}
