import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Listings = () => {
  
  const [searchParams] = useSearchParams();
  const [searchFormData, setSearchFormData] = useState({
    location: searchParams.get('location'),
    type: searchParams.get('type'),
    payment: searchParams.get('payment'),
    priceFrom: searchParams.get('priceFrom'),
    priceTo: searchParams.get('priceTo'),
    surface: searchParams.get('surface'),
    guests: searchParams.get('guests')
  })

  const handleSearchFormChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    console.log(searchFormData);
  }, [searchFormData]);

  return (
    // <div>
    //   {JSON.stringify(searchFormData)}
    // </div>
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
  );
}

export default Listings;