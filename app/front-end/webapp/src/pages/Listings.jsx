import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchBucket from '../components/SearchBucket';
import ListingCard from '../components/ListingCard';
import Pagination from '../components/Pagination';

import Close from '../assets/close_FILL0_wght500_GRAD200_opsz40.svg'
import FilterIcon from '../assets/tune_FILL0_wght200_GRAD200_opsz24.svg'
import SortIcon from '../assets/sort_FILL0_wght200_GRAD200_opsz24.svg'
import './Listings.css';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [searchForm, setSearchForm] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || 'Διαμέρισμα',
    payment: searchParams.get('payment') || 'Μήνας',
    priceFrom: searchParams.get('priceFrom') || 0,
    priceTo: searchParams.get('priceTo') || 0,
    surfaceFrom: searchParams.get('surfaceFrom') || 0,
    surfaceTo: searchParams.get('surfaceTo') || 0,
  });

  const [filtersModal, setFiltersModal] = useState(false)
  

  const listings = Array(28).fill({
    location: 'Γαλάτσι',
    type: 'Διαμέρισμα',
    payment: 'Μήνα',
    price: '340',
    surface: '80',
    image: null,
    floor: 2,
    beds: 4,
    bedrooms: 2,
    bathrooms: 1,
    livingrooms: 1,
    rating: 4.5,
    reviews: 230
  });

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
            <button className='sortBtn__container' id='sortBtn'>
              <img src={SortIcon}></img>
              <p>Ταξινόμηση</p>
            </button>
          </div>
        </div>
      </div>

      <div className="listings__grid__container">
        <div className="listings__grid">
          {currentListings.map((listing, index) => (
            <ListingCard
              key={index} 
              listing={listing}
              />
          ))}
        </div>
      </div>

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
          <button id='closeModalBtn' onClick={() => setFiltersModal(false)}>
            <img src={Close} />
          </button>
          <h3>Φίλτρα</h3>

          {/* 
            floor
            guests
            beds  
            bedrooms
            kitchens
            bathrooms
            living room

            Provisions

            Rules

            Ratings
            */}

        </div>
      </div>
    }

  </>
  )
}

export default Listings;