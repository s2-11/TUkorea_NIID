import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getVersion, getBuildNumber } from 'react-native-device-info'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { SafeAreaScrollView, Text } from '../components'
import { Screens, SettingStackParams, Stacks } from '../types/navigators'
import { useThemeContext } from '../utils/themeContext'

type SettingsProps = StackScreenProps<SettingStackParams>

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { borderRadius, ColorPallet, TextTheme } = useThemeContext()
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 20,
    },
    groupHeader: {
      ...TextTheme.normal,
      marginBottom: 8,
    },
    rowGroup: {
      borderRadius: borderRadius * 2,
      backgroundColor: ColorPallet.brand.secondaryBackground,
      marginBottom: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
    },
  })
  return (
    <SafeAreaScrollView>
      <View style={styles.container}>
        <Text style={styles.groupHeader}>{t('Settings.AppPreferences')}</Text>
        <View style={styles.rowGroup}>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate(Screens.Language)}>
            <Text>{t('Settings.Language')}</Text>
            <Icon name={'chevron-right'} size={25} color={ColorPallet.notification.infoText} />
          </TouchableOpacity>
        </View>

        <Text style={styles.groupHeader}>{t('Settings.AboutApp')}</Text>
        <View style={styles.rowGroup}>
          <View style={styles.row}>
            <Text>{t('Settings.Version')}</Text>
            <Text>{`${getVersion()}-${getBuildNumber()}`}</Text>
          </View>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.getParent()?.navigate(Stacks.ContactStack, { screen: Screens.Contacts })}
          >
            <Text>{t('RootStack.Contacts')}</Text>
            <Icon name={'chevron-right'} size={25} color={ColorPallet.notification.infoText} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaScrollView>
  )
}

export default Settings
