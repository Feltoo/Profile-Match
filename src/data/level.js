export const level1 = {
  id: 1,
  title: "Level 1",
  entities: [
    { id: 'catA', label: 'Cat A', emoji: '🐈' },
    { id: 'catB', label: 'Cat B', emoji: '🐈‍⬛' },
    { id: 'catC', label: 'Cat C', emoji: '🐅' },
    { id: 'catD', label: 'Cat D', emoji: '🦲' },
    { id: 'catE', label: 'Cat E', emoji: '🐺' },
  ],
  categories: [
    {
      id: 'name',
      label: 'Name',
      options: [
        { id: 'n_oliver', label: 'Oliver' },
        { id: 'n_christie', label: 'Christie' },
        { id: 'n_simba', label: 'Simba' },
        { id: 'n_cleo', label: 'Cleo' },
        { id: 'n_mochi', label: 'Mochi' },
      ]
    },
    {
      id: 'accessory',
      label: 'Accessory',
      options: [
        { id: 'a_sunglasses', label: 'Sunglasses', emoji: '🕶️' },
        { id: 'a_ribbon', label: 'Ribbon', emoji: '🎀' },
        { id: 'a_glasses', label: 'Glasses', emoji: '👓' },
        { id: 'a_collar', label: 'Collar', emoji: '📿' },
        { id: 'a_hat', label: 'Party Hat', emoji: '🎉' },
      ]
    },
    {
      id: 'food',
      label: 'Favorite Food',
      options: [
        { id: 'f_chicken', label: 'Chicken', emoji: '🍗' },
        { id: 'f_canned', label: 'Canned Food', emoji: '🥫' },
        { id: 'f_bag', label: 'Dry Food', emoji: '🛍️' },
        { id: 'f_fish', label: 'Fish', emoji: '🐟' },
        { id: 'f_milk', label: 'Milk', emoji: '🥛' },
      ]
    }
  ],
  // The correct solution mapping entity -> category -> option.id
  solution: {
    catA: { name: 'n_oliver', accessory: 'a_sunglasses', food: 'f_fish' },
    catB: { name: 'n_christie', accessory: 'a_ribbon', food: 'f_canned' },
    catC: { name: 'n_simba', accessory: 'a_glasses', food: 'f_chicken' },
    catD: { name: 'n_cleo', accessory: 'a_collar', food: 'f_milk' },
    catE: { name: 'n_mochi', accessory: 'a_hat', food: 'f_bag' },
  },
  clues: [
    {
      id: 1,
      text: "Cat with <span style='color: #2e7d32; font-weight: 800'>🎀 Ribbon</span> is <u>not</u> next to cat with <span style='color: #2e7d32; font-weight: 800'>📿 Collar</span>",
      status: "highlight"
    },
    {
      id: 2,
      text: "<span style='color: #d81b60; font-weight: 800'>Oliver</span> loves to eat fresh food in the fish market",
      status: "neutral"
    },
    {
      id: 3,
      text: "<span style='color: #d81b60; font-weight: 800'>Christie</span> loves a variety of <br/> <span style='color: #8e24aa; font-weight: 800'>🥫 Canned Food</span>",
      status: "neutral"
    }
  ]
};
