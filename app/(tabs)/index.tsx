import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from "react-native";

import { verifyInstallation } from "nativewind";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/moviecard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/trendingcard";

export default function Index() {
  const router = useRouter();


  const {
        data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: MoviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  verifyInstallation();

  return (
    <SafeAreaView className="flex-1 bg-primary-500 relative">
      {/* Background Image */}
      <Image
        source={images.bg}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 z-10 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        {/* Logo */}
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
          resizeMode="contain"
        />

        {/* Loading / Error / Content */}
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : MoviesError || trendingError ? (
          <Text className="text-white text-center mt-5">
            Error: {MoviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Search Bar */}
            <SearchBar
            onClear={()=>{}}
              onPress={() => {
                router.push("/search");
              }}
              value=""
              placeholder="Search through 300+ movies online"
            />
            {
              trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
              </View>
              )
            }

           
            <FlatList
            horizontal
            data={trendingMovies}
           renderItem={({ item, index }) => <TrendingCard movie={item} index={index}/>}
            keyExtractor={(item)=> item.movie_id.toString()}
            />


             {/* Section Header */}
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>

            {/* Movie Grid */}
            <FlatList
            
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              scrollEnabled={false} // Scroll handled by ScrollView
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
