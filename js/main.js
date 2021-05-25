$(document).ready(function () {
  const hotellider = new Swiper(".hotel-slider", {
    // Optional parameters
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: ".hotel-slider__button--next",
      prevEl: ".hotel-slider__button--prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    spaceBetween: 20,
  });
  const reviewsSlider = new Swiper(".reviews-slider", {
    // Optional parameters
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: ".reviews-slider__button--next",
      prevEl: ".reviews-slider__button--prev",
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
  var menuButton = document.querySelector(".menu-button");
  menuButton.addEventListener("click", function () {
    console.log("Клик по кнопке меню");
    document.querySelector(".navbar-bottom").classList.toggle("navbar-bottom--visible");
    document.querySelector("body").classList.toggle("overflow--hidden");
  });

  var closeModalOverlay = $(".modal__overlay");
  var modalButton = $("[data-toggle=modal]");
  var closeModalButton = $(".modal__close");
  modalButton.on("click", openModal);
  closeModalButton.on("click", closeModal);
  closeModalOverlay.on("click", closeModal);

  var modalOutline = $(".modal__form-button");
  modalOutline.on("click", paintModal);
  function paintModal() {
    var modalInput = $(".input__modal");
    modalInput.addClass("input__outline");
  }

  var footerOutline = $(".footer__form-button");
  footerOutline.on("click", paintFooter);
  function paintFooter() {
    var footerInput = $(".footer__form-input");
    footerInput.addClass("input__outline");
  }

  function openModal() {
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    var modalBody = $("body");
    modalOverlay.addClass("modal__overlay--visible");
    modalDialog.addClass("modal__dialog--visible");
    modalBody.addClass("overflow--hidden");
  }
  function closeModal(event) {
    event.preventDefault();
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    var modalBody = $("body");
    modalOverlay.removeClass("modal__overlay--visible");
    modalDialog.removeClass("modal__dialog--visible");
    modalBody.removeClass("overflow--hidden");
    $(document).on("keyup", function (event) {
      if (event.keyCode == 27) {
        modalOverlay.removeClass("modal__overlay--visible");
        modalDialog.removeClass("modal__dialog--visible");
        modalBody.removeClass("overflow--hidden");
      }
    });
  }
  $(".form").each(function () {
    $(this).validate({
      errorClass: "input__error",
      messages: {
        name: {
          required: "This field is required",
          minlength: "The name must be at least 2 letters long. You only entered 1 letter",
        },
        email: {
          required: "This field is required",
          email: "Your email address must be in the format of name@domain.com",
        },
        phone: {
          required: "This field is required",
        },
      },
    });
  });

  $(".newsletter__subscribe").validate({
    errorClass: "input__newsletter",
    errorElement: "div",
    messages: {
      email: {
        required: "This field is required",
        email: "Your email address must be in the format of name@domain.com",
      },
    },
  });
  $("input[type='tel']").mask("+7 (000) 000-0000");
  AOS.init();
});
