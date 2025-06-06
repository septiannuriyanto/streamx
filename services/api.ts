


export const TMDB_CONFIG = {
BASE_URL : 'https://api.themoviedb.org/3',
API_KEY : process.env.EXPO_PUBLIC_TMDB_API_KEY,
headers:{
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`

}

}


export const fetchMovies = async ({ query } : { query : string })=>{
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,{
        method: 'GET',
        headers : TMDB_CONFIG.headers,
    })

    if(!response.ok){
        // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);

    }
    const data = await response.json();
    console.log(data)
    return data.results;
}

export const fetchMovieDetails = async (movieId:string) : Promise<MovieDetails>=>{
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_keys=${TMDB_CONFIG.API_KEY}`, {
            method : 'GET',
            headers: TMDB_CONFIG.headers,
        })

        if(!response.ok) throw new Error('Failed to fetch movie details')
            const data = await response.json();
        return data;
        } catch (error) {
        console.error(error);
        throw error;
    }
}

// const url = 'https://api.themoviedb.org/3';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjcxZWVhMWEwMTE4ZmQ0YjI2Y2UyMzFkNzJkZWUyYiIsIm5iZiI6MTc0OTA4MjIzNi4zOTYsInN1YiI6IjY4NDBlMDdjYWE4NTRjY2Q0YTUzOTExYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NdU6TNE1OH3fziwun5Sk5yM_8PsKcrJG82Eq34pOufg'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));