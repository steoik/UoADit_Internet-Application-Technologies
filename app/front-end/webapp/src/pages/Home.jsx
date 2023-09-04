import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

import SearchBucket from '../components/SearchBucket';

import SearchIcon from '../assets/search_FILL0_wght300_GRAD200_opsz24.svg'
import './Home.css'

const Home = () => {

  const navigate = useNavigate();
  
  const [searchForm, setSearchForm] = useState({
    location: '',
    type: 'Διαμέρισμα',
    payment: 'Μήνας',
    priceFrom: 0,
    priceTo: 0,
    surfaceFrom: 0,
    surfaceTo: 0,
  });
  
  const handleSearch = () => {

    let link = '/listings?'
    for (const key in searchForm)
      if (searchForm[key])
        link += `${key}=${searchForm[key]}&`
    link = link.slice(0, -1);

    navigate(link);
  }
  
  return (<>
    <div className="home">
      <section className="home__slogan-search">
        <h2>Το νέο σου σπίτι, μόνο λίγα κλικ μακριά!</h2>
        <div className="home__searchBucket">
          <SearchBucket
            searchForm={searchForm}
            setSearchForm={setSearchForm}
            />
          <button onClick={handleSearch}>
            <p>Αναζήτηση</p>
              <img src={SearchIcon} fill='red'></img>
          </button>
        </div>
      </section>
      
      <section className="home__otherSection">
      </section>
    </div>
  </>);
}

export default Home