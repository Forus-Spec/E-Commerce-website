import React from "react";
import { Slider, SliderMarker } from "@reach/slider";
// This is our
const FilteringPrice = () => {
  return (
    <SliderInput>
      <SliderTrack>
        <SliderRange />
        <SliderMarker value={50} />
        <SliderHandle />
      </SliderTrack>
    </SliderInput>
  );
};

export default FilteringPrice;
