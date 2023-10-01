import { useEffect, useState } from "react"

import './ListingSubmit.css'
import MapContainer from './Map';

const ListingSubmit = () => {

  const API_URL = 'http://127.0.0.1:8000';

  const [listingData, setListingData] = useState({
    title: '',
    price: '',
    payment: '',
    location: '',
    street: '',
    street_number: '',
    postal_code: '',
    surface: '',
    floor: '',
    type: '',
    description: '',

    minimum_reservation_period: '',
    extra_price_per_guest: '',
    maximum_guests: '',

    lng: '',
    lat: '',

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
  const [listingImages, setListingImages] = useState([])
  const [listingPrimaryImage, setListingPrimaryImage] = useState('')

  const handleListingDataChange = (e) => {
    if (e.target.type === 'checkbox') {
      setListingData({
        ...listingData,
        [e.target.name]: e.target.checked ? 'true' : ''
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
      const files = Array.from(e.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setListingImages([...listingImages, ...imageUrls]);
    }
  };
  const handlePrimaryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setListingPrimaryImage(imageUrl);
    }
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

  useEffect(() => {
    console.log(listingData)
  }, [listingData])
  useEffect(() => {
    console.log(listingImages)
  }, [listingImages])

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
                <img
                  src={listingPrimaryImage}
                  onClick={() => {
                    setListingPrimaryImage('')
                  }}
                />
              </div>

              <div className="picture__grid">
                {listingImages.map((image, index) => (
                  <img
                    key={index}
                    src={image} 
                    alt={`Listing_Image_${index}`}
                    onClick={() => {
                      const updatedImages = [...listingImages];
                      updatedImages.splice(index, 1);
                      setListingImages(updatedImages);
                    }}
                  />
                ))}
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
            <div className="listingSubmit__field">
              <input
                type="text"
                name="payment"
                value={listingData.payment}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Πληρωμή</label>
            </div>
            <div className="listingSubmit__field">
              <input
                type="text"
                name="location"
                value={listingData.location}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Τοποθεσία</label>
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
            <div className="listingSubmit__field">
              <input
                type="text"
                name="type"
                value={listingData.type}
                onChange={(e) => handleListingDataChange(e)}
                />
              <label >Τύπος</label>
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
            <h2>Τοποθεσία</h2>
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

          {/* 
                  wifi: '',
    heating: '',
    cooling: '',
    television: '',
    parking: '',
    elevator: '',

    smoking: '',
    pets: '',
    parties: '',
          */}

        </form>
      </div>
    </div>
  )
}


export default ListingSubmit;