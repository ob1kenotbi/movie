//TMDB

const API_KEY = 'api_key=328c283cd27bd1877d9080ccb1604c91';
const BASE_URL = 'https://api.themoviedb.org/3';
const ALPH_URL = 'sort_by=original_title.desc&';
const RATE_URL = 'sort_by=vote_average.desc&';
const DATE_URL = 'sort_by=release_date.desc&'
const API_URL = BASE_URL + '/discover/movie?primary_release_date.lte=2016-12-31&page=1&' + DATE_URL + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');


//function to generate url
function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}api_key=328c283cd27bd1877d9080ccb1604c91`;
    return url;
}

//function to filter
function getFilter(filter){
    if(filter.value === 'release-date'){
        const path = '/discover/movie?primary_release_date.lte=2016-12-31&page=1&sort_by=release_date.desc&';
        const url = generateUrl(path);
        getMovies(url);
        getBookMovies(url);
    }else if(filter.value === 'alphabetical'){
        const path = '/discover/movie?primary_release_date.lte=2016-12-31&page=1&sort_by=original_title.desc&';
        const url = generateUrl(path);
        getMovies(url);
        getBookMovies(url);
    }else if(filter.value === 'rating'){
        const path = '/discover/movie?primary_release_date.lte=2016-12-31&page=1&sort_by=vote_average.desc&';
        const url = generateUrl(path);
        getMovies(url);
        getBookMovies(url);
    }
}

getMovies(API_URL);
getBookMovies(API_URL);

//function to fetch movie api
function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        
        console.log(data);
        showMovies(data.results);
    })
}

//function to show movies
function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
            <img src="${IMG_URL + poster_path}" alt="${title}" data-id="${id}">
            <div class="movie-title">
                <h3>${title}</h3>
                <span class="popularity">${vote_average}</span>
            </div>
        
        `
        main.appendChild(movieEl);
    })
}

//function to fetch api when img clicked
document.onclick = function(event){

    const target= event.target;

    if(target.tagName.toLowerCase() === 'img'){
        const movieId = target.dataset.id;
        console.log('movieId: ', movieId);
        
        const path = `/movie/${movieId}?`;
        const url = generateUrl(path);

        fetch(url).then(res => res.json()).then(data => {
            console.log(data); 
            showDetails(data); 
        })
    }
    
    // document.getElementById('button').style.display = 'inline-block';
}

//function to show details
function showDetails(data){
    main.innerHTML = '';
    
    const movie = data; 
    const {title, poster_path, id, overview , genre, original_language, runtime} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-detail');
    movieEl.innerHTML = `
    
        <img src="${IMG_URL + poster_path}" alt="${title}" data-id="${id}">
        <div class="movie-info">
            <h3>${title}</h3>
            <h3>Synopsis</h3>
            <p>${overview}</p>
            <h3>Genre</h3>
            <p>${genre}</p>
            <h3>Language</h3>
            <p>${original_language}</p>
            <h3>Runtime</h3>
            <p>${runtime}</p>
        </div>
    
    `
    main.appendChild(movieEl);
  
}

//function to list movies to book

function getBookMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        showBookMovies(data.results);
    })
}

function showBookMovies(data){
    
    data.forEach(movie => {
        const list = document.getElementById('movie-list');
        const {title} = movie;
        const movieEl = document.createElement('option');
        movieEl.appendChild(document.createTextNode(`${title}`));
        movieEl.value = `${title}`;
        list.appendChild(movieEl);
    });
}





