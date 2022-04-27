import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useContext, useMemo } from 'react'
import { Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { LocalStorageKeys } from '../constants'
import { Context } from '../store/Store'
import { DispatchAction } from '../store/reducer'
import { AuthenticateStackParams, Screens } from '../types/navigators'
import { Onboarding } from '../types/state'
import { useThemeContext } from '../utils/themeContext'

const onboardingComplete = (state: Onboarding): boolean => {
  return state.DidCompleteTutorial && state.DidAgreeToTerms && state.DidCreatePIN
}

const resumeOnboardingAt = (state: Onboarding): Screens => {
  if (state.DidCompleteTutorial && state.DidAgreeToTerms && !state.DidCreatePIN) {
    return Screens.CreatePin
  }

  if (state.DidCompleteTutorial && !state.DidAgreeToTerms) {
    return Screens.Terms
  }

  return Screens.Onboarding
}
/*
  To customize this splash screen set the background color of the
  iOS and Android launch screen to match the background color of
  of this view.
*/

const Splash: React.FC = () => {
  const [, dispatch] = useContext(Context)
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const { ColorPallet } = useThemeContext()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
  })
  useMemo(() => {
    async function init() {
      try {
        // await AsyncStorage.removeItem(LocalStorageKeys.Onboarding)
        const data = await AsyncStorage.getItem(LocalStorageKeys.Onboarding)

        if (data) {
          const dataAsJSON = JSON.parse(data) as Onboarding
          dispatch({ type: DispatchAction.SetOnboardingState, payload: [dataAsJSON] })

          if (onboardingComplete(dataAsJSON)) {
            navigation.navigate(Screens.EnterPin)
            return
          }

          // If onboarding was interrupted we need to pickup from where we left off.
          const destination = resumeOnboardingAt(dataAsJSON)
          // @ts-ignore
          navigation.navigate({ name: destination })

          return
        }

        // We have no onboarding state, starting from step zero.
        navigation.navigate(Screens.Onboarding)
      } catch (error) {
        // TODO:(jl)
      }
    }
    init()
  }, [dispatch])

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/img/logo-niid2.png')} />
    </SafeAreaView>
  )
}

export default Splash
