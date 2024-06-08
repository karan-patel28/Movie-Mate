import { useState } from 'react';
import WatchList from './WatchlistTab';
import LikedMovies from './LikedMoviesTab';

function UserMovies() {
    const [activeTab, setActiveTab] = useState('watchlist'); // Default to watchlist

    return (
        <div role="tablist" className="tabs tabs-boxed mt-8 md:mt-12 w-full">
            <a role="tab"
                className={`tab ${activeTab === 'watchlist' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('watchlist')}>
                My Watchlist
            </a>
            <a role="tab"
                className={`tab ${activeTab === 'likedMovies' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('likedMovies')}>
                Liked Movies
            </a>

            {activeTab === 'watchlist' && <WatchList />}
            {activeTab === 'likedMovies' && <LikedMovies />}
        </div>
    )
}

export default UserMovies;
