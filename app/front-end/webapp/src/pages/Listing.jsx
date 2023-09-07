import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Map, GoogleApiWrapper } from 'google-maps-react';

import MapContainer from './Map';
import Review from '../components/Review'
import './Listing.css'

// import NoImage from '../assets/no-image.jpg'
import NoImage from '../assets/test.jpg'

const lorem = "vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis"

const Listing = ({ props }) => {

  const { listing_id } = useParams();

  useEffect(() => (
    // Get listing data
    console.log(listing_id)
  ), [])

  return (
    <div className="listing">
      <div className="listing__container">
        <section className="listing__title">
          <h1>
            Τίτλος αγγελίας
          </h1>
          <p>1 αστέρια · 150 <a href="#listingReviews">κριτικές</a></p>
        </section>
        <section className="listing__pictures">
          <div className="picture__foccused">
            <img src={NoImage}></img>
          </div>
          <div className="picture__grid">
            <img src={NoImage}></img>
            <img src={NoImage}></img>
            <img src={NoImage}></img>
            <img src={NoImage}></img>
            <img src={NoImage}></img>
            <img src={NoImage}></img>
            <img src={NoImage}></img>
          </div>
        </section>
        <div className="listing__main-sidebar">
          <div className="listing_main">
            <section className="listing__generalInfo">
              <p className="generalInfo__type-surface">Διαμέρισμα, 70τ.μ.</p>
              <p className="generalInfo__location">Λαμπρινή, Γαλάτσι (Αθήνα - Δυτικά Προάστια)</p>
              <p className="generalInfo__space">4 κρεβ · 2 υ/δ · 2 μπ · 1 σαλ </p>
              <p className="generalInfo__price">€500 / μήνα</p>
            </section>
            <section className="listing__description">
              <h2 className="section__title">Περιγραφή</h2>
              <p>vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis</p>
            </section>
            <section className="listing__characteristics">
              <h2 className="section__title">Χαρακτηριστικά</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Τιμή</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Τιμή ανά τ.μ.</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Εμβαδόν</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Όροφος</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Κουζίνες</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Μπάνια</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Σαλόνια</td>
                    <td></td>
                  </tr>
                  {/* if night payment */}
                  <tr>
                    <td>Κρεβάτια</td>
                    <td></td>
                  </tr>
                  {/* if monthly payment */}
                  <tr>
                    <td>Μηνιαία κοινόχρηστα</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="listing__provisions">
              <h2 className="section__title">Παροχές</h2>
              <p>Θέρμανση</p>
              <p>Κλιματισμός</p>
              <p>Ασανσέρ</p>
              <p>Parking</p>
              {/* night payment */}
              <p>Wifi</p>
              <p className="provision-false">Τηλεόραση</p>
            </section>
            <section className="listing__rules">
              <h2 className="section__title">Κανόνες</h2>
              <p>Κάπνισμα</p>
              <p>Κατοικίδια</p>
              <p className="rule-false">Πάρτι</p>
            </section>
          </div>
          <div className="listing_sidebar">
            <section className="listing_reservation">
              <h2 className="section__title">Κράτηση</h2>
            </section>
          </div>
        </div>
        <section className="listing__map">
          <h2 className="section__title">Τοποθεσία</h2>
          <div className='listing__map__wrapper'>
            <MapContainer 
              lat={38.0225406}
              lng={23.7518316}
            />
          </div>
        </section>
        <section className="listing__listingReviews" id='listingReviews'>
            <h2 className="section__title">Κριτικές Αγγελίας</h2>
            <p>1 αστέρια · 150 κριτικές</p>
            <div className="reviews__grid">


              <div className="review">
                <div className="review_userInfo">
                  <img src={NoImage}></img>
                  <div className="review_username-date">
                    <p className="review__username">Username</p>
                    <p className="review__date">Month Year</p>
                  </div>
                </div>
                <div className="review__body">
                  <p>{lorem}</p>
                </div>
              </div>

              <div className="review">
                <div className="review_userInfo">
                  <img src={NoImage}></img>
                  <div className="review_username-date">
                    <p className="review__username">Username</p>
                    <p className="review__date">Month Year</p>
                  </div>
                </div>
                <div className="review__body">
                  <p>aghsd khasg</p>
                </div>
              </div>

              <div className="review">
                <div className="review_userInfo">
                  <img src={NoImage}></img>
                  <div className="review_username-date">
                    <p className="review__username">Username</p>
                    <p className="review__date">Month Year</p>
                  </div>
                </div>
                <div className="review__body">
                  <p>{lorem}</p>
                </div>
              </div>

              <Review
                username={'Username'}
                date_created={'Monrth Year'}
                body={lorem}
                avatar={NoImage}
              />
            </div>

        </section>
        <section className="listing__hostReviews">
            <h2 className="section__title">Κριτικές Οικοδεσπότη</h2>
            <p>1 αστέρια · 150 κριτικές</p>
        </section>
      </div>
    </div>
  )
}

export default Listing;