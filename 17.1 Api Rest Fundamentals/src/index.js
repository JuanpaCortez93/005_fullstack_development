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

//Get Trending Movies Preview
async function getTrendingMoviesPreview(){
    const {data} = await api(`trending/movie/day`);
    const movies = data.results;
    
    trendingMoviesPreviewList.innerHTML = "";

    movies.forEach(movie => {
        const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

//Get Categories
async function getCategories() {
    const {data} = await api(`genre/movie/list`);
    const categories = data.genres;

    categoriesPreviewList.innerHTML = "";
    
    categories.forEach(category => {
        const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');

        const genreContainer = document.createElement('div');
        genreContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}` );

        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        genreContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(genreContainer);
    });
    
}
