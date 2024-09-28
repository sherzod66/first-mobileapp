import { View, Text, SafeAreaView, TextInput } from 'react-native'
import { styles } from './style'
import { VerifyCodeHooks } from './hooks'
import { ButtonUnderline } from '../../../components/common'

const VerifyCodeView = () => {
	const {
		code,
		firstInput,
		secondInput,
		thirdInput,
		fourInput,
		onCodeChange,
		onChangePhoneNumber,
		onResend,
		phone,
		loading
	} = VerifyCodeHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ marginBottom: 100 }} />
			<View style={styles.header}>
				<Text style={styles.text}>{'Подтверждение электронной почты'}</Text>
				<Text style={styles.textOne}>{'Мы отправили вам код потвреждения на '}</Text>
				<View style={styles.row}>
					<Text style={styles.textOne}>{phone}</Text>
					<ButtonUnderline
						text='Изменить почту'
						lineStyle={styles.line}
						textStyle={styles.text2}
						style={{ marginLeft: 10 }}
						onPress={onChangePhoneNumber}
					/>
					{/* <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
            <Text style={styles.textTwo}>{"Изменить номер"}</Text>
          </TouchableOpacity> */}
				</View>
			</View>
			<View style={styles.main}>
				<TextInput
					style={styles.input}
					onChangeText={text => {
						text && secondInput.current.focus(code[0])
						onCodeChange(text)
					}}
					ref={firstInput}
					keyboardType='number-pad'
					maxLength={1}
				/>
				<TextInput
					style={styles.input}
					keyboardType='number-pad'
					maxLength={1}
					onChangeText={text => {
						text ? thirdInput.current.focus() : firstInput.current.focus(code[1])
						onCodeChange(text)
					}}
					ref={secondInput}
				/>
				<TextInput
					style={styles.input}
					keyboardType='number-pad'
					maxLength={1}
					onChangeText={text => {
						text ? fourInput.current.focus() : secondInput.current.focus(code[2])
						onCodeChange(text)
					}}
					ref={thirdInput}
				/>
				<TextInput
					style={styles.input}
					keyboardType='number-pad'
					maxLength={1}
					onChangeText={text => {
						text ? fourInput.current.focus() : secondInput.current.focus(code[3])
						!text && thirdInput.current.focus()
						onCodeChange(text)
					}}
					ref={fourInput}
				/>
			</View>
			<View style={styles.footerBox}>
				<Text style={styles.textOne}>{'Вы не получили код?'}</Text>
				<ButtonUnderline
					loading={loading}
					onPress={onResend}
					lineStyle={styles.line}
					text='Отправить еще раз'
					textStyle={styles.text3}
					style={loading && styles.footer}
				/>
				{/* <TouchableOpacity activeOpacity={0.7} style={{ borderBottomWidth: 1 }}>
          <Text style={styles.textTwo}>{"Отправить еще раз"}</Text>
        </TouchableOpacity> */}
			</View>
		</View>
	)
}

export default VerifyCodeView
