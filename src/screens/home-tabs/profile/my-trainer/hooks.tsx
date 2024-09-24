import { useState } from 'react'
import { selectUser } from '../../../../store/slices/appSlice'
import { useRedux } from '../../../../store/hooks'
import { Trainer, User } from '../../../../types'
import { useNavigation } from '@react-navigation/native'
import { TrainersScreenNavigationProp } from '../users/hooks'
import { MAIN } from '../../../../navigation/ROUTES'

export const MyTrainerHooks = () => {
	const [user, dispatch] = useRedux(selectUser)
	const [search, setSearch] = useState('')

	return { user, search, setSearch }
}
