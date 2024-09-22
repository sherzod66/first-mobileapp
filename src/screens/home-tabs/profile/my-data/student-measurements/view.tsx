import { View, ScrollView } from 'react-native'

import { StudentHooks } from './hooks'
import { styles } from './style'
import DateTimePicker from '@react-native-community/datetimepicker'
import MeasurementBoxStudent from '../../../../../components/MeasurementBoxStudent'

const StudentMeasurementsView = ({ apprenticeId = '' }) => {
	const { date, setDate, pickerState, setPickerState, user } = StudentHooks(apprenticeId)

	return (
		<View style={styles.container}>
			<ScrollView>
				<MeasurementBoxStudent myMeasurements={user?.myMeasurements ?? []} />
				<View style={{ marginBottom: 100 }} />
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
