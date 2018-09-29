// write a function to retrieve a blob of json
// make an ajax request - fetch funtion
//https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//     fetch('https://rallycoding.herokuapp.com/api/music_albums') //Creates and returns a promise
//         .then(res => res.json())
//         .then(json => console.log(json));
// }

// fetchAlbums();

//easier funtion
const fetchAlbums = async () => {
	const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
	const json = await res.json();

	console.log(json);
};

fetchAlbums();

// async function fetchAlbums() {
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//     const json = await res.json();

//     console.log(json);
// }

// fetchAlbums();
