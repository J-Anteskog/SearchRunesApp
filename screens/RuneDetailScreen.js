import { Image, ScrollView, StyleSheet, Text } from 'react-native'

export default function RuneDetailScreen ({ route }) {
  const { rune } = route.params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {rune.name}
      </Text>
      <Image source={rune.image} style={styles.image} resizeMode='contain' />
      <Text style={styles.meaningTitle}>Meaning:</Text>
      <Text style={styles.meaningText}>
        {rune.meaning}
      </Text>
      <Text style={styles.interpretation}>
        {rune.interpretation}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1a1a2e' // Mörkblå-lila
  },
  title: {
    fontSize: 28,
    fontFamily: 'CinzelDecorative',
    color: '#e0c097', // Guldaktig
    marginBottom: 20
  },

  meaningTitle: {
    fontSize: 18,
    color: '#e0c097', // Ljusare färg
    marginTop: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  meaningText: {
    fontSize: 16,
    color: '#e0c097',
    textAlign: 'center',
    lineHeight: 24
  },
  interpretation: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#e0c097',
    marginTop: 20,
    lineHeight: 24,
    textAlign: 'center'
  },
})
