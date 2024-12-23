/** @format */

import { addSelect } from "./addSelect";

const apiKey = "f162a36a-08c7-4390-88fb-1b4248f142e4";

let map = null;

const showCoords = ({ lat, lng, data, productsWrapper, center = true }) => {
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

  map.geoObjects.removeAll();

  const placemark = new ymaps.Placemark(
    [lat, lng],
    {},
    {
      preset: "islands#icon",
      iconColor: "#0095b6",
    },
  );
  map.geoObjects.add(placemark);
  center && map.setCenter([lat, lng], 10);
};

const searchLocations = (input, list, data, productsWrapper) => {
  const listLoading = list.querySelector("[data-list-loading]");
  const listEmpty = list.querySelector("[data-list-empty]");
  const listScroll = list.querySelector("[data-list-scroll]");
  const attrs = listScroll.querySelector("li").getAttributeNames();

  const closeList = () => {
    input.parentElement.classList.remove("show");
    list.classList.remove("show");

    setTimeout(() => {
      listScroll.innerHTML = "";
      listLoading.classList.remove("hide");
    }, 100);
  };

  input.addEventListener("input", (evt) => {
    const value = evt.target.value;

    if (value === "") {
      closeList();
      return;
    }

    input.parentElement.classList.add("show");
    list.classList.add("show");

    ymaps.geocode(value, { results: 10 }).then((res) => {
      listScroll.innerHTML = "";

      !res.geoObjects.events.typesCount
        ? listEmpty.classList.remove("hide")
        : listEmpty.classList.add("hide");

      res.geoObjects.each((obj) => {
        const li = document.createElement("li");
        li.textContent = obj.getAddressLine();

        for (const attr of attrs) li.setAttribute(attr, "");

        li.addEventListener("click", () => {
          const coordinates = obj.geometry.getCoordinates();

          showCoords({
            lat: coordinates[0],
            lng: coordinates[1],
            data,
            productsWrapper,
          });

          closeList();
          input.value = "";
          input.setAttribute("placeholder", li.textContent);
        });

        listScroll.insertAdjacentElement("beforeend", li);
        setTimeout(() => listLoading.classList.add("hide"), 100);
      });
    });
  });
};

const initMap = (data, productsWrapper) => {
  const coords = document.querySelector(".coords");
  const input = document.querySelector("[data-coord-input]");
  const list = document.querySelector("[data-list]");

  if (!coords && !input && !list) return;

  ymaps.ready(() => {
    map = new ymaps.Map("map", {
      center: [55.76, 37.65],
      zoom: 10,
      controls: [],
      behaviors: ["default"],
    });

    if (!map) return;

    coords.classList.remove("loading");

    map.behaviors.disable("scrollZoom");

    document.getElementById("zoom-in").addEventListener("click", () => {
      map.setZoom(map.getZoom() + 1, { duration: 100 });
    });

    document.getElementById("zoom-out").addEventListener("click", () => {
      map.setZoom(map.getZoom() - 1, { duration: 100 });
    });

    map.events.add("click", (e) => {
      const coords = e.get("coords");

      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        const placeName = firstGeoObject.getAddressLine();

        input.setAttribute("placeholder", placeName);
      });

      showCoords({
        lat: coords[0],
        lng: coords[1],
        data,
        productsWrapper,
        center: false,
      });
    });

    map.events.add("actionbegin", () => {
      map.cursors._element.classList.add("grabbing");
    });

    map.events.add("actionend", () => {
      map.cursors._element.classList.remove("grabbing");
    });

    searchLocations(input, list, data, productsWrapper);
  });
};

const createScript = (lang, data, productsWrapper) => {
  const script = document.createElement("script");
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=${lang}`;
  document.body.appendChild(script);

  script.onload = () => initMap(data, productsWrapper);
};

export const searchCoords = (data, productsWrapper) => {
  createScript("ru_RU", data, productsWrapper);
};
