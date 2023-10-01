import { useEffect } from 'react';
import { translate_type_EN_GR, translate_payment_EN_GR } from '../utils/translate';
import { Link } from 'react-router-dom';
import './ListingCard.css'


const ListingCard = ({ listing, primary_image }) => {
  useEffect(() => {
    console.log(primary_image)
  },[])
  
  return (
    <Link to={`/listing/${listing.listing_id}`} style={{ textDecoration: 'none' }}>
      <div className="listingCard">
        <div className='listingCard__image'>
          {primary_image ? (
            <img src={primary_image} alt='Listing_Primary_Image'/>
          ) : (
            <p>Χωρίς <br/> εικόνα</p>
          )
          }
        </div>
        <div className='listingCard__info'>
          <p className='info_type_surface'>
            {translate_type_EN_GR(listing.type)}, {listing.surface}τ.μ. 
          </p>
          <p className='info_location'>
            {listing.location} (Αττική)
          </p>
          <p className='info_location'>
            {listing.beds} κρεβ · {listing.bedrooms} υ/δ · {listing.bathrooms} μπ · {listing.livingrooms} σαλ 
          </p>
          <p className='info_location'>
            {listing.rating} αστέρια · {listing.reviews} κριτικές
          </p>
          <p className='info_price'>
            &euro;{listing.price} / {translate_payment_EN_GR(listing.payment)} 
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard;