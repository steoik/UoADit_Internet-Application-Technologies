import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchBucket from '../components/SearchBucket';
import ListingCard from '../components/ListingCard';
import Pagination from '../components/Pagination';

import Close from '../assets/close_FILL0_wght500_GRAD200_opsz40.svg'
import FilterIcon from '../assets/tune_FILL0_wght200_GRAD200_opsz24.svg'
import SortIcon from '../assets/sort_FILL0_wght200_GRAD200_opsz24.svg'
import SearchIcon from '../assets/search_FILL0_wght300_GRAD200_opsz24.svg'
import './Listings.css';

import { getListings, getPrimaryListingImage } from '../api/listingAPI';

const Listings = () => {

  const API_URL = 'http://127.0.0.1:8000';

  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const [searchForm, setSearchForm] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || 'Διαμέρισμα',
    payment: searchParams.get('payment') || 'Μήνας',
    priceFrom: searchParams.get('priceFrom') || '',
    priceTo: searchParams.get('priceTo') || '',
    surfaceFrom: searchParams.get('surfaceFrom') || '',
    surfaceTo: searchParams.get('surfaceTo') || '',
  });

  const [filters, setFilters] = useState({
    beds: '',
    bedrooms: '',
    kitchens: '',
    bathrooms: '',
    living_room: '',

    wifi: '',
    heating: '',
    cooling: '',
    television: '',
    parking: '',
    elevator: '',

    smoking: '',
    pets: '',
    parties: '',
  })
  const handleFilterChange = (e) => {
    if (e.target.type === 'checkbox') {
      setFilters({
        ...filters,
        [e.target.name]: e.target.checked ? 'true' : ''
      });
    } else {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleFiltersSearch = () => {
    setSearchForm({ ...searchForm, ...filters });
  }

  const parseBoolean = (value) => {
    if (value == 'true')
      return true
    else 
      return false
  }
  
  const [listings, setListings] = useState([])
  const [listingPrimaryImages, setListingPrimaryImages] = useState({})
  
  const fetchListings = async () => {
    try {
      const fetchedListings = await getListings(searchForm);
      setListings(fetchedListings);
      setTotalItems(fetchedListings.length)
      // console.log(fetchedListings)
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  }
  const fetchListingPrimaryImages = async () => {
    try {
      const primaryImageMap = {};
      for (const listing of listings) {
        const imageURL = await getPrimaryListingImage(listing.listing_id);
        primaryImageMap[listing.listing_id] = `${API_URL}${imageURL}`;
      }
      setListingPrimaryImages(primaryImageMap);
    } catch (error) {
      console.error('Failed to fetch listing primary images:', error);
    } finally {
      setIsLoading(false);
    }
  }
  // Fetch Listings
  useEffect(() => {
    fetchListings();
  }, [searchForm])
  // Fetch Listings Primary Images
  useEffect(() => {
    fetchListingPrimaryImages();
  }, [listings])

  const [orderDirection, setOrderDirection] = useState('ascending')
  const orderListings = () => {
    const sortedListings = [...listings];
    if (orderDirection === 'ascending')
      sortedListings.sort((a, b) => a.price - b.price);
    else
      sortedListings.sort((a, b) => b.price - a.price);
    setListings(sortedListings);
    setOrderDirection((previous) => previous === 'ascending' ? 'descending' : 'ascending')
  };
  
  const [filtersModal, setFiltersModal] = useState(false)

  const itemsPerPage = 20;
  const [totalItems, setTotalItems] = useState(listings.length)
  const [currentPage, setCurrentPage] = useState(1)
  let indexOfFirstItem = (currentPage-1) * itemsPerPage;
  let indexOfLastItem = indexOfFirstItem + itemsPerPage;
  let currentListings = listings.slice(indexOfFirstItem, indexOfLastItem)

  return (
  <>
    <div className='listings'>
      <div className='listings__filters'>
        <SearchBucket
        searchForm={searchForm}
        setSearchForm={setSearchForm}
        />
        <div className='filtersBtn__wrapper'>
          <div className='filtersBtn__container'>
            <button onClick={() => setFiltersModal(true)} id='filterBtn'>
              <img src={FilterIcon}></img>
              <p>Φίλτρα</p>
            </button>
          </div>
          <div className='filtersBtn__container'>
            <button 
              className='sortBtn__container' 
              id='sortBtn'
              onClick={() => orderListings()}
              >
              <img src={SortIcon}></img>
              <p>Ταξινόμηση</p>
            </button>
          </div>
        </div>
      </div>

      {!isLoading && (
        listings.length != 0 ?
          <div className="listings__grid__container">
            <div className="listings__grid">
              {currentListings.map((listing, index) => (
                <ListingCard
                  key={index} 
                  listing={listing}
                  primary_image={listingPrimaryImages[listing.listing_id]}
                  />
              ))}
            </div>
          </div>
          :
          <div className='listings_noResults'>
            <p>Δεν βρέθηκαν αγγελίες με τα επιλεγμένα φίλτρα :(</p>
          </div>
      )}

      <div className='listings__pagination__wrapper'>
        <Pagination 
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>

    { filtersModal && 
      <div className='modal'>
        <div onClick={() => setFiltersModal(false)} className="modal__overlay"></div>
        <div className='modal__content'>

          <div className='filters__header'>
            <h3>Φίλτρα</h3>
            <button id='closeModalBtn' onClick={() => setFiltersModal(false)}>
              <img src={Close} />
            </button>
          </div>
          
          <div className='filters__category'>
            <h2>Χώρος</h2>
            <div className='filters__field'>
              <input
                type="text"
                name="beds"
                value={filters.beds}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleFilterChange(e)}
              />
              <label>Κρεβάτια</label>
            </div>
            <div className='filters__field'>
              <input
                type="text"
                name="bedrooms"
                value={filters.bedrooms}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleFilterChange(e)}
              />
              <label>Υπνοδωμάτια</label>
            </div>
            <div className='filters__field'>
              <input
                type="text"
                name="kitchens"
                value={filters.kitchens}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleFilterChange(e)}
              />
              <label>Κουζίνες</label>
            </div>
            <div className='filters__field'>
              <input
                type="text"
                name="bathrooms"
                value={filters.bathrooms}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleFilterChange(e)}
              />
              <label>Τουαλέτες</label>
            </div>
            <div className='filters__field'>
              <input
                type="text"
                name="living_room"
                value={filters.living_room}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleFilterChange(e)}
              />
              <label>Σαλόνια</label>
            </div>
          </div>
          <div className='filters__category'>
            <h2>Παροχές</h2>
            <div className='filters__grid'>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='wifi'
                  checked={parseBoolean(filters.wifi)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Wifi</label>
              </div>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='heating'
                  checked={parseBoolean(filters.heating)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Θέρμανση</label>
              </div>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='cooling'
                  checked={parseBoolean(filters.cooling)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Κλιματισμός</label>
              </div>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='television'
                  checked={parseBoolean(filters.television)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Τηλεόραση</label>
              </div>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='parking'
                  checked={parseBoolean(filters.parking)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Parking</label>
              </div>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='elevator'
                  checked={parseBoolean(filters.elevator)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Ασανσέρ</label>
              </div>
            </div>
          </div>
          <div className='filters__category'>
            <h2>Κανόνες</h2>
            <div className='filters__grid'>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='smoking'
                  checked={parseBoolean(filters.smoking)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Κάπνισμα</label>
              </div>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='pets'
                  checked={parseBoolean(filters.pets)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Κατοικίδια</label>
              </div>
              <div className='filters__field'>
                <input
                  type='checkbox'
                  name='parties'
                  checked={parseBoolean(filters.parties)}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label>Πάρτι</label>
              </div>
            </div>
          </div>

          <div className='filters__footer'>
            <button onClick={() => handleFiltersSearch()}>
              <p>Αναζήτηση</p>
                <img src={SearchIcon}></img>
            </button>
          </div>

        </div>
      </div>
    }

  </>
  )
}

export default Listings;