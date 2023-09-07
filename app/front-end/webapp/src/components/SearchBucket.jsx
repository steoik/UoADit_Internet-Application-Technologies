import { useEffect, useRef, useState } from 'react';
import searchDimoi from '../data/dimoiAttikis';
import './SearchBucket.css';

const SearchBucket = ({ searchForm, setSearchForm }) => {
  
  // const [searchForm, setSearchForm] = useState({
  //   location: '',
  //   type: '',
  //   payment: '',
  //   priceFrom: 0,
  //   priceTo: 0,
  //   surfaceFrom: 0,
  //   surfaceTo: 0,
  // });

  const listing_types = [
    'Διαμέρισμα',
    'Μονοκατοικία',
    'Στούντιο',
    'Γκαρσονιέρα',
  ]
  const listing_payments = [
    'Μήνας',
    'Διανυκτέρευση',
  ]

  // ~~~~~~~~~~~~~~~ Input Display Values ~~~~~~~~~~~~~~
  const [price_input_value, setPrice_input_value] = useState('')
  useEffect(() => {
    if (searchForm.priceFrom != 0 && searchForm.priceTo == 0)
      setPrice_input_value(`Από ${searchForm.priceFrom} €`)
    else if (searchForm.priceFrom == 0 && searchForm.priceTo != 0)
      setPrice_input_value(`Έως ${searchForm.priceTo} €`)
    else if (searchForm.priceFrom != 0 && searchForm.priceTo != 0)
      setPrice_input_value(`${searchForm.priceFrom}-${searchForm.priceTo} €`)
    else
      setPrice_input_value('')
  }, [searchForm.priceFrom, searchForm.priceTo])
  
  const [surface_input_value, setSurface_input_value] = useState('')
  useEffect(() => {
    if (searchForm.surfaceFrom != 0 && searchForm.surfaceTo == 0)
    setSurface_input_value(`Από ${searchForm.surfaceFrom} τ.μ.`)
    else if (searchForm.surfaceFrom == 0 && searchForm.surfaceTo != 0)
    setSurface_input_value(`Έως ${searchForm.surfaceTo} τ.μ.`)
    else if (searchForm.surfaceFrom != 0 && searchForm.surfaceTo != 0)
    setSurface_input_value(`${searchForm.surfaceFrom}-${searchForm.surfaceTo} τ.μ.`)
    else
    setSurface_input_value('')
  }, [searchForm.surfaceFrom, searchForm.surfaceTo])
  
  // ~~~~~~~~~~~~~~~ Search Location ~~~~~~~~~~~~~~
  const [searchLocation, setSearchLocation] = useState('');
  const [searchLocationResults, setSearchLocationResults] = useState([]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchLocation !== '') {
        setSearchLocationResults(searchDimoi(searchLocation));
      } else {
        setSearchLocationResults([]);
      }
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [searchLocation]);
  
  // ~~~~~~~~~~~~~~~ Dropdown Menus ~~~~~~~~~~~~~~~
  const dropdownRef_location = useRef(null);
  const dropdownRef_type = useRef(null);
  const dropdownRef_payment = useRef(null);
  const dropdownRef_price = useRef(null);
  const dropdownRef_surface = useRef(null);
  
  const [dropdown_location, set_dropdown_location] = useState(false)
  const [dropdown_type, set_dropdown_type] = useState(false)
  const [dropdown_payment, set_dropdown_payment] = useState(false)
  const [dropdown_price, set_dropdown_price] = useState(false)
  const [dropdown_surface, set_dropdown_surface] = useState(false)
  
  // const handleClickOutside = (event) => {
  //   if (dropdownRef_location.current && !dropdownRef_location.current.contains(event.target))
  //     set_dropdown_location(false)
  // };

  useEffect(() => {
    const closeDropdowns = (e) => {
      if ( dropdownRef_location.current && !dropdownRef_location.current.contains(e.target) )
        set_dropdown_location(false);
      if ( dropdownRef_type.current && !dropdownRef_type.current.contains(e.target) )
        set_dropdown_type(false);
      if ( dropdownRef_payment.current && !dropdownRef_payment.current.contains(e.target) )
        set_dropdown_payment(false);
      if ( dropdownRef_price.current && !dropdownRef_price.current.contains(e.target) )
        set_dropdown_price(false);
      if ( dropdownRef_surface.current && !dropdownRef_surface.current.contains(e.target) )
        set_dropdown_surface(false);
    }
    document.addEventListener('mousedown', closeDropdowns);
    return () => document.removeEventListener('mousedown', closeDropdowns);
  }, []);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleSearchFormChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'location') setSearchLocation(e.target.value);
  };
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  return (
    <>
      <div className="search-bucket">
        <form className="search-bucket__form">
          
          <div className="search-bucket__field" id="location" ref={dropdownRef_location}>
            <label>Περιοχή</label>
            <input
              type="text"
              name="location"
              placeholder="πχ. Γαλάτσι"
              onChange={(e) => handleSearchFormChange(e)}
              onClick={() => set_dropdown_location(true)}
              value={searchForm.location}
              />
            { dropdown_location && searchLocationResults.length>0 && (
              <div className="field__dropdown">
                <ul>
                  {searchLocationResults.map((result) => (
                    <li
                    key={result}
                    onClick={() => {
                      setSearchForm({ ...searchForm, location: result });
                      setSearchLocationResults([]);
                      set_dropdown_location(false)
                    }}
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="search-bucket__field" id='type' ref={dropdownRef_type}>
            <label >Τύπος</label>
            <input
              type="text"
              name="type"
              readOnly
              className='no-caret'
              value={searchForm.type}
              onClick={() => set_dropdown_type(true)}
              />
            { dropdown_type && (
              <div className="field__dropdown">
                <ul>
                  {listing_types.map((type) => (
                    <li
                    key={type}
                    onClick={() => {
                      setSearchForm({ ...searchForm, type: type });
                      set_dropdown_type(false)
                    }}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="search-bucket__field" id='type' ref={dropdownRef_payment}>
            <label >Πληρωμή</label>
            <input
              type="text"
              name="payment"
              readOnly
              className='no-caret'
              value={searchForm.payment}
              onClick={() => set_dropdown_payment(true)}
              />
            { dropdown_payment && (
              <div className="field__dropdown">
                <ul>
                  {listing_payments.map((payment) => (
                    <li
                    key={payment}
                    onClick={() => {
                      setSearchForm({ ...searchForm, payment: payment });
                      set_dropdown_payment(false)
                    }}
                    >
                      {payment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="search-bucket__field" id='type' ref={dropdownRef_price}>
            <label >Τιμή</label>
            <input
              type="text"
              name="price"
              readOnly
              className='no-caret'
              value={price_input_value}
              onClick={() => set_dropdown_price(true)}
              placeholder='€ Από-Έως'
              />
            { dropdown_price && (
              <div className="field__dropdown">
                <div className="field__dropdown-inputs">
                  <input
                    type="text"
                    name="priceFrom"
                    value={searchForm.priceFrom == 0 ? '' : searchForm.priceFrom}
                    placeholder={searchForm.priceFrom == 0 ? 'Από' : `${searchForm.priceFrom}`}
                    onKeyDown={(e) => {
                      // Prevent non numerical values
                      const keyCode = e.key;
                      if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => handleSearchFormChange(e)}
                  />
                  <input
                    type="text"
                    name="priceTo"
                    value={searchForm.priceTo == 0 ? '' : searchForm.priceTo}
                    placeholder={searchForm.priceTo == 0 ? 'Έως' : `${searchForm.priceTo}`}
                    onKeyDown={(e) => {
                      // Prevent non numerical values
                      const keyCode = e.key;
                      if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => handleSearchFormChange(e)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="search-bucket__field" id='type' ref={dropdownRef_surface}>
            <label >Εμβαδόν</label>
            <input
              type="text"
              name="surface"
              readOnly
              className='no-caret'
              value={surface_input_value}
              onClick={() => set_dropdown_surface(true)}
              placeholder='τ.μ. Από-Έως'
              />
            { dropdown_surface && (
              <div className="field__dropdown">
                <div className="field__dropdown-inputs">
                  <input
                    type="text"
                    name="surfaceFrom"
                    value={searchForm.surfaceFrom == 0 ? '' : searchForm.surfaceFrom}
                    placeholder={searchForm.surfaceFrom == 0 ? 'Από' : `${searchForm.surfaceFrom}`}
                    onKeyDown={(e) => {
                      // Prevent non numerical values
                      const keyCode = e.key;
                      if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => handleSearchFormChange(e)}
                  />
                  <input
                    type="text"
                    name="surfaceTo"
                    value={searchForm.surfaceTo == 0 ? '' : searchForm.surfaceTo}
                    placeholder={searchForm.surfaceTo == 0 ? 'Έως' : `${searchForm.surfaceTo}`}
                    onKeyDown={(e) => {
                      // Prevent non numerical values
                      const keyCode = e.key;
                      if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => handleSearchFormChange(e)}
                  />
                </div>
              </div>
            )}
          </div>

        </form>
      </div>

    </>
  );
}

export default SearchBucket;