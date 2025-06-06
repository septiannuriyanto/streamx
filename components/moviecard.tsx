import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({ id, poster_path, title, vote_average , release_date}: Movie) => {
  return (
    <Link href={`/movies/${id}` as any} asChild>
        <TouchableOpacity
            className='w-[30%]'>
                <Image
                    source={{
                        uri: poster_path
                        ?
                        `https://image.tmdb.org/t/p/w500${poster_path}`
                        :
                        `https://placehold.cos/600x400/1a1a1a/ffffff.png`
                    }}
                    className='w-full h-52 rounded-lg'
                    resizeMode='cover'
                    ></Image>
                    <Text
                    className='text-sm font-bold text-white'
                    numberOfLines={1}
                    >{title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-1">
{Array.from({ length: 5 }).map((_, index) => {
  const rawRating = vote_average ?? 0;
  const rating = rawRating / 2; // Convert from 10 to 5-star scale
  const isFull = index + 1 <= Math.floor(rating);
  const isHalf = !isFull && index < rating;

  return (
    <Image
      key={index}
      source={
        isFull
          ? icons.starFilled
          : isHalf
          ? icons.starHalf
          : icons.starOutline
      }
      className="w-4 h-4"
    />
  );
})}

  
</View>
<View className='flex-row items-center justify-between'>
    <Text className='text-xs text-gray-400 font-medium mt-1'>
        {release_date?.split('-')[0]}
    </Text>
</View>
            </TouchableOpacity>
    </Link>
  )
}

export default MovieCard