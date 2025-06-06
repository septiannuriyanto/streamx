import { Text, ImageBackground, Image, View, ImageSourcePropType, SafeAreaView } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const _Layout = () => {

  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0d23' }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarStyle: {
            backgroundColor: '#0f0d23',
            borderRadius: 36,
            marginHorizontal: 20,
            marginBottom: insets.bottom + 10,
            height: 52,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth: 0,
            borderColor: '#0f0d23',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} title='Home' />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.search} title='Search' />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.save} title='Saved' />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.person} title='Profile' />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}



export default _Layout

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {

  if (focused) {
    return <ImageBackground
      source={images.highlight}
      className='flex flex-row w-full flex-1 min-w-[114px] min-h-[60px] mt-[30px] justify-center items-center rounded-full overflow-hidden'
    >
      <Image
        source={icon}
        tintColor='#151312'
        className='size-5' />
      <Text className='text-black text-base font-semibold ml-2'>{title}</Text>
    </ImageBackground>
  }
  return (
    <View className='size-full justify-center items-center mt-[31px] rounded-full'>
        <Image
        source={icon}
        tintColor="#A8B5D8"
        className='size-5'
        ></Image>
    </View>
  )
}
