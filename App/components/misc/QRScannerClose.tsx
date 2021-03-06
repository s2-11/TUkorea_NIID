import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useThemeContext } from '../../utils/themeContext'

interface Props {
  onPress?: () => void
}

const CloseButton: React.FC<Props> = ({ onPress }) => {
  const { ColorPallet } = useThemeContext()
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    button: {
      padding: 16,
    },
  })
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="close" size={24} color={ColorPallet.grayscale.white}></Icon>
      </TouchableOpacity>
    </View>
  )
}

const QRScannerClose: React.FC<Props> = ({ onPress }) => {
  return <CloseButton onPress={onPress}></CloseButton>
}

export default QRScannerClose
