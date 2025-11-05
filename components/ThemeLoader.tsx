import {ActivityIndicator, View, Modal, StyleSheet} from 'react-native'

interface ThemedLoaderProps {
  loading?: boolean
}

const ThemedLoader = ({ loading = false }: ThemedLoaderProps) => {
  return (
    <Modal 
      visible={loading} 
      transparent 
      animationType='fade' 
      statusBarTranslucent
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color='#4371d6' />
      </View>
    </Modal>
  )
}

export default ThemedLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});