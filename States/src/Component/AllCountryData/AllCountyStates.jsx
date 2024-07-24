
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
  
  // fetching all country data
  const fetchAllCountry = async()=>{
    try{
      const allCountryResponse =  await fetch(`https://crio-location-selector.onrender.com/countries`)
      if(!allCountryResponse.ok) throw new Error('Network response was not ok');
       const resultcountry = await allCountryResponse.json();
       console.log("All country", resultcountry)
       setCountries(resultcountry)
    }
     catch(e){
      console.error('fetching allCountry error', e.message)
      setCountries([])
     }
    }
    // fetching all state data
     const fetchState =async(country)=>{
      try{
          const allState = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
          // if(!allState.ok) throw new Error('Network response was not ok');
          const stateResult = await allState.json();
          // console.log('state', stateResult)
           setStates(stateResult)
      }
      catch(e){
            console.error('fetching state error', e.message)
            setStates([])
      }
     }
     // fetching the all city data
     const fetchCities = async(country, states)=>{
      try{
          const allCities = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${states}/cities`)
          // if(!allCities.ok) throw new Error('Network response was not ok');
          const citiesResult = await allCities.json();
           setCities(citiesResult)
      }
      catch(e){
        console.error('fetching cities error', e.message)
        setCities([])
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
    <div style={{ textAlign:'center',  border:'1px solid red'}}>
        <h1>Select Location</h1>
        <select onChange={handleCountries}>
          <option>Select Country</option>
        {
          countries.map((country)=>(
             <option key={country}>{country}</option>
          ))
        }
        </select>
        {' '}
        <select onChange={handleStates} disabled={!selectCountry}>
          <option>Select State</option>
          {
            states.map((state) =>(
              <option key={state}>{state}</option>
            ))
          }
        </select>
        {' '}
        <select onChange={handleCities} disabled={!selectStates}>
          
          <option>Select City</option>
          {
            cities.map((citi)=>(
             <option key={citi}>{citi}</option>
            ))
          }
        </select>
        
        {selectCities && selectStates && selectCountry &&(
          <div>
           <span> 
            <h4 style={{display:'inline'}}>You selected</h4>
            <h2 style={{display:'inline'}}> {selectCities}</h2>, {selectStates}, {selectCountry}
            </span> 
            </div>
        )}
    </div>
  )
}

export default AllCountyStates