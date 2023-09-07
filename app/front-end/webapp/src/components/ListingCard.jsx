
import './ListingCard.css'

const ListingCard = ({ listing }) => {

  return (
    <div className="listingCard">
      <div className='listingCard__image'>
        {listing.image == null &&
          <p>Χωρίς <br/> εικόνα</p>
        }
      </div>
      <div className='listingCard__info'>
        <p className='info_type_surface'>
          {listing.type}, {listing.surface}τ.μ. 
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
          &euro;{listing.price} / {listing.payment} 
        </p>

      </div>
    </div>
  )
}

export default ListingCard;