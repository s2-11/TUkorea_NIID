import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ContactDetails from '../screens/ContactDetails'
import ListContacts from '../screens/ListContacts'
import { ContactStackParams, Screens } from '../types/navigators'
import { useThemeContext } from '../utils/themeContext'

import { createDefaultStackOptions } from './defaultStackOptions'

const ContactStack: React.FC = () => {
  const Stack = createStackNavigator<ContactStackParams>()
  const { t } = useTranslation()
  const theme = useThemeContext()
  const defaultStackOptions = createDefaultStackOptions(theme)
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen name={Screens.Contacts} component={ListContacts} options={{ headerBackTitle: t('Global.Back') }} />
      <Stack.Screen name={Screens.ContactDetails} component={ContactDetails} />
    </Stack.Navigator>
  )
}

export default ContactStack
