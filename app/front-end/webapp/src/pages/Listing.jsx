import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addDays, isBefore, startOfDay } from 'date-fns';
import { DateRange } from 'react-date-range'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import MapContainer from '../components/Map';
import Review from '../components/Review'
import UserCard from "../components/UserCard"

import { getListing, getListingImages } from '../api/listingAPI';
import {translate_type_EN_GR, translate_payment_EN_GR} from '../utils/translate'

import NoImage from '../assets/test.jpg'
import './Listing.css'

const Listing = () => {

  const API_URL = 'http://127.0.0.1:8000';
  const [isLoading, setIsLoading] = useState(true);
  const { listing_id } = useParams(); 

  const [listing, setListing] = useState([])
  const [listingImages, setListingImages] = useState([])
  const [listingPrimaryImage, setListingPrimaryImage] = useState('')

  useEffect(() => {
    console.count(listing)
  }, [listing])

  const fetchListing = async () => {
    try {
      const fetchedListing = await getListing(listing_id);
      setListing(fetchedListing);
      console.log(fetchedListing)
    } catch (error) {
      console.error('Failed to fetch listing:', error);
    }
  }
  const fetchListingImages = async () => {
    try {
      const fetchedListingImage = await getListingImages(listing_id);

      let primaryImage = '';
      let normalImages = [];
      fetchedListingImage.forEach((image) => {
        if (image.primary_image) {
          primaryImage = image.url;
        } else {
          normalImages.push(image.url);
        }
      });
      setListingImages(normalImages);
      setListingPrimaryImage(primaryImage);

      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch listing images:', error);
    }
  }
  useEffect(() => {
    setIsLoading(true)
    fetchListing();
    fetchListingImages();
  }, [])


  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
  const [rangeDays, setRangeDays] = useState(1);
  useEffect(() => {
    function calculateRangeDays () {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(Math.abs((range[0].endDate - range[0].startDate) / oneDay) + 1);
      setRangeDays(diffDays)
    }
    calculateRangeDays()
  }, [range]);
  const takenDates = [
  ];
  const formatDate = (date) => {
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const [guests, setGuests] = useState(1);
  const decreaseGuests = () => {
    if (guests > 1) {
      setGuests((guests) => guests - 1);
    }
  };
  const increaseGuests = () => {
    if (guests + 1 <= listing.maximum_guests)
      setGuests((guests) => guests + 1);
  };

  const handleReservation = () => {
  }

  const handleImageClick = (imageUrl, index) => {
    setListingImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index] = listingPrimaryImage;
      return updatedImages;
    });
    setListingPrimaryImage(imageUrl)
  };

  return (
    <>
    {!isLoading && (
      <div className="listing">
        <div className="listing__container">
          <section className="listing__title">
            <h1>
              {listing.title}
            </h1>
            <p>{listing.rating} αστέρια · {listing.reviews} <a href="#listingReviews">κριτικές</a></p>
          </section>
          <section className="listing__pictures">
            <div className="picture__foccused">
              <img src={`${API_URL}${listingPrimaryImage}`}></img>
            </div>
            <div className="picture__grid">
              {listingImages.map((imageUrl, index) => (
                <img 
                  key={index}
                  src={`${API_URL}${listingImages[index]}`} 
                  alt={`Listing_Image_${index}`}
                  onClick={() => handleImageClick(imageUrl, index)}
                />
              ))}
            </div>
          </section>
          <div className="listing__main-sidebar">
            <div className="listing_main">
              <section className="listing__generalInfo">
                <p className="generalInfo__type-surface">{translate_type_EN_GR(listing.type)}, {listing.surface}τ.μ.</p>
                <p className="generalInfo__location">{listing.location}, Αττική</p>
                <p className="generalInfo__space">{listing.beds} κρεβ · {listing.bedrooms} υ/δ · {listing.bathrooms} μπ</p>
                <p className="generalInfo__price">€{listing.price} / {translate_payment_EN_GR(listing.payment)}</p>
              </section>
              <section className="listing__description">
                <h2 className="section__title">Περιγραφή</h2>
                <p>{listing.description}</p>
              </section>
              <section className="listing__characteristics">
                <h2 className="section__title">Χαρακτηριστικά</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Τιμή</td>
                      <td>€{listing.price} / {translate_payment_EN_GR(listing.payment)}</td>
                    </tr>
                    <tr>
                      <td>Τιμή ανά τ.μ.</td>
                      <td>€{listing.price / listing.surface} / τ.μ</td>
                    </tr>
                    <tr>
                      <td>Εμβαδόν</td>
                      <td>{listing.surface}</td>
                    </tr>
                    <tr>
                      <td>Όροφος</td>
                      <td>{listing.floor}</td>
                    </tr>
                    <tr>
                      <td>Κουζίνες</td>
                      <td>{listing.kitchens}</td>
                    </tr>
                    <tr>
                      <td>Μπάνια</td>
                      <td>{listing.bathrooms}</td>
                    </tr>
                    <tr>
                      <td>Σαλόνια</td>
                      <td>{listing.living_room}</td>
                    </tr>
                    {/* if night payment */}
                    <tr>
                      <td>Κρεβάτια</td>
                      <td>{listing.beds}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="listing__provisions">
                <h2 className="section__title">Παροχές</h2>
                {
                  Object.entries({
                    'Θέρμανση': listing.heating,
                    'Κλιματισμός': listing.cooling,
                    'Ασανσέρ': listing.elevator,
                    'Parking': listing.parking,
                    'Wifi': listing.wifi,
                    'Τηλεόραση': listing.television,
                  }).map(([key, value]) => (
                    <p key={key} className={value === false ? 'provision-false' : ''}>
                      {key}
                    </p>
                  ))
                }
              </section>
              <section className="listing__rules">
                <h2 className="section__title">Κανόνες</h2>
                {
                  Object.entries({
                    'Κάπνισμα': listing.smoking,
                    'Κατοικίδια': listing.pets,
                    'Πάρτι': listing.parties,
                  }).map(([key, value]) => (
                    <p key={key} className={value === false ? 'rule-false' : ''}>
                      {key}
                    </p>
                  ))
                }
              </section>
              <section className="listing__calendar">
                <DateRange
                  onChange={item => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={2}
                  minDate={new Date()}
                  direction="horizontal"
                  className="calendarElement"
                  disabledDates={takenDates}
                />
              </section>
            </div>
            <div className="listing__sidebar">
              <section className="listing__reservation">
                <div className="reservation__pricing">
                  <p>&euro; {listing.price + listing.extra_price_per_guest * (guests-1)} / {translate_payment_EN_GR(listing.payment)}</p>
                </div>
                <div className="reservation__dates">
                  <div className="reservation__checkIn">
                    <p>ΑΦΙΞΗ</p> 
                    <p>{formatDate(range[0].startDate)}</p>
                  </div>
                  <div className="reservation__checkOut">
                    <p>ΑΝΑΧΩΡΗΣΗ</p> 
                    <p>{formatDate(range[0].endDate)}</p>
                  </div>
                </div>
                <div className="reservation__guests">
                  <p>Καλεσμένοι</p>
                  <div className="reservation__guests-buttons">
                    <button onClick={() => decreaseGuests()}>-</button>
                    <p>{guests}</p>
                    <button onClick={() => increaseGuests()}>+</button>
                  </div>
                </div>
                <div className="reservation__pricingCalculation">
                  <p>Αρχικό κόστος: <span>&euro;{listing.price} / {translate_payment_EN_GR(listing.payment)}</span></p>
                  <p>Επιπλέον κόστος: <span>&euro;{listing.extra_price_per_guest} / καλεσμένο</span></p>
                  <p>Συνολικό κόστος: <span>&euro;{listing.price + listing.extra_price_per_guest * (guests-1)} * {rangeDays}</span></p>
                  <hr></hr>
                  <p>Σύνολο <span>&euro;{(listing.price + listing.extra_price_per_guest * (guests-1)) * rangeDays}</span></p>
                </div>
                <div className="reservation__btn">
                  <button onClick={() => handleReservation()}>Κράτηση</button>
                </div>
              </section>
            </div>
          </div>
          <section className="listing__map">
            <h2 className="section__title">Τοποθεσία</h2>
            <div className='listing__map__wrapper'>
              <MapContainer 
                lat={listing.lat}
                lng={listing.lng}
              />
            </div>
          </section>
          <section className="listing__listingReviews" id='listingReviews'>
              <h2 className="section__title">Κριτικές Αγγελίας</h2>
              <p>1 αστέρια · 150 κριτικές</p>
              <div className="reviews__grid">
                <Review
                  username={'Username'}
                  date_created={'Monrth Year'}
                  body={
                    "Τι εκπληκτικό μέρος - γαλήνιο και όμορφο, ιδανικό για οικογένειες να μείνουν σε ένα μέρος με όλα τα μελετημένα και άνετα. Υπέροχη θέα, με τόσες πολλές περιοχές χαλάρωσης και σαλόνια. Θα μπορούσα να είχα μείνει για εβδομάδες!"
                  }
                  avatar={NoImage}
                  />
                <Review
                  username={'Username'}
                  date_created={'Monrth Year'}
                  body={
                    "Είχαμε μια υπέροχη διαμονή. Η ευελιξία του Τάσσου είναι καταπληκτική. Κάνει ό, τι μπορεί για να κάνει τη διαμονή όσο πιο άνετη γίνεται. Ένα μεγάλο ευχαριστώ για όλα. Θα επιστρέψουμε, αυτό είναι σίγουρο!"
                  }
                  avatar={NoImage}
                />
                <Review
                  username={'Username'}
                  date_created={'Monrth Year'}
                  body={
                    "Τέλειοι οικοδεσπότες. Τέλειο μέρος. Ήταν υπέροχα!"
                  }
                  avatar={NoImage}
                />
                <Review
                  username={'Username'}
                  date_created={'Monrth Year'}
                  body={
                    "Είμαστε πολύ ευχαριστημένοι με τη διαμονή!"
                  }
                  avatar={NoImage}
                />
              </div>
          </section>
          <section className="listing__hostReviews">
              <h2 className="section__title">Κριτικές Οικοδεσπότη</h2>
              <p>1 αστέρια · 150 κριτικές</p>
              <div className="reviews__grid">
                <Review
                  username={'Username'}
                  date_created={'Monrth Year'}
                  body={
                    "Υπέροχο μέρος. Ο οικοδεσπότης ανταποκρίνεται πολύ. Μας βοήθησε να έχουμε μια εύκολη και πρόωρη άφιξη."
                  }
                  avatar={NoImage}
                />
                <Review
                  username={'Username'}
                  date_created={'Monrth Year'}
                  body={
                    "Τέλεια!"
                  }
                  avatar={NoImage}
                />
                <Review
                  username={'Username'}
                  date_created={'Monrth Year'}
                  body={
                    "Τι υπέροχη διαμονή σε αυτό το όμορφο ρετιρέ στην Αθήνα! Η θέα είναι μαγευτική. Η εξυπηρέτηση ήταν τέλεια! Ευχαριστούμε που μας δεχτήκατε."
                  }
                  avatar={NoImage}
                />
              </div>
          </section>
        </div>
      </div>
    )}
    </>
  )
}

export default Listing;