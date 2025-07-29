

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  genre_ids: number[];
  original_language: string;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  images?: {
    backdrops: Image[];
    logos: Image[];
    posters: Image[];
  };
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MoviesByDateResponse {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}

export interface TmdbErrorResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}


export type MovieSortOption =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'original_title.asc'
  | 'original_title.desc';

export type TimeWindow = 'day' | 'week';


export interface MovieSearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: number;
  region?: string;
  year?: number;
}

export interface DiscoverMoviesParams {
  page?: number;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  primary_release_year?: number;
  region?: string;
  sort_by?: MovieSortOption;
  year?: number;
  with_genres?: string;
  with_original_language?: string;
}
