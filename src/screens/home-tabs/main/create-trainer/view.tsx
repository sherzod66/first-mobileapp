import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { ButtonSecondary, Header, InputPrimary } from '../../../../components/common'
import SelectPrimary from '../../../../components/common/SelectPrimary'
import { CreateTrainerHook } from './hooks'
import { styles } from './style'
import { GENDER } from '../../../../types'
import Active_Button from '../../../../components/common/Active_Buutton'

const CreateTrainerView = () => {
	const {
		onChange,
		onTrainerSubmit,
		trainer,
		selectImage,
		ImagePicker,
		isPhoneNumber,
		setPhoneNumber,
		isEducation,
		setIsEducation
	} = CreateTrainerHook()

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title='Создание тренера' />
			</View>
			<ScrollView style={styles.contentContainer}>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Ф.И.О </Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					onChange={onChange('name')}
				/>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Номер телефона</Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					keyboardType='phone-pad'
					onChange={onChange('phoneNumber')}
				/>
				<Text style={[styles.textOne, { marginTop: 20 }]}>
					Отображать номер телефона спортцменам?
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginVertical: 15
					}}
				>
					<Text style={[styles.textOne]}>Не показывать номер</Text>
					<Active_Button toggle={isPhoneNumber} setToggle={setPhoneNumber} />
					<Text style={[styles.textOne]}>Показывать номер</Text>
				</View>

				<Text style={[styles.textOne, { marginVertical: 10 }]}>Почта</Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					onChange={onChange('email')}
					keyboardType='email-address'
				/>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Возраст </Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					keyboardType='number-pad'
					onChange={onChange('age')}
				/>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Город </Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					onChange={onChange('city')}
				/>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Аватар </Text>
				{selectImage && (
					<Image
						style={{
							width: '100%',
							height: 150,
							marginTop: 15,
							borderRadius: 5
						}}
						source={{ uri: selectImage.uri }}
					/>
				)}
				<TouchableOpacity style={styles.imageSelect} onPress={ImagePicker}>
					<Text style={[styles.textOne, { marginVertical: 10 }]}>Выберите фото</Text>
				</TouchableOpacity>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Специализация </Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					onChange={onChange('speciality')}
				/>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Опыт </Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					keyboardType='number-pad'
					onChange={onChange('experience')}
				/>
				<Text style={[styles.textOne, { marginTop: 20 }]}>
					Есть ли высшее образование у тренера?
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginVertical: 15
					}}
				>
					<Text style={[styles.textOne]}>Нет</Text>
					<Active_Button toggle={isEducation} setToggle={setIsEducation} />
					<Text style={[styles.textOne]}>Да</Text>
				</View>
				{isEducation && (
					<>
						<Text style={[styles.textOne, { marginVertical: 10 }]}>Образование </Text>
						<InputPrimary
							disablePlaceholder
							inputStyle={styles.input}
							containerStyle={styles.inputCont}
							onChange={onChange('education')}
						/>
					</>
				)}

				<Text style={[styles.textOne, { marginVertical: 10 }]}>Телеграм</Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					onChange={onChange('telegramLink')}
				/>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Инстаграм</Text>
				<InputPrimary
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					onChange={onChange('instagramLink')}
				/>
				<Text style={[styles.textOne, { marginVertical: 10 }]}>Пол</Text>
				<SelectPrimary
					data={[
						{ label: 'Мужской', value: GENDER.MALE },
						{ label: 'Женский', value: GENDER.FEMALE }
					]}
					onChange={onChange('trainerGenderType')}
				/>

				<Text style={[styles.textOne, { marginVertical: 10 }]}>О себе</Text>
				<InputPrimary
					multiline={true}
					disablePlaceholder
					inputStyle={styles.input}
					containerStyle={styles.inputCont}
					onChange={onChange('aboutMe')}
				/>

				<ButtonSecondary
					containerStyle={{
						width: '100%',
						marginVertical: 20,
						paddingVertical: 15
					}}
					text='Создать'
					onPress={onTrainerSubmit}
				/>
			</ScrollView>
		</View>
	)
}

export default CreateTrainerView
