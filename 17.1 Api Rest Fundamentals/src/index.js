//Axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },  
    params: {
        'api_key': API_KEY
    }
});


// Utils 
function createMovies(movies, container){
    container.innerHTML = "";

    movies.forEach(movie => {
        const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}


function createCategories(categories, container){
    container.innerHTML = '';

    categories.forEach(category => {
        const genreContainer = document.createElement('div');
        genreContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}` );
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });

        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        genreContainer.appendChild(categoryTitle);
        container.appendChild(genreContainer);
    });
}


//Callbacks
//Get Trending Movies Preview
async function getTrendingMoviesPreview(){
    const {data} = await api(`trending/movie/day`);
    const movies = data.results;
    
    createMovies(movies, trendingMoviesPreviewList);
}

//Get Trending Movies Preview
async function getTrendingMovies(){
    const {data} = await api(`trending/movie/day`);
    const movies = data.results;
    
    createMovies(movies, genericSection);
}

//Get Categories
async function getCategories() {
    const {data} = await api(`genre/movie/list`);
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);    
}

async function getMoviesByCategory(id){
    const {data} = await api(`discover/movie`, {
        params: {
            with_genres: id
        }
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getMoviesBySearch(searchData){
    const {data} = await api(`search/movie`, {
        params: {
            query: searchData
        }
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}


async function getMovie(id){
    const {data: movie} = await api(`movie/${id}`);
    
    const movieUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    headerSection.style.background = `url(${movieUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMovies(id);

}

async function getRelatedMovies(id) {
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);

}