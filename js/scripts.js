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
      console.log(allProperties);
      if (
        allProperties.indexOf("name") !== -1 &&
        allProperties.indexOf("height") !== -1 &&
        allProperties.indexOf("types") !== -1
      ) {
        return true;
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

  return {
    add: add,
    getAll: getAll,
    search: search,
  };
})();

pokemonRepository.getAll().forEach(function (item) {
  if (item.height > 2.5) {
    document.write(`${item.name} (${item.height}) - Wow, that's big!`);
  } else {
    document.write(`${item.name} (${item.height})`);
  }
  document.write("<br><br>");
});
