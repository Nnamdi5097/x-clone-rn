import { useClerk } from '@clerk/clerk-expo';
import { View, Text, Button } from 'react-native';
import React from 'react';

const Homescreen = () => {
    const {signOut}=useClerk()
  return (
    <View>
      <Text>Homescreen </Text>

    <Button onPress={()  => signOut()} title='logout'></Button>  
    </View>
  );
};

export default Homescreen;