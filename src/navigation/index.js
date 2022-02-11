import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MyShiftScreen from '../tabs/myShiftScreen';
import AvailableShiftScreen from '../tabs/availableShiftScreen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const customTabBarStyle = {
  showLabel: true,
  activeTintColor: colors.color04,
  inactiveTintColor: colors.color4F,
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 18},
          tabBarActiveTintColor: colors.color04,
          tabBarInactiveTintColor: colors.color4F,
        }}>
        <Tab.Screen name="My shift" component={MyShiftScreen} />
        <Tab.Screen name="Available shift" component={AvailableShiftScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
