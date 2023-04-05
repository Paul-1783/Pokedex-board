let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 7,
      types: ["grass", "poison"],
    },

    {
      name: "Zubat",
      height: 0.8,
      types: ["flying", "poison"],
    },
    {
      name: "Charisard",
      height: 1.7,
      types: ["fire", "flying"],
    },
  ];

  function verifyObject(pokemon) {
    if (typeof pokemon === "object") {
      let allProperties = Object.keys(pokemon);
      if (
        allProperties.indexOf("name") !== -1 &&
        allProperties.indexOf("height") !== -1 &&
        allProperties.indexOf("types") !== -1
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

  function activateListener(button, pokemon) {
    button.addEventListener("click", showDetails);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokmonListNod = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    activateListener(button, pokemon);
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    pokmonListNod.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
  };
})();

pokemonRepository
  .getAll()
  .forEach((item) => pokemonRepository.addListItem(item));
