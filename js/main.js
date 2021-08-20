$(document).ready(function () {
  var currentFloor = 2; // переменная где хранится текущий этаж
  var floorPath = $(".home-image path"); // каждый отдельный этаж в SVG
  var counterUp = $(".counter-up");
  var counterDown = $(".counter-down");
  var modal = $(".modal");
  var modalCloseButton = $(".modal-close-button");
  var viewFlatsButton = $(".view-flats");
  var flatsPath = $(".modal-image path");
  var flatsLink = $(".flat-link");

  flatsPath.on("mouseover", function() { // при наведении курсора на квартиру на плане
    deleteClass();
    $(`[data-flat-link="${$(this).attr("data-flat")}"]`).toggleClass("current-flat");
  });

  flatsLink.on("mouseover", function() { // при навдение курсора на номер квартиры
    deleteClass();
    $(`[data-flat="${$(this).attr("data-flat-link")}"]`).toggleClass("current-flat");
  });

  function deleteClass() {
    flatsPath.removeClass("current-flat");
    flatsLink.removeClass("current-flat");
  }

  flatsLink.on("mouseout", function() {
    flatsPath.removeClass("current-flat")
  });

  flatsPath.on("mouseout", function() {
    flatsLink.removeClass("current-flat")
  });

  // функция при наведении мышкой на этаж
  floorPath.on("mouseover", function() {
    floorPath.removeClass("current-floor"); // удаляем активный класс у этажей
    currentFloor = $(this).attr("data-floor"); // получаем значение текущего этажа
    $(".counter").text(currentFloor) // записываем значение этажа в счётчик справа
  });

  floorPath.on("click", toggleModal); // клик по этажу на картинке с домом
  modalCloseButton.on("click", toggleModal); // клик по кнопке закрытия модалки
  viewFlatsButton.on("click", toggleModal);

  counterUp.on("click", function () { // клик по кнопке вверх
    if (currentFloor < 18) { // задаём условие счётчика максимального этажа
      currentFloor++; // прибавляем один этаж
      usCurrentFloor = currentFloor.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}); // добавляем к цифре этажей меньше 10 "0"
      $(".counter").text(usCurrentFloor); // записываем значение этажа в счётчик справа
      floorPath.removeClass("current-floor"); // удаляем активный класс у этажей
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor"); // подсвечиваем текущий этаж
    }
  });

  counterDown.on("click", function () { // клик по кнопке вниз
    if (currentFloor > 2) {
      currentFloor--; // отнимаем один этаж
      usCurrentFloor = currentFloor.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false}); // добавляем к цифре этажей меньше 10 "0"
      $(".counter").text(usCurrentFloor); // записываем значение этажа в счётчик справа
      floorPath.removeClass("current-floor"); // удаляем активный класс у этажей
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor"); // подсвечиваем текущий этаж
    }
  });
  function toggleModal() { // функция закрыть окно
    modal.toggleClass("is-open");
  }
});