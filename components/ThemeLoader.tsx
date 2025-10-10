import {ActivityIndicator, View} from 'react-native'

const ThemedLoader = () => {
  // const colorScheme = useColorScheme()
  // const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ActivityIndicator size="large" color='#4371d6' />
    </View>
  )
}

export default ThemedLoader