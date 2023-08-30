import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  
  const [searchParams] = useSearchParams();
  const [searchFormData, setSearchFormData] = useState({
    location: searchParams.get('location'),
    type: searchParams.get('type'),
    payment: searchParams.get('payment'),
    priceFrom: searchParams.get('priceFrom'),
    priceTo: searchParams.get('priceTo'),
    surface: searchParams.get('surface'),
    guests: searchParams.get('guests')
  })

  useEffect(() => {
    console.log(searchFormData);
  }, [searchFormData]);

  return (
    <div>
      {JSON.stringify(searchFormData)}
    </div>
  );
}

export default Search;