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

// for (let i = 0; i < 3; ++i) {
//   if (pokemonList[i].height > 2.5) {
//     document.write(
//       `${pokemonList[i].name} (${pokemonList[i].height}) - Wow, that's big!`
//     );
//   } else {
//     document.write(`${pokemonList[i].name} (${pokemonList[i].height})`);
//   }
//   document.write("<br><br>");
// }

pokemonList.forEach(function (item) {
  if (item.height > 2.5) {
    document.write(`${item.name} (${item.height}) - Wow, that's big!`);
  } else {
    document.write(`${item.name} (${item.height})`);
  }
  document.write("<br><br>");
});
