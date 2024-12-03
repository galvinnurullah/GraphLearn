ProfileScreen.js
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import MyCourse from './MyCourse';
import { useNavigation } from '@react-navigation/native'


export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigation=useNavigation();


  return (
    <View style={styles.container}>
      {/* Header Profil */}
      <View style={styles.profile}>
        <Text style={styles.profileText}>Profil</Text>
      </View>
      
      {/* Foto Profil dan Nama */}
      <View style={styles.profileSection}>
        {user && (
          <>
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{user.fullName}</Text>
          </>
        )}
      </View>

      {/* Menu Pilihan */}
      <View style={styles.menuContainer}>
        {/* Materi Saya */}
        <TouchableOpacity style={styles.menuItem}
          onPress={()=>navigation.navigate('my-course', {})}
        >
          <Ionicons name="book-outline" size={24} color={Colors.PRIMARY} />
          <Text style={styles.menuText}>Materi Saya</Text>
        </TouchableOpacity>
        
        {/* Keluar */}
        <TouchableOpacity style={styles.menuItem} onPress={() => signOut()}>
          <Ionicons name="exit-outline" size={24} color={Colors.PRIMARY} />
          <Text style={styles.menuText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    height: 160,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'flex-start', 
    padding: 30,
  },
  profileText: {
    fontFamily: 'outfit-bold',
    color: Colors.WHITE,
    fontSize: 30,
    textAlign: 'left', 
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
});