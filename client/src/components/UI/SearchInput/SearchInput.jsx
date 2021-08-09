import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = () => {
    const [searchActive, setSearchActive] = useState(false);
    const searchInputRef = useRef();

    useEffect(() => {
        if (searchActive) {
            searchInputRef.current.focus();
        }
    }, [searchActive]);

    const handleToggleSearch = () => setSearchActive((prevState) => !prevState);

    return (
        <div className={`search-box${searchActive ? ' search-box--active' : ''}`}>
            <div className="search-box__icon menu-icon" onClick={handleToggleSearch}>
                <AiOutlineSearch />
            </div>
            {searchActive ? <input className="search-box__input" type="text" placeholder="Titles, people, genres" ref={searchInputRef} /> : null}
        </div>
    );
};

export default SearchInput;
