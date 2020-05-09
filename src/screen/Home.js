import React from 'react';
import {Button} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <>
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
      />
      <Button
        title="Go to Guide"
        onPress={() =>
          navigation.navigate('Guide', {name: 'AppGuide', title: 'GoodGuide'})
        }
      />
      <Button
        title="Go to Dev"
        onPress={() =>
          navigation.navigate('Dev', {name: 'Dev', title: 'GoodGuide'})
        }
      />
    </>
  );
}
