import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import { createListing, createListingImage } from "../api/listingAPI";
import searchDimoi from '../data/dimoiAttikis';
import MapContainer from '../components/Map';

import './ListingSubmit.css'
import { useNavigate } from "react-router-dom";

const ListingSubmit = () => {

  const API_URL = 'http://127.0.0.1:8000';
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate()

  const [listingData, setListingData] = useState({
    title: '',
    price: '0',
    payment: '',
    location: '',
    street: '',
    street_number: '0',
    postal_code: '0',
    surface: '0',
    floor: '',
    type: '',
    description: '',

    host: authData.username,

    minimum_reservation_period: '0',
    extra_price_per_guest: '0',
    maximum_guests: '0',

    lng: '37.97207076984488',
    lat: '23.72695505619049',

    beds: '0',
    bedrooms: '0',
    kitchens: '0',
    bathrooms: '0',
    living_room: '0',

    wifi: 'false',
    heating: 'false',
    cooling: 'false',
    television: 'false',
    parking: 'false',
    elevator: 'false',

    smoking: 'false',
    pets: 'false',
    parties: 'false',

    rating: '0',
    reviews: '0',
  })
  const [listingImages, setListingImages] = useState([])
  const [listingPrimaryImage, setListingPrimaryImage] = useState('')

  const handleListingDataChange = (e) => {
    if (e.target.type === 'checkbox') {
      setListingData({
        ...listingData,
        [e.target.name]: e.target.checked ? 'true' : 'false'
      });
    } else {
      setListingData({
        ...listingData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleImageUpload = (e) => {
    if (listingImages.length + 1 <= 8) {
      setListingImages((listingImages) => [...listingImages, e.target.files[0]]);
    }
  };
  const handlePrimaryImageUpload = (e) => {
    setListingPrimaryImage(e.target.files[0]);
  };


  const handleMarkerDrag = (newCoords) => {
    setListingData({
      ...listingData,
      lat: newCoords.lat,
      lng: newCoords.lng,
    });
  };
  const parseBoolean = (value) => {
    if (value == 'true')
      return true
    else 
      return false
  }

  const handleListingSubmit = async () => {
    event.preventDefault();
    const listing_id = await createListing(listingData);
    await createListingImage(listing_id, listingPrimaryImage, 'True')
    for (const image of listingImages) {
      await createListingImage(listing_id, image, 'False');
    }
    navigate(`/listing/${listing_id}`)
  }
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
  const handleSearchFormChange = (e) => {
    setListingData({
      ...listingData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'location') setSearchLocation(e.target.value);
  };
  // ~~~~~~~~~~~~~~~ Dropdown Menus ~~~~~~~~~~~~~~~
  const listing_types = [
    'Διαμέρισμα',
    'Μονοκατοικία',
    'Στούντιο',
    'Μεζονέτα',
  ]
  const listing_payments = [
    'Μήνας',
    'Διανυκτέρευση',
  ]
  const dropdownRef_location = useRef(null);
  const dropdownRef_type = useRef(null);
  const dropdownRef_payment = useRef(null);
  const [dropdown_location, set_dropdown_location] = useState(false)
  const [dropdown_type, set_dropdown_type] = useState(false)
  const [dropdown_payment, set_dropdown_payment] = useState(false)
  useEffect(() => {
    const closeDropdowns = (e) => {
      if ( dropdownRef_location.current && !dropdownRef_location.current.contains(e.target) )
        set_dropdown_location(false);
      if ( dropdownRef_type.current && !dropdownRef_type.current.contains(e.target) )
        set_dropdown_type(false);
      if ( dropdownRef_payment.current && !dropdownRef_payment.current.contains(e.target) )
        set_dropdown_payment(false);
    }
    document.addEventListener('mousedown', closeDropdowns);
    return () => document.removeEventListener('mousedown', closeDropdowns);
  }, []);

  return (
    <div className="listingSubmit">
      <div className="listingSubmit__form">
        <form>
          <section className="listingSubmit__title">
            <h2>Τίτλος</h2>
            <textarea
              name="title"
              maxLength="50"
              value={listingData.title}
              onChange={handleListingDataChange}
            />
          </section>

          <section className="listingSubmit__pictures__wrapper">
            <h2>Εικόνες</h2>
            <div className="listingSubmit__pictures">
              
              <div className="picture__foccused">
                {listingPrimaryImage !== '' &&
                  <img
                    src={URL.createObjectURL(listingPrimaryImage)}
                    onClick={() => {
                      setListingPrimaryImage('')
                    }}
                  />
                }
              </div>

              <div className="picture__grid">
                {listingImages.length !== 0 && (
                  listingImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)} 
                      alt={`Listing_Image_${index}`}
                      onClick={() => {
                        const updatedImages = [...listingImages];
                        updatedImages.splice(index, 1);
                        setListingImages(updatedImages);
                      }}
                    />
                  ))         
                )}
              </div>
            </div>
            <div className="listingSubmit__pictures__add">
              <div className="listingSubmit__pictures__add-primary">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePrimaryImageUpload}
                />
              </div>
              <div className="listingSubmit__pictures__add-images">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                />
              </div>
            </div>
          </section>

          <section className="listingSubmit__general">
            <h2>Γενικά</h2>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="price"
                value={listingData.price}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Τιμή</label>
            </div>
            <div className="listingSubmit__field" ref={dropdownRef_payment}>
              <input
                type="text"
                name="payment"
                readOnly
                className='no-caret'
                value={listingData.payment}
                onClick={() => set_dropdown_payment(true)}
                />
              { dropdown_payment && (
                <div className="field__dropdown">
                  <ul>
                    {listing_payments.map((payment) => (
                      <li
                      key={payment}
                      onClick={() => {
                        setListingData({...listingData, payment: payment});
                        set_dropdown_payment(false)
                      }}
                      >
                        {payment}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <label >Πληρωμή</label>
            </div>
            <div className="listingSubmit__field" ref={dropdownRef_location}>
              <input
                type="text"
                name="location"
                onChange={(e) => handleSearchFormChange(e)}
                onClick={() => set_dropdown_location(true)}
                value={listingData.location}
                />
              { dropdown_location && searchLocationResults.length>0 && (
                <div className="field__dropdown">
                  <ul>
                    {searchLocationResults.map((result) => (
                      <li
                      key={result}
                      onClick={() => {
                        setListingData({ ...listingData, location: result });
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
              <label >Τοποθεσία</label>
            </div>
            <div className="listingSubmit__field" ref={dropdownRef_type}>
              <input
                type="text"
                name="type"
                readOnly
                className='no-caret'
                value={listingData.type}
                onClick={() => set_dropdown_type(true)}
                />
              { dropdown_type && (
                <div className="field__dropdown">
                  <ul>
                    {listing_types.map((type) => (
                      <li
                      key={type}
                      onClick={() => {
                        setListingData({...listingData, type: type});
                        set_dropdown_type(false)
                      }}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <label >Τύπος</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="street"
                value={listingData.street}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Οδός</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="street_number"
                value={listingData.street_number}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Αριθμος διεύθυνσης</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="postal_code"
                value={listingData.postal_code}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Ταχυδρομικός Κώδικας</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="surface"
                value={listingData.surface}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Εμβαδόν</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="floor"
                value={listingData.floor}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Όροφος</label>
            </div>
          </section>

          <section className="listingSubmit__description">
            <h2>Περιγραφή</h2>
            <div className="listingSubmit__field">
              <textarea
                name="description"
                maxLength="500"
                value={listingData.description}
                onChange={handleListingDataChange}
              />
            </div>
          </section>
          
          <section className="listingSubmit__pricing">
            <h2>Κοστολόγηση</h2>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="minimum_reservation_period"
                value={listingData.minimum_reservation_period}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Ελάχιστη διάρκεια κράτησης</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="extra_price_per_guest"
                value={listingData.extra_price_per_guest}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Επιπλέον κόστος ανά καλεσμένο</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="maximum_guests"
                value={listingData.maximum_guests}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Μέγιστος αριθμος καλεσμένων</label>
            </div>
          </section>

          <section className="listingSubmit__map">
            <h2>Χάρτης</h2>
            <div className="listingSubmit__map-coords">
              <label >Lng: </label>
              <input
                type="text"
                readOnly
                value={listingData.lng}
              />
              <label >Lat: </label>
              <input
                type="text"
                readOnly
                value={listingData.lat}
              />
            </div>
            <div className="listingSubmit__map-wrapper">
              <MapContainer
                lat={37.97207076984488}
                lng={23.72695505619049}
                onMarkerDrag={handleMarkerDrag}
              />
            </div>
          </section>

          <section className="listingSubmit__space">
            <h2>Χώρος</h2>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="beds"
                value={listingData.beds}
                onChange={(e) => handleListingDataChange(e)}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                />
              <label >Κρεβάτια</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="bedrooms"
                value={listingData.bedrooms}
                onChange={(e) => handleListingDataChange(e)}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                />
              <label >Υπνοδωμάτια
              </label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="kitchens"
                value={listingData.kitchens}
                onChange={(e) => handleListingDataChange(e)}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                />
              <label >Κουζίνες</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="bathrooms"
                value={listingData.bathrooms}
                onChange={(e) => handleListingDataChange(e)}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                />
              <label >Τουαλέτες</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="living_room"
                value={listingData.living_room}
                onChange={(e) => handleListingDataChange(e)}
                onKeyDown={(e) => {
                  // Prevent non numerical values
                  const keyCode = e.key;
                  if (!/^[0-9]$/.test(keyCode) && keyCode !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                />
              <label >Σαλόνια</label>
            </div>
          </section>

          <section className="listingSubmit__provisions">
            <h2>Παροχές</h2>
            <div className="listingSubmit__grid">
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='heating'
                    checked={parseBoolean(listingData.heating)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Θέρμανση</label>
              </div>
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='cooling'
                    checked={parseBoolean(listingData.cooling)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Κλιματισμός</label>
              </div>
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='television'
                    checked={parseBoolean(listingData.television)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Τηλεόραση</label>
              </div>
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='parking'
                    checked={parseBoolean(listingData.parking)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Parking</label>
              </div>
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='elevator'
                    checked={parseBoolean(listingData.elevator)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Ασανσέρ</label>
              </div>
            </div>
          </section>

          <section className="listingSubmit__rules">
            <h2>Κανόνες</h2>
            <div className="listingSubmit__grid">
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='smoking'
                    checked={parseBoolean(listingData.smoking)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Κάπνισμα</label>
              </div>
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='pets'
                    checked={parseBoolean(listingData.pets)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Κατοικίδια</label>
              </div>
              <div className="listingSubmit__grid-field">
                <input
                    type='checkbox'
                    name='parties'
                    checked={parseBoolean(listingData.parties)}
                    onChange={(e) => handleListingDataChange(e)}
                  />
                  <label>Πάρτι</label>
              </div>
            </div>
          </section>

          <div className='listingSubmit__submit'>
            <button onClick={() => handleListingSubmit()}>
              <p>Καταχώρηση</p>
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}


export default ListingSubmit;