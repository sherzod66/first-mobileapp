export * from './auth'
export * from './error'
export * from './user'
export * from './measurement'
export * from './trainer'
export * from './category'
export * from './exercise'
export * from './workout'
export * from './schedule-workout'
export * from './product'
export * from './dish'
export * from './nutrition'
export * from './schema-nutrition'
export * from './response'

export type Token = {
	access_token: string
	refresh_token: string
}

export type BaseData = {
	_id: string
	createdAt: string
	updatedAt: string
}

export type MultiLanguageName = {
	en: string
	ru: string
	uz: string
}

export type BaseUser = BaseData & {
	name: string
	phoneNumber: string
	role: ROLES
}

export enum LANGUAGES {
	EN = 'en',
	RU = 'ru',
	UZ = 'uz'
}

export enum NOTIFICATION_TYPES {
	REQUSTED_DISCIPLE = 'REQUSTED_DISCIPLE'
}

export enum ROLES {
	SUPERADMIN = 'SUPERADMIN',
	ADMIN = 'ADMIN',
	TRAINER = 'TRAINER',
	USER = 'USER'
}

export enum GENDER {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	ALL = 'ALL'
}

export enum LEVEL {
	NEWBIE = 'NEWBIE',
	EXPERIENCED = 'EXPERIENCED',
	ADVANCED = 'ADVANCED'
}

export enum NUTRITION_TYPE {
	FAT = 'FAT',
	THIN = 'THIN'
}
