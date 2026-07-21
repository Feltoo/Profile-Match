export const level1 = {
  id: 1,
  title: "Level 1: The Armory",
  entities: [
    { id: 'sword', label: 'A: Sword', image: '/assets/rpg_sword_1784533024259.png' },
    { id: 'spear', label: 'B: Spear', image: '/assets/rpg_spear_1784533041799.png' },
    { id: 'shield', label: 'C: Shield', image: '/assets/rpg_shield_1784533050553.png' },
    { id: 'bow', label: 'D: Bow', image: '/assets/rpg_bow_1784533059066.png' },
    { id: 'hammer', label: 'E: Hammer', image: '/assets/rpg_hammer_1784533068347.png' },
  ],
  categories: [
    {
      id: 'element',
      label: 'Element',
      options: [
        { id: 'e_wood', label: 'Wood', emoji: '🪵' },
        { id: 'e_fire', label: 'Fire', emoji: '🔥' },
        { id: 'e_ice', label: 'Ice', emoji: '❄️' },
        { id: 'e_stars', label: 'Stars', emoji: '✨' },
        { id: 'e_dark', label: 'Dark', emoji: '🌑' },
      ]
    },
    {
      id: 'origin',
      label: 'Origin',
      options: [
        { id: 'o_shop', label: 'Shop', emoji: '🎪' },
        { id: 'o_cave', label: 'Cave', image: '/assets/cave_icon.png' },
        { id: 'o_volcano', label: 'Volcano', emoji: '🌋' },
        { id: 'o_ocean', label: 'Ocean', emoji: '🌊' },
        { id: 'o_ruins', label: 'Ruins', emoji: '🏛️' },
      ]
    },
    {
      id: 'owner',
      label: 'Owner',
      options: [
        { id: 'p_knight', label: 'Knight', emoji: '🛡️' },
        { id: 'p_wizard', label: 'Wizard', emoji: '🪄' },
        { id: 'p_boy', label: 'Elf', emoji: '👱‍♂️' },
        { id: 'p_potion', label: 'Potion', emoji: '🧪' },
        { id: 'p_santa', label: 'Santa', emoji: '🎅' },
      ]
    },
    {
      id: 'rarity',
      label: 'Rarity',
      options: [
        { id: 'r_1', label: '1 Star', emoji: '⭐' },
        { id: 'r_2', label: '2 Star', emoji: '⭐⭐' },
        { id: 'r_3', label: '3 Star', emoji: '⭐⭐⭐' },
        { id: 'r_4', label: '4 Star', emoji: '⭐⭐⭐⭐' },
        { id: 'r_5', label: '5 Star', emoji: '⭐⭐⭐⭐⭐' },
      ]
    },
    {
      id: 'value',
      label: 'Value',
      options: [
        { id: 'v_1', label: 'Very Cheap', emoji: '💲' },
        { id: 'v_2', label: 'Cheap', emoji: '💲💲' },
        { id: 'v_3', label: 'Normal', emoji: '💲💲💲' },
        { id: 'v_4', label: 'Expensive', emoji: '💲💲💲💲' },
        { id: 'v_5', label: 'Priceless', emoji: '💲💲💲💲💲' },
      ]
    }
  ],
  // The correct solution mapping entity -> category -> option.id
  solution: {
    sword: { element: 'e_wood', origin: 'o_shop', owner: 'p_knight', rarity: 'r_3', value: 'v_3' },
    spear: { element: 'e_fire', origin: 'o_cave', owner: 'p_wizard', rarity: 'r_5', value: 'v_2' },
    shield: { element: 'e_ice', origin: 'o_volcano', owner: 'p_boy', rarity: 'r_2', value: 'v_1' },
    bow: { element: 'e_fire', origin: 'o_ocean', owner: 'p_potion', rarity: 'r_1', value: 'v_4' },
    hammer: { element: 'e_stars', origin: 'o_shop', owner: 'p_santa', rarity: 'r_4', value: 'v_5' },
  },
  clues: [
    { 
      id: 1, 
      text: "The 🛡️ <span style='color: #4CAF50;'>Shield</span> with the ❄️ <span style='color: #2196F3;'>Ice</span> element is owned by the 👱‍♂️ <span style='color: #8BC34A;'>Elf</span>", 
      status: "neutral",
      check: (grid) => grid.shield?.element?.id === 'e_ice' && grid.shield?.owner?.id === 'p_boy'
    },
    { 
      id: 2, 
      text: "The 🔨 <span style='color: #4CAF50;'>Hammer</span> can be bought in the same 🎪 <span style='color: #9C27B0;'>Store</span> as the 🗡️ <span style='color: #4CAF50;'>Sword</span>", 
      status: "neutral",
      check: (grid) => grid.hammer?.origin?.id === 'o_shop' && grid.sword?.origin?.id === 'o_shop'
    },
    { 
      id: 3, 
      text: "The 🦯 <span style='color: #4CAF50;'>Spear</span> is the ⭐⭐⭐⭐⭐ <span style='color: #8D6E63;'>Rarest</span> weapon in the world", 
      status: "neutral",
      check: (grid) => grid.spear?.rarity?.id === 'r_5'
    },
    { 
      id: 4, 
      text: "The 🗡️ <span style='color: #4CAF50;'>Sword</span> is wielded by the brave 🛡️ <span style='color: #607D8B;'>Knight</span>", 
      status: "neutral",
      check: (grid) => grid.sword?.owner?.id === 'p_knight'
    },
    { 
      id: 5, 
      text: "The 🏹 <span style='color: #4CAF50;'>Bow</span> is only ⭐ <span style='color: #8D6E63;'>1 Star</span> but costs a hefty <span style='color: #4CAF50;'>$ $ $ $</span>", 
      status: "neutral",
      check: (grid) => grid.bow?.rarity?.id === 'r_1' && grid.bow?.value?.id === 'v_4'
    },
    { 
      id: 6, 
      text: "The 🔨 <span style='color: #4CAF50;'>Hammer</span> is a highly rated ⭐⭐⭐⭐ <span style='color: #8D6E63;'>4 Star</span> artifact", 
      status: "neutral",
      check: (grid) => grid.hammer?.rarity?.id === 'r_4'
    },
    { 
      id: 7, 
      text: "The 🦯 <span style='color: #4CAF50;'>Spear</span> is hidden in a <img src='/assets/cave_icon.png' style='width: 1.5em; height: 1.5em; vertical-align: middle; border-radius: 4px;' /> <span style='color: #795548;'>Cave</span> by a 🪄 <span style='color: #9C27B0;'>Wizard</span>", 
      status: "neutral",
      check: (grid) => grid.spear?.origin?.id === 'o_cave' && grid.spear?.owner?.id === 'p_wizard'
    },
    { 
      id: 8, 
      text: "The ✨ <span style='color: #FBC02D;'>Stars</span> element weapon is the most expensive <span style='color: #4CAF50;'>$ $ $ $ $</span>", 
      status: "neutral",
      check: (grid) => grid.hammer?.element?.id === 'e_stars' && grid.hammer?.value?.id === 'v_5'
    },
    { 
      id: 9, 
      text: "The weapon found in the 🌊 <span style='color: #03A9F4;'>Ocean</span> belongs to a living 🧪 <span style='color: #E91E63;'>Potion</span>", 
      status: "neutral",
      check: (grid) => grid.bow?.origin?.id === 'o_ocean' && grid.bow?.owner?.id === 'p_potion'
    },
    { 
      id: 10, 
      text: "The 🪵 <span style='color: #795548;'>Wood</span> element weapon has a normal price of <span style='color: #4CAF50;'>$ $ $</span>", 
      status: "neutral",
      check: (grid) => grid.sword?.element?.id === 'e_wood' && grid.sword?.value?.id === 'v_3'
    },
    { 
      id: 11, 
      text: "The 🛡️ <span style='color: #607D8B;'>Knight's</span> weapon is rated ⭐⭐⭐ <span style='color: #8D6E63;'>3 Stars</span>", 
      status: "neutral",
      check: (grid) => grid.sword?.owner?.id === 'p_knight' && grid.sword?.rarity?.id === 'r_3'
    },
    { 
      id: 12, 
      text: "The ❄️ <span style='color: #2196F3;'>Ice</span> shield is the absolute cheapest weapon at just <span style='color: #4CAF50;'>$</span>", 
      status: "neutral",
      check: (grid) => grid.shield?.element?.id === 'e_ice' && grid.shield?.value?.id === 'v_1'
    },
    { 
      id: 13, 
      text: "The 🛡️ <span style='color: #4CAF50;'>Shield</span> was forged deep inside the 🌋 <span style='color: #FF5722;'>Volcano</span>", 
      status: "neutral",
      check: (grid) => grid.shield?.origin?.id === 'o_volcano'
    },
    { 
      id: 14, 
      text: "The 🏹 <span style='color: #4CAF50;'>Bow</span> utilizes the destructive 🔥 <span style='color: #FF9800;'>Fire</span> element", 
      status: "neutral",
      check: (grid) => grid.bow?.element?.id === 'e_fire'
    },
    { 
      id: 15, 
      text: "The 🦯 <span style='color: #4CAF50;'>Spear</span> also utilizes the 🔥 <span style='color: #FF9800;'>Fire</span> element", 
      status: "neutral",
      check: (grid) => grid.spear?.element?.id === 'e_fire'
    }
  ]
};
