import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import MyCourse from '../Screen/MyCourse';
import LeaderBoard from '../Screen/LeaderBoard';
import ProfileScreen from '../Screen/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreenNavigation from './HomeScreenNavigation';

const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
   <Tab.Navigator screenOptions={{
    headerShown:false
   }}>

   {/* HOME */}
    <Tab.Screen name='home' component={HomeScreenNavigation} 
    options={{
        tabBarIcon:({color,size})=>(
            <Ionicons name="home" size={size} color={color} />
        )
    }}
    />

    {/* MY COURSE */}
    <Tab.Screen name='Kursus' component={MyCourse} 
     options={{
        tabBarIcon:({color,size})=>(
            <Ionicons name="book" size={size} color={color} />
        )
    }}/>

    {/* LEADERBOARD */}
    {/* <Tab.Screen name='leaderboard' 
    component={LeaderBoard} 
    options={{
        tabBarIcon:({color,size})=>(
            <MaterialIcons name="leaderboard" size={size} color={color} />
        )
    }}/> */}

    {/* PROFILE */}
    <Tab.Screen name='Profile' 
    component={ProfileScreen} 
    options={{
        tabBarIcon:({color,size})=>(
            <MaterialIcons name="supervised-user-circle" size={size} color={color} />
        )
    }}/>
   </Tab.Navigator>
  )
}