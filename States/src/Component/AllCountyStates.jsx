
import { useEffect,useState } from "react";


const AllCountyStates = () => {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectCountry, setSelectCountry] = useState('')
  const [selectStates, setSelectStates] = useState('')
  const [selectCities, setSelectCities] = useState('')
  useEffect(()=>{
    fetchAllCountry();
  },[])
  const fetchAllCountry = async()=>{
    try{
      const allCountryResponse =  await fetch(`https://crio-location-selector.onrender.com/countries`)
       const resultcountry = await allCountryResponse.json();
       console.log("All country", resultcountry)
       setCountries(resultcountry)
    }
     catch(e){
      console.error('fetching allCountry error', e.message)
     }
    }
     const fetchState =async(countryName)=>{
      try{
          const allState = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
          const stateResult = await allState.json();
          // console.log('state', stateResult)
           setStates(stateResult)
      }
      catch(e){
            console.error('fetching state error', e.message)
      }
     }
     const fetchCities = async(country, state)=>{
      try{
          const allCities = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
          const citiesResult = await allCities.json();
           setCities(citiesResult)
      }
      catch(e){
        console.error('fetching cities error', e.message)
      }
     }
   const handleCountries =(e)=>{
      const country =  e.target.value
      setSelectCountry(country)
      setSelectStates('')
      setSelectCities('')
      setStates([])
      setCities([])
    if(country){
      fetchState(country);
    }
   }
   const handleStates =(e)=>{
    const state = e.target.value
    setSelectStates(state)
    setSelectCities('')
    setCities([])
    if(state){
        fetchCities(selectCountry, state);
    }

   }
   const handleCities = (e)=>{
    setSelectCities (e.target.value)
   }
  return (
    <div>
        <h1>Select Location</h1>
        <select onChange={handleCountries}>
          <option>Select Country</option>
        {
          countries.map((country)=>(
             <option key={country}>{country}</option>
          ))
        }
        </select>
        <select onChange={handleStates}>
          <option>Select States</option>
          {
            states.map((state) =>(
              <option key={state}>{state}</option>
            ))
          }
        </select>
        <select onChange={handleCities}>
          <option>Select City</option>
          {
            cities.map((citi)=>(
             <option key={citi}>{citi}</option>
            ))
          }
        </select>
        <br/>
        {selectCountry && selectStates && selectCities &&(
          <div><p><span><h5>You Selected {selectCountry}</h5></span>{selectStates}, {selectCities}</p></div>
        )}
    </div>
  )
}

export default AllCountyStates