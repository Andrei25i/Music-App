import { useRef, useState } from 'react';
import fetchResults from '../yt_api/fetchResults';
import Results from './Results';

import search_icon from '../assets/search_icon.svg';
import song_icon from '../assets/song_icon.svg';
import no_results_icon from '../assets/no_results_icon.svg';
import Loading from './Loading';
import { ButtonBase } from '@mui/material';

import './styles/Search.css';

const Search = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef();
  
    const handleSearch = async () => {
        const query = inputRef.current.value;
        if (!query) return;
        setIsLoading(true);
        setResults([]);
        const results = await fetchResults(query);
        setResults(results);
        setIsLoading(false);
    }

    let resultsMessage,
    p_styles = { justifyContent: "center", textAlign: "center", fontWeight: 500 },
    img_styles = { width: 50, alignSelf: 'center' };
    if (!results) {
        resultsMessage = 
            <div className='results-list shadow' style={p_styles}>
                <p>No results... Try Again...</p>
                <img src={no_results_icon} alt="No Results" style={img_styles} />
            </div>
    } else if (results?.length) { 
        resultsMessage = <Results results={results} />
    } else if (isLoading) {
        resultsMessage = 
            <div className='results-list shadow' style={{justifyContent: "center"}}>
                <Loading />
            </div>
    } else {
        resultsMessage = 
            <div className='results-list shadow' style={p_styles}>
                <p>Results will appear here...</p>
                <img src={song_icon} alt="Results List" style={img_styles} />
            </div>
    }

    return (
        <>
            <div className='search-bar shadow'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                    inputRef.current.blur();
                    inputRef.current.value = '';
                }}>
                    <input ref={inputRef} type="search" placeholder='Search...' />
                </form>
                
                <div className='button'>
                    <ButtonBase className='search-button' onClick={handleSearch}>
                        <img src={search_icon} alt="Search" />
                    </ButtonBase>
                </div>
            </div>

            { resultsMessage }
        </>
    )
}

export default Search;