import { View, ScrollView, ActivityIndicator } from 'react-native'

import { StudentHooks } from './hooks'
import { styles } from './style'
import DateTimePicker from '@react-native-community/datetimepicker'
import MeasurementBoxStudent from '../../../../../components/MeasurementBoxStudent'
import { COLORS } from '../../../../../constants/COLORS'

const StudentMeasurementsView = ({ apprenticeId = '' }) => {
	const { date, setDate, pickerState, setPickerState, user, isLoading } = StudentHooks(apprenticeId)

	return (
		<View style={styles.container}>
			<ScrollView>
				{isLoading ? (
					<ActivityIndicator style={{ marginTop: 50 }} size={'large'} color={COLORS.WHITE} />
				) : (
					<>
						<MeasurementBoxStudent myMeasurements={user?.myMeasurements ?? []} />
						<View style={{ marginBottom: 100 }} />
					</>
				)}
			</ScrollView>
			{!!pickerState && (
				<DateTimePicker
					mode={pickerState}
					value={date}
					onChange={e => {
						setPickerState(pickerState === 'time' ? 'date' : null)
						setDate(new Date(e.nativeEvent.timestamp))
					}}
				/>
			)}
		</View>
	)
}

export default StudentMeasurementsView
