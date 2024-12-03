import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomeScreen/CourseList'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services'
import { UserPointsContext } from '../Context/UserPointsContext'
import CourseProgress from '../Components/HomeScreen/CourseProgress'

export default function HomeScreen() {
  const { isLoaded,signOut } = useAuth();
  const {user}=useUser();
  const {userPoints,setUserPoints}=useContext(UserPointsContext);
  useEffect(()=>{
    user&&createUser();
  },[user])
  const createUser=()=>{
     if(user) 
        {
        createNewUser(user.fullName,user.primaryEmailAddress.emailAddress,user.imageUrl)
        .then(resp=>{
          if(resp)
          GetUser()
        })
      }
  }

  const GetUser=()=>{
    getUserDetail(user.primaryEmailAddress.emailAddress).then(resp=>{
      console.log("--",resp.userDetail?.point);
      setUserPoints(resp.userDetail?.point)
    })
  }
  return (
    <ScrollView>
      
      {/* Bagian yang ada pencarian kursus sama Welcome User START */}
      <View style={{backgroundColor:'#0365D9',height:250,
      padding:20}}>
      <Header userPoints={userPoints}/>
      </View>
      {/* Bagian yang ada pencarian kursus sama Welcome User END */}

      {/* Bagian Bawah dari View di atas START */}
      <View style={{paddingLeft:20,paddingTop:20}}>
        <View style={{marginTop:-90}}>
        <CourseProgress  />
        <CourseList level={'Basic'} />
        </View>
        {/* <CourseList level={''} /> */}
      </View>
      {/* Bagian Bawah dari View di atas END*/}
      
    </ScrollView>
  )
}