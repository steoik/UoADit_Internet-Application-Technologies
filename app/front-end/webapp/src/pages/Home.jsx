import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import './Home.css'

const Home = () => {

  const navigate = useNavigate();

  const [searchForm, setSearchForm] = useState({
    location: '',
    type: '',
    payment: '',
    priceFrom: '',
    priceTo: '',
    surface: '',
    guests: ''
  });  
  
  const handleSearchFormChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSearch = () => {

    let link = '/listings?'
    for (const key in searchForm)
      if (searchForm[key])
        link += `${key}=${searchForm[key]}&`
    link = link.slice(0, -1);

    navigate(link);
  }
  
  return (
    <div className="home">
      <section className="home__slogan-search">
        <h2>Το νέο σου σπίτι, μόνο λίγα κλικ μακριά!</h2>
        <div className="home__searchBucket">
          <form>
            <div id="location" className="searchBucket__field">
              <label htmlFor="area">Περιοχή</label>
              <input
                type="text"
                name="location"
                placeholder="πχ. Γαλάτσι"
                onChange={(e) => handleSearchFormChange(e)}
                />
            </div>
            <div id="type" className="searchBucket__field">
              <label htmlFor="area">Τύπος</label>
              <input
                type="text"
                name="type"
                placeholder="πχ. Διαμέρισμα"
                onChange={(e) => handleSearchFormChange(e)}
                />
            </div>
            <div id="payment" className="searchBucket__field">
              <label htmlFor="area">Πληρωμή</label>
              <input
                type="text"
                name="payment"
                placeholder="Μήνας/Διανυκτέρευση"
                onChange={(e) => handleSearchFormChange(e)}
                />
            </div>
            <div id="priceFrom" className="searchBucket__field">
              <label htmlFor="area">Τιμή Από</label>
              <input
                type="text"
                name="priceFrom"
                placeholder="πχ. 100&euro;"
                onChange={(e) => handleSearchFormChange(e)}
                />
            </div>
            <div id="priceTo" className="searchBucket__field">
              <label htmlFor="area">Τιμή Μέχρι</label>
              <input
                type="text"
                name="priceTo"
                placeholder="πχ. 500&euro;"
                onChange={(e) => handleSearchFormChange(e)}
                />
            </div>
            <div id="surface" className="searchBucket__field">
              <label htmlFor="area">Εμβαδόν</label>
              <input
                type="text"
                name="surface"
                placeholder="πχ. 80τμ"
                onChange={(e) => handleSearchFormChange(e)}
                />
            </div>
            <div id="guests" className="searchBucket__field">
              <label htmlFor="area">Επισκέπτες</label>
              <input
                type="text"
                name="guests"
                placeholder="πχ. 4 άτομα"
                onChange={(e) => handleSearchFormChange(e)}
              />
            </div>
          </form>
            <div className="searchBucket__field">
              <button onClick={handleSearch}>Αναζήτηση</button>
            </div>

        </div>
      </section>
      <section className="home__otherSection">
      </section>
    </div>
  );
}

export default Home