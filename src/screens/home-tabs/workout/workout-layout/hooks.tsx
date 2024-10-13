import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const WorkoutLayoutHooks = () => {
	const [activeTab, setActiveTab] = useState(0)
	const { t } = useTranslation()

	return { activeTab, setActiveTab, t }
}
