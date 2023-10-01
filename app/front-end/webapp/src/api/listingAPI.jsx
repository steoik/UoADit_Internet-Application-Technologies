import { translate_type_GR_EN, translate_payment_GR_EN } from '../utils/translate';

const API_URL = 'http://127.0.0.1:8000';

export const getListings = async (f) => {

  const endpoint = '/listing/filter';

  let filters = Object.assign({}, f);
  filters["type"] = translate_type_GR_EN(filters["type"]);
  filters["payment"] = translate_payment_GR_EN(filters["payment"]);

  const queryString = Object.keys(filters)
    .map((key) => (filters[key] ? `${key}=${filters[key]}` : ''))
    .filter((filter) => filter !== '')
    .join('&');
  console.log(queryString)
  console.log(`${API_URL}${endpoint}?${queryString}`)

  try {
    const response = await fetch(`${API_URL}${endpoint}?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok)
      throw new Error('Failed to receive listings.');
    else{
      console.log('Listings received successfully!')
      const listings = await response.json();
      // console.log(listings)
      return listings;
    }   
  }
  catch (error) {
    console.error(error);
    return null;
  }
  finally {
    // console.log(response);
  }
}

export const getPrimaryListingImage = async (listing_id) => {

  const endpoint = '/listing/image/primary/';

  try {
    const response = await fetch(`${API_URL}${endpoint}${listing_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok)
      throw new Error('Failed to receive primary listing image.');
    else{
      console.log('Primary listing image received successfully!')
      const primary_image = await response.json();
      return primary_image.url;
    }   
  }
  catch (error) {
    console.error(error);
    return null;
  }
  finally {
    // console.log(response);
  }
}

export const getListing = async (listing_id) => {

  const endpoint = '/listing/detail/';

  try {
    const response = await fetch(`${API_URL}${endpoint}${listing_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok)
      throw new Error('Failed to receive listing.');
    else{
      console.log('Listing received successfully!')
      const listing = await response.json();
      return listing;
    }   
  }
  catch (error) {
    console.error(error);
    return null;
  }
  finally {
    // console.log(response);
  }
}

export const getListingImages = async (listing_id) => {

  const endpoint = '/listing/image/list/';

  try {
    const response = await fetch(`${API_URL}${endpoint}${listing_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok)
      throw new Error('Failed to receive listing images.');
    else{
      console.log('Listing images received successfully!')
      const listing_images = await response.json();
      return listing_images;
    }   
  }
  catch (error) {
    console.error(error);
    return null;
  }
  finally {
    // console.log(response);
  }
}