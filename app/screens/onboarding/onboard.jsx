import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, H1, H2, H3, H4, H5, H6, Image, Paragraph, Separator, XStack, YStack } from '@tamagui/core';
import { ChevronRight } from '@tamagui/lucide-icons';

const OnboardingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <YStack space="$4" alignItems="center" padding="$4">
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            width={150} 
            height={150}
            borderRadius={75}
            marginBottom="$4"
          />
          <H1 color="$blue10">Bi envenue sur notre application</H1>
          <Paragraph textAlign="center" color="$gray10">
            Découvrez une nouvelle façon de faire vos hachats en ligne. Parcourez nos produits et trouvez ce qui vous convient le mieux.
          </Paragraph>
          <Separator marginVertical="$4" />
          <XStack space="$2" justifyContent="center">
            <Button iconAfter={<ChevronRight size="$1" />} onPress={() => console.log('Commencer')}>
              Commencer
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default OnboardingScreen;