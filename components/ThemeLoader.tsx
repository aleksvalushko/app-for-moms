import {ActivityIndicator, View, Modal, ViewStyle} from 'react-native'

interface ThemedLoaderProps {
  loading?: boolean
}

const ThemedLoader = ({ loading = false }: ThemedLoaderProps) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  };

  return (
    <Modal 
      visible={loading} 
      transparent 
      animationType='fade' 
      statusBarTranslucent
    >
      <View style={containerStyle}>
        <ActivityIndicator size="large" color='#4371d6' />
      </View>
    </Modal>
  )
}

export default ThemedLoader