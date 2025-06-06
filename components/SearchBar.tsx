import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { XMarkIcon } from 'react-native-heroicons/outline' // or any icon you use
interface Props {
  placeholder: string
  value?: string
  onChangeText?: (text: string) => void
  onClear?: () => void
  onPress?: () => void
}

const SearchBar = ({ onPress,placeholder, value, onChangeText, onClear }: Props) => {
  return (
    <View className="flex-row items-center bg-primary-400 opacity-70 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ffffff"
      />
      <TextInput
      onPress={onPress}
        placeholder={placeholder}
        placeholderTextColor="#ffffff"
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-3 text-white text-base"
      />
      {value!.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear} className="ml-2">
          <XMarkIcon color="white" size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar
