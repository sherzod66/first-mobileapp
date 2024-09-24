import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { styles } from './style'

import { MyTrainerHooks } from './hooks'
import { Header, InputPrimary } from '../../../../components/common'
import { COLORS } from '../../../../constants/COLORS'
import TrainerBoxByUser from '../../../../components/TrainerBoxByUser'
import { imageLink } from '../../../../utils/imageLink'

const MyTrainerView = () => {
	const { user, search, setSearch } = MyTrainerHooks()
	return (
		<View style={styles.container}>
			<SafeAreaView />
			<Header title={'Мои тренера'} />
			<Text style={styles.text}>Тренера: {user?.myTrainers.length}</Text>
			<InputPrimary
				value={search}
				onChange={value => setSearch(value)}
				placeholder={'Поиск'}
				placeholderColor={COLORS.WHITE}
				containerStyle={{
					backgroundColor: COLORS.GREY3,
					marginVertical: 10,
					borderRadius: 10
				}}
				inputStyle={{
					backgroundColor: COLORS.GREY3,
					color: COLORS.WHITE
				}}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				{user && (
					<View style={{ marginBottom: 100 }}>
						{user.myTrainers.map((item, i) => (
							<TouchableOpacity key={user._id} activeOpacity={0.7} style={{ marginBottom: 10 }}>
								<TrainerBoxByUser
									isFitness={false}
									name={item.name}
									avatar={{ uri: imageLink(item.avatar) }}
									city={item.phoneNumber}
									onUpdate={() => console.log('j')}
								/>
							</TouchableOpacity>
						))}
					</View>
				)}
			</ScrollView>
		</View>
	)
}

export default MyTrainerView
