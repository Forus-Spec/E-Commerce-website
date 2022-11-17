// import React from 'react';
// import data from './data.json';
// import Select from 'react-select';
// import FieldShell from '../../../Components/UIComponents/InputField/FieldShell'
// import ReactSelectStyle from '../../../Components/UIComponents/ReactSelectStyle'
// import styled from 'styled-components';
// // This is our CascadingDropdown functionality
// function CascadeDropdown() {
//   const [country, setCountry] = React.useState(null);
//   const [cities, setCities  ] = React.useState([])
//   const [city, setCity] = React.useState(null);
//   const [disabled, setDisabled] = React.useState(true);
//   const [link, setLink] = React.useState("");

//   const handleCountryChange = (obj) => {
//     setCountry(obj);
//     setDisabled(false);
//     setCities(obj.cities);
//     setCity(null);
//   }
//   const handleCityChange = (obj) => {
//     setCity(obj)
//   }
//   React.useEffect(() => {
//     if (country && city) {
//       setLink(`${country} + ${city}`)
//     }
//   }, [country, city])

//   console.log(link);

//   return (
//     <>
//       <FieldShell size="medium" label="Select country">
//         <Select
//           styles={ReactSelectStyle}
//           placeholder="Select-Country"
//           value={country}
//           options={data}
//           onChange={handleCountryChange}
//           getOptionLabel={e => e.country}
//           getOptionValue={e => e.country}
//         />
//       </FieldShell>
//       <FieldShell size="medium" label="Select City">
//         <Select
//           styles={ReactSelectStyle}
//           isDisabled={disabled}
//           placeholder="Select-City"
//           value={city}
//           options={cities}
//           onChange={handleCityChange}
//           getOptionLabel={x => x.name}
//           getOptionValue={x => x.name}
//         />
//       </FieldShell>
//     </>
//   )
// }
// const AlignItems = styled.div`
// display:flex;
// justify-content:center ;
// align-items:center;
// min-width:550px;
// `

// export default CascadeDropdown;
