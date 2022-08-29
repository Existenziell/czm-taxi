import Link from 'next/link'
import useAuthentication from '../lib/auth'
import SearchForm from '../components/SearchForm'

const Search = () => {
    useAuthentication()

    return (
        <div className="searchMajorContainer">
            <div className="searchMinorContainer">
                <Link href="/" passHref>
                    <div className="searchBackBtnContainer">
                        <button className="btn searchBackBtn" aria-label="Back">
                            <img src="https://img.icons8.com/ios-filled/50/000000/left.png" alt="back" />
                        </button>
                    </div>
                </Link>
                <SearchForm />
            </div>
        </div>
    )
}

export default Search
