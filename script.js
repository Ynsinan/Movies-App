
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d5f1fb0da822248b9f4b7c84fdf90062&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const main = document.getElementById('main');
const form = document.getElementById('form')
const search = document.getElementById('search')


//initially get favorite movie
getMovies(APIURL);
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
    showMovies(respData.results);
}



function showMovies(movies) {
    //clear main
    main.innerHTML = '';

    movies.forEach((movie) => {

        const { poster_path, title, vote_average, overview } = movie;


        const movieElements = document.createElement('div');
        movieElements.classList.add('movie');

        if (poster_path !== null) {
            movieElements.innerHTML =
                `
            <img src="${IMGPATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h4>Overview:</h4>
            ${overview}
            </div>
        `;
            main.appendChild(movieElements);
        }


    });

}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";

    }
});