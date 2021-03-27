import React, { useState, useEffect } from 'react';
import axios from "axios";

import FilterBar from 'comps/FilterBar';
import AddPlaylist from 'comps/AddPlaylist';

import {
    useHistory
} from 'react-router-dom';




const SearchPlaylist = () => {


    const history = useHistory();



    const [playlist, setPlaylist] = useState([]);
    const [allplaylists, setAllPlaylists] = useState([]);

    const getPlaylists = async () => {

        var resp = await axios.get("http://localhost:4200/api/playlists");
        var music = resp.data.playlists.slice(0,3);
        setPlaylist(music)
 
        setAllPlaylists(resp.data.playlists); 
        console.log(resp.data.playlists);

    }

    const FilterSongs = (text) => {
        
        setPlaylist(
            allplaylists.filter((o) => {
                return o.name.includes(text);
            })
        )
    }

    useEffect(() => {
        getPlaylists();
    },[])

    return <div className="search-cont">
        <FilterBar
            placeholder='Search for Playlist'
            onChange={(e) => {
                FilterSongs(e.target.value);
            }}  
            onClick={() => history.push("/PlaylistAdd")}  
        />
        <div className="as-songCont">
            {playlist.map((o) => {
                return (
                    <AddPlaylist
                    viewPlaylist={() => history.push("/ViewPlaylist/"+o.id)}
                    playlistname={o.name}
                        // username={o.artist.name}
                        // not too sure cuz there are objects inside objects
                    />
                )
            })}
        </div>
    </div>
}

//     return <div className="search-cont">
//         <FilterBar
//             placeholder='Search for Playlists'
//             onChange={(e) => {
//                 // filter
//             }}  
//             onClick={() => history.push("/Home")}  
//         />
//     </div>
// }

export default SearchPlaylist;