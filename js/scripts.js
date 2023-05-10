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
    let button = document.createElement("button");
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

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemon-image");
    pokemonImage.src = pokemon.imageUrl;

    let titleElement = document.createElement("p");
    titleElement.innerText = "name: " + pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "height: " + pokemon.height;

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonImage);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    modalContainer.classList.add("is-visible");
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
