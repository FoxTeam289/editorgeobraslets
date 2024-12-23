import { addSelect } from "./addSelect";

const showCoords = ({ lat, lng, data, productsWrapper }) => {
  const coords = document.querySelector("[data-coord]");
  if (!coords) return;

  const coordLat = coords.querySelector("[data-coord-n]");
  const coordLng = coords.querySelector("[data-coord-e]");

  const coordsN = `${lat.toFixed(4)}&deg;N`;
  const coordsE = `${lng.toFixed(4)}&deg;E`;

  coords.classList.add("show");
  coordLat.innerHTML = coordsN;
  coordLng.innerHTML = coordsE;

  data["coords"] = `${coordsN}&nbsp;${coordsE}`;
  addSelect({ productsWrapper: productsWrapper, data: data });
};

export const searchCoords = (data, productsWrapper) => {
  const script = document.createElement("script");
  script.src = "";
  script.async = true;

  window.initMap = () => {
    const searchButton = document.getElementById("searchButton");
    const wrapMap = document.getElementById("map");

    const map = new google.maps.Map(wrapMap, {
      center: { lat: 55.755826, lng: 37.6173 },
      zoom: 13,
      disableDefaultUI: true,
    });

    const marker = new google.maps.Marker({
      map: map,
      position: map.getCenter(),
      draggable: true,
    });

    const searchLocation = () => {
      const locationInput = document.getElementById("locationInput");
      if (!locationInput) return;

      const currentLocationValue = locationInput.value;
      const parent = locationInput.closest("[data-text]");
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: currentLocationValue }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;

          map.setCenter(location);
          marker.setPosition(location);

          showCoords({
            lat: location.lat(),
            lng: location.lng(),
            data: data,
            productsWrapper: productsWrapper,
          });
        } else {
          parent && parent.classList.add("error");
          console.error("Местоположение не найдено");
        }
      });
    };

    map.addListener("click", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      marker.setPosition(event.latLng);

      showCoords({
        lat: lat,
        lng: lng,
        data: data,
        productsWrapper: productsWrapper,
      });
    });

    searchButton && searchButton.addEventListener("click", searchLocation);
  };

  setTimeout(() => document.body.appendChild(script), 2000);
};
