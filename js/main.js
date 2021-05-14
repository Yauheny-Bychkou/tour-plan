const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".slider-button--next",
    prevEl: ".slider-button--prev",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  spaceBetween: 20,
});
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [7.575227, 79.803963],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 12,
  });
  myGeoObject = new ymaps.GeoObject({});
  myMap.geoObjects.add(myGeoObject).add(
    new ymaps.Placemark(
      [7.575227, 79.803963],
      {
        balloonContentHeader: "Grand Hilton Hotel",
        balloonContentBody: "Grand Hilton Hotel",
        balloonContentFooter: "Grand Hilton Hotel",
        hintContent: "Grand Hilton Hotel",
      },
      {
        pseset: "islands#dotIcon",
        iconColor: "#EC1F46",
      }
    )
  );
}
