import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../../Services'
import SubHeading from '../SubHeading';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import CourseItem from './CourseItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function CourseList({ level }) {

    const [courseList, setCourseList] = useState([]);

    const navigation=useNavigation();

    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = () => { 
        getCourseList(level).then(resp => {
            setCourseList(resp?.courses)
            console.log("Course List: ", resp); 

            resp?.courses?.forEach((course, index) => {
                console.log(`Course ${index + 1} - Banner:`, course?.banner);
            });
        })
    }

    return (
        <View style={{marginTop:10}}>

            {/* <SubHeading text={level+' Kursus'} color={level=='Basic'&&Colors.WHITE} /> */}
            <SubHeading text={'Materi Pembelajaran'} color={level=='Basic'&&Colors.WHITE} />
            <FlatList
                data={courseList}
                key={courseList.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('couse-detail',{
                        course:item
                    })}>
                        <CourseItem item={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}