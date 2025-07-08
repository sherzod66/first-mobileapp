import {
	Dimensions,
	Image,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { ButtonPrimary, InputPrimary } from '../../../components/common'
import { COLORS } from '../../../constants/COLORS'
import { SignInHooks } from './hooks'
import { styles } from './style'
// import GoogleIcon from

const SignInView = () => {
	const { onRegisterPress, onPress, loading, phone, setPhone, t } = SignInHooks()
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.textHeader}>{t('authorization')}</Text>
					{/* <KeyboardAvoidingView
            keyboardVerticalOffset={200}
            behavior="position"
          > */}
					<InputPrimary
						placeholder={t('enter-email')}
						placeholderColor='#ffffff'
						value={phone}
						onChange={value => setPhone(value)}
						containerStyle={{
							backgroundColor: COLORS.GREY,
							marginVertical: 25
						}}
						inputStyle={{
							backgroundColor: COLORS.GREY,
							color: COLORS.WHITE
						}}
						keyboardType='email-address'
					/>
					{/* </KeyboardAvoidingView> */}
					<ButtonPrimary
						text={t('login')}
						fill
						loading={loading}
						loadingColor={COLORS.WHITE}
						style={{
							borderRadius: 4,
							paddingVertical: 18,
							backgroundColor: phone.length > 6 ? COLORS.GREEN2 : COLORS.GREY,
							marginBottom: 10
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
					{/* <Text style={styles.textFooter}>{t('login-with')}</Text> */}
					<View style={{ alignItems: 'center' }}>
						<View style={styles.iconContainer}>
							{/* <TouchableOpacity activeOpacity={0.7}>
              <AppleIcon />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
              <FacebookIcon />
            </TouchableOpacity> */}
							{/* <TouchableOpacity activeOpacity={0.7}>
								<Image
									style={{ width: 49, height: 50 }}
									source={{
										uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
									}}
								/>
							</TouchableOpacity> */}
						</View>
					</View>
					{/* <Text style={styles.text}>{t('or')}</Text> */}
					<TouchableOpacity
						onPress={onRegisterPress}
						activeOpacity={0.6}
						style={{
							borderBottomWidth: 1,
							borderColor: COLORS.BLACK
						}}
					>
						<Text style={styles.textOne}>{t('signup-now')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}

export default SignInView
