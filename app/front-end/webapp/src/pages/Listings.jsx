import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchBucket from '../components/SearchBucket';

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

  return (<>

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

      { filtersModal && 
        <div className='modal'>
          <div onClick={() => setFiltersModal(false)} className="modal__overlay"></div>
          <div className='modal__content'>
            <button id='closeModalBtn' onClick={() => setFiltersModal(false)}>
              <img src={Close} />
            </button>
            <h3>Φίλτρα</h3>

            

          </div>
        </div>
      }
    </div>

  </>)
}

export default Listings;