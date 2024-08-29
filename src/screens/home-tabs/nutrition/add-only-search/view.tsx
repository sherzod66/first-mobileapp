import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { ButtonPrimary, Header, InputPrimary } from '../../../../components/common'
import { SearchHooks } from './hooks'
import { COLORS } from '../../../../constants/COLORS'

const AddOnlySearch = () => {
	const { foundProduct, loading, selected, onAdd, onSelect, setSearchValue } = SearchHooks()
	return (
		<View style={styles.container}>
			<SafeAreaView />
			<Header />
			<InputPrimary
				onChange={v => setSearchValue(v)}
				placeholder={'Поиск'}
				placeholderColor={COLORS.WHITE}
				containerStyle={{
					backgroundColor: COLORS.GREY3,
					marginTop: 0,
					borderRadius: 10
				}}
				autoFocus={true}
				inputStyle={{
					backgroundColor: COLORS.GREY3,
					color: COLORS.WHITE
				}}
				onSearch={() => console.log('')}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				{foundProduct.map((p, pI) => (
					<View style={styles.box} key={`${p._id}/${pI}`}>
						<View style={styles.header}>
							<View>
								<Text style={styles.text1}>{p.name.ru}</Text>
								<Text style={styles.text2}>{`на 100гр. продукта`}</Text>
							</View>
							<TouchableOpacity style={styles.checkbox} onPress={() => onSelect(p)}>
								{selected.find(s => s._id === p._id) && <View style={styles.checkboxFilled} />}
							</TouchableOpacity>
						</View>
						<View style={styles.main}>
							<View>
								<Text style={styles.text3}>
									{'Б - '}
									<Text style={styles.text4}>{`${p.protein} гр`}</Text>
								</Text>
								<Text style={styles.text3}>
									{'Ж - '}
									<Text style={styles.text4}>{`${p.oil} гр`}</Text>
								</Text>
								<Text style={styles.text3}>
									{'У - '}
									<Text style={styles.text4}>{`${p.carb} гр`}</Text>
								</Text>
							</View>
							<Text style={styles.text5}>{`${p.calories} каллорий`}</Text>
						</View>
					</View>
				))}
				<View style={{ marginBottom: 100 }} />
			</ScrollView>
			{selected.length > 0 && (
				<ButtonPrimary
					fill
					text='Добавить'
					onPress={onAdd}
					loading={loading}
					style={styles.btn}
					textStyle={styles.btnText}
					loadingColor={COLORS.WHITE}
					disabled={!selected.length}
				/>
			)}
		</View>
	)
}

export default AddOnlySearch
