let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function verifyObject(pokemon) {
    if (typeof pokemon === "object") {
      let allProperties = Object.keys(pokemon);
      if (
        allProperties.indexOf("name") !== -1 &&
        allProperties.indexOf("detailsUrl") !== -1
      ) {
        return true;
      } else {
        console.log("Object doesn't possess all the required attributes.");
        return false;
      }
    } else {
      console.log("Element you tried to add to pokemonlist wasn't an object.");
      return false;
    }
  }

  function add(pokemon) {
    if (verifyObject(pokemon) === true) {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function search(name) {
    return pokemonList.filter((item) => item.name === name);
  }

  function addListItem(pokemon) {
    let pokmonListNod = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.classList.add("active");
    button.setAttribute("aria-pressed", true);
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    button.innerText = pokemon.name;
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    pokmonListNod.appendChild(listItem);
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .then(hideLoadingMessage())
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showLoadingMessage() {
    let container = document.querySelector(".dex_container");
    let message = document.createElement("p");
    message.setAttribute("class", "loadingMessage");
    message.innerText = "Loading";
    container.appendChild(message);
  }

  function hideLoadingMessage() {
    let elementToRemove = document.querySelector(".loadingMessage");
    elementToRemove.parentElement.removeChild(elementToRemove);
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");
    let modalFooter = document.querySelector(".modal-footer");

    modalTitle.innerText = "";
    modalBody.innerText = "";

    let pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemon-image");
    pokemonImage.classList.add("image-fluid");
    pokemonImage.src = pokemon.imageUrl;

    modalTitle.innerText = "name: ".concat(pokemon.name);

    let weightElement = document.createElement("p");
    weightElement.innerText = "height: " + pokemon.height;

    let typesElement = document.createElement("p");
    if (!pokemon.types[1]) {
      typesElement.innerText = "types: " + pokemon.types[0].type.name;
    } else {
      typesElement.innerText =
        "types: " +
        pokemon.types[0].type.name +
        ", " +
        pokemon.types[1].type.name;
    }

    modalBody.append(pokemonImage);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,

    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
