import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { images } from '@/constants/images';
import MovieCard from '@/components/moviecard';
import { useRouter } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [latestQuery, setLatestQuery] = useState(''); // <- add this

  const router = useRouter();

  const {
    data: movies,
    loading,
    error,
    refetch
  } = useFetch(() =>
    fetchMovies({
      query: debouncedQuery,
    }), false
  );

  const lastUpdateRef = useRef<{ query: string; movieId: string } | null>(null);
  const didSearchRef = useRef(false);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      setDebouncedQuery(normalizedQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Trigger refetch on new debouncedQuery
  useEffect(() => {
    if (debouncedQuery) {
      didSearchRef.current = true;
      refetch().then(() => {
        setLatestQuery(debouncedQuery); // <- mark refetch complete
      });
    }
  }, [debouncedQuery]);

  // Track new searches (only when data matches latest query)
  useEffect(() => {
    if (
      latestQuery &&
      latestQuery === debouncedQuery && // ensure match
      movies?.length > 0 &&
      didSearchRef.current
    ) {
      const topMovie = movies[0];
      const current = { query: latestQuery, movieId: topMovie.id };
      const last = lastUpdateRef.current;

      const isNewSearch =
        !last ||
        last.query !== current.query ||
        last.movieId !== current.movieId;

      if (isNewSearch) {
        updateSearchCount(latestQuery, topMovie);
        lastUpdateRef.current = current;
        didSearchRef.current = false;
      }
    }
  }, [movies, latestQuery]);

  return (
    <View className="flex-1 bg-primary-500">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom: 140
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(e: string) => setSearchQuery(e)}
                onClear={() => {
                  setSearchQuery('');
                  setDebouncedQuery('');
                  setLatestQuery('');
                  lastUpdateRef.current = null;
                  didSearchRef.current = false;
                }}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && debouncedQuery && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Result for: <Text className="text-primary-200">{debouncedQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? 'No Movies Found'
                  : 'Search For a Movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
