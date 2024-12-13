import { useState } from 'react';

function Search() {
    const [query, setQuery] = useState("");

    const handleSearch = (event) => {
    }

    return (
        <div className="container px-4 py-4">
            <form onSubmit={handleSearch}>
                <input type="text" name="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}

export default Search;