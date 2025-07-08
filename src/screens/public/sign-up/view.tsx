import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from './style'
import { COLORS } from '../../../constants/COLORS'
import { SignUpHooks } from './hooks'
import { ButtonPrimary, InputPrimary } from '../../../components/common'

const SignUpView = () => {
	const { loading, name, setName, phone, setPhone, onPress, onLoginPress, t } = SignUpHooks()

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.textHeader}>{t('registration')}</Text>
				<InputPrimary
					placeholder={t('your-name')}
					placeholderColor='#ffffff'
					value={name}
					onChange={value => setName(value)}
					containerStyle={{
						backgroundColor: COLORS.GREY,
						marginBottom: 10,
						marginTop: 30
					}}
					inputStyle={{
						backgroundColor: COLORS.GREY,
						color: COLORS.WHITE
					}}
				/>
				<InputPrimary
					placeholder={t('enter-email')}
					placeholderColor='#ffffff'
					value={phone}
					onChange={value => setPhone(value)}
					containerStyle={{
						backgroundColor: COLORS.GREY,
						marginBottom: 10
					}}
					inputStyle={{
						backgroundColor: COLORS.GREY,
						color: COLORS.WHITE
					}}
				/>
				<Text style={styles.text}>{t('terms-acceptance')}</Text>
				<ButtonPrimary
					text={t('signup')}
					fill
					loading={loading}
					loadingColor={COLORS.WHITE}
					style={{
						borderRadius: 4,
						paddingVertical: 18,
						backgroundColor: phone.length > 6 && name.length > 3 ? COLORS.GREEN2 : COLORS.GREY,
						marginBottom: 10,
						marginTop: 20
					}}
					textStyle={{
						color: COLORS.WHITE,
						fontWeight: '700',
						fontSize: 15,
						lineHeight: 15
					}}
					onPress={onPress}
				/>
			</View>
			<View style={styles.footerContainer}>
				<Text style={styles.textFooter}>{t('have-account')}</Text>
				<ButtonPrimary
					text={t('login')}
					fill
					loading={loading}
					loadingColor={COLORS.WHITE}
					style={{
						borderRadius: 4,
						paddingVertical: 18,
						backgroundColor: COLORS.RED,
						marginBottom: 10
					}}
					textStyle={{
						color: COLORS.WHITE,
						fontWeight: '700',
						fontSize: 15,
						lineHeight: 15
					}}
					onPress={onLoginPress}
				/>
			</View>
		</View>
	)
}

export default SignUpView
