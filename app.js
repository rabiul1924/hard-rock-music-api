const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText); //name ta console a parbar jono
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url); //song er url pabar jono
     
    //load data
    fetch(url)
        .then(res => res.json())

        // .then(data => console.log(data)) //details paor jono

        .then(data => displaySongs(data.data)) //direct array parbar jono
        
        .catch(error => displayError('Something Went Wrong!! Please try again later!'));
  
}

//    const searchSongs = async () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // load data
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
//  }


const displaySongs = songs => {
    // console.log(songs); //direct array parbar jono

    const songContainer = document.getElementById('song-container');

    // songs.forEach(song => console.log(song.title)) //song title name gulo pau jabe
    
    songContainer.innerHTML = ''; //clean all and open new search

    songs.forEach(song => {
        // console.log(song) //details pabar jono //important
        const songDiv = document.createElement('div');
        songDiv.className ="single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick ="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`;
        songContainer.appendChild(songDiv);  //title gula main website a ashbe
    })
}



// const getLyric = (artist, title) => {
//     console.log(artist, title); //lyric button click korla artist&title name ashbe 
// }

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     // console.log(url); //lyric button click korla url ashbe
//     fetch(url)
//     .then(res => res.json())
//     // .then(data => console.log(data.lyrics))
//     .then(data => displayLyrics(data.lyrics))
// }


const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}


const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}


const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}