import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionItem from './OptionItem'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function DetailSection({course,enrollCourse,userEnrolledCourse}) {
    console.log("Detail Section: "+course.banner?.url);
    return (
    <View style={{padding:10,borderRadius:15,
    backgroundColor:Colors.WHITE}}>

      {/* BANNER DETAIL COURSE START */}
      <Image source={{uri:course.banner[0].url}}
      style={{width:Dimensions.get('screen').width*0.85,
      height:190,borderRadius:15}}/>

      {/* <Image source={{uri:'https://eu-west-2.graphassets.com/cm33atqm619vu07mlck0rau9y/cm3mma4k3zyho07mvex3x2toy'}}
      style={{width:Dimensions.get('screen').width*0.85,
      height:190,borderRadius:15}}/> */}
      {/* BANNER DETAIL COURSE END */}

      <View style={{padding:10}}>
      <Text style={{fontSize:22,fontFamily:'outfit-medium',
    marginTop:10}}>{course.name}</Text>

    <View>
        <View style={styles.rowStyle}>
        {/* BANYAK CHAPTER START */}        
        <OptionItem icon={'book-outline'} value={course.chapters?.length+" Chapters"}  />
        {/* BANYAK CHAPTER END */}

        {/* DETAIL HOURS START */}
        {/* <OptionItem icon={'md-time-outline'} value={course?.hours?.text}  /> */}
        {/* DETAIL HOURS END */}
        </View>

        <View style={styles.rowStyle}>
        {/* AUTHOR START */}
        {/* <OptionItem icon={'person-circle-outline'} value={course?.author}  /> */}
        {/* AUTHOR END*/}
        
        {/* DETAIL LEVEL START */}
        {/* <OptionItem icon={'cellular-outline'} value={course.level}  /> */}
        {/* DETAIL LEVEL END*/}
        </View>
    </View>

    {/* DESCRIPTION DETAIL COURSE START */}
    <View>
        <Text style={{fontFamily:'outfit-medium',
        fontSize:20}}>Deskripsi</Text>
        <Text style={{padding: 15, fontFamily:'outfit',color:Colors.GRAY,
        lineHeight:23}}>{course?.description?.text}
        </Text>
    </View>
    {/* DESCRIPTION DETAIL COURSE END */}

    <View style={{display:'flex',flexDirection:'row',
    justifyContent:'space-evenly',gap:20}}>
      {userEnrolledCourse?.length==0?  <TouchableOpacity 
        onPress={()=>enrollCourse()}
        style={{padding:15,backgroundColor:'#0365D9',
        borderRadius:10}}>
            <Text style={{fontFamily:'outfit',
        color:Colors.WHITE,textAlign:'center',
        fontSize:17}}>Mulai Belajar</Text>
        </TouchableOpacity>:null}

        {/* <TouchableOpacity style={{padding:15,backgroundColor:'#0365D9',
        borderRadius:10}} onPress={()=>enrollCourse()}>
            <Text style={{fontFamily:'outfit',
        color:Colors.WHITE,textAlign:'center',fontSize:17}}>Mulai Belajar</Text>
        </TouchableOpacity> */}
    </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    rowStyle:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
    }
})