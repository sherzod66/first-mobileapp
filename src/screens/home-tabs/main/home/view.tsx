import {
	View,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Dimensions,
	Text
} from 'react-native'
import { styles } from './style'
import { Box } from '../../../../components/common'
import { Assets } from '../../../../utils/requireAssets'
import { MainHomeHooks } from './hooks'
import { ROUTES } from '../../../../navigation/ROUTES'
import { COLORS } from '../../../../constants/COLORS'
import Carousel from 'react-native-snap-carousel'
import AdItem from '../../profile/ads/ad-item'
import { useMemo } from 'react'

const sliderWidth = Dimensions.get('window').width
const itemWidth = sliderWidth - 30

const MainHomeView = () => {
	const { onPress, ads, fetchAds, t, i18n } = MainHomeHooks()
	const data = useMemo(
		() => [
			{
				title: t('exercise-base'),
				text: t('exercise-description'),
				cover: Assets.images.cover1,
				to: ROUTES.TABS.MAIN.EXERCISES
			},
			{
				title: t('training-programs'),
				text: t('training-description'),
				cover: Assets.images.cover2,
				to: ROUTES.TABS.MAIN.WORKOUT_PLANS
			},
			{
				title: t('meal-plans'),
				text: t('meal-description'),
				cover: Assets.images.cover3,
				to: ROUTES.TABS.MAIN.NUTRITION_PLANS
			},
			{
				title: t('trainers'),
				text: t('trainer-description'),
				cover: Assets.images.cover4,
				to: ROUTES.TABS.MAIN.TRAINERS
			},
			{
				title: t('fitness-clubs'),
				text: t('fitness-club-description'),
				cover: Assets.images.fitness,
				to: ROUTES.TABS.MAIN.FITNESS_CLUBS
			}
		],
		[i18n.language]
	)

	return (
		<View style={styles.container}>
			{/* <StatusBar backgroundColor={"transparent"} /> */}
			<StatusBar backgroundColor={COLORS.BLACK} />

			<SafeAreaView />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginBottom: 110, marginHorizontal: 15 }}>
					<Carousel
						data={ads}
						autoplay={true}
						autoplayDelay={4000}
						loop={true}
						renderItem={({ ...rest }) => <AdItem {...rest} fetchAds={fetchAds} />}
						sliderWidth={itemWidth}
						itemWidth={itemWidth}
					/>
					{data.map((e, i) => (
						<TouchableOpacity key={i} activeOpacity={0.7} onPress={() => onPress(e.to as never)}>
							<Box
								cover={e.cover}
								title={e.title}
								text={e.text}
								containerStyle={{ marginTop: 10 }}
							/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	)
}

export default MainHomeView
