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
    sword: { element: 'e_wood', origin: 'o_ruins', owner: 'p_potion', rarity: 'r_3', value: 'v_3' },
    spear: { element: 'e_fire', origin: 'o_cave', owner: 'p_wizard', rarity: 'r_5', value: 'v_1' },
    shield: { element: 'e_stars', origin: 'o_volcano', owner: 'p_knight', rarity: 'r_2', value: 'v_2' },
    bow: { element: 'e_fire', origin: 'o_ocean', owner: 'p_boy', rarity: 'r_1', value: 'v_4' },
    hammer: { element: 'e_ice', origin: 'o_shop', owner: 'p_santa', rarity: 'r_4', value: 'v_5' },
  },
  
  initialState: {
    spear: {
      origin: { id: 'o_cave', label: 'Cave', image: '/assets/cave_icon.png' },
      value: { id: 'v_1', label: 'Very Cheap', emoji: '💲' }
    }
  },
  clues: [
    { 
      id: 1, 
      text: "Step 1: The 🪄 <span style='color: #9C27B0;'>Wizard</span> wields the weapon hidden in the <img src='/assets/cave_icon.png' style='width: 1.5em; height: 1.5em; vertical-align: middle; border-radius: 4px; mix-blend-mode: multiply;' /> <span style='color: #795548;'>Cavern</span>.", 
      status: "neutral",
      check: (grid) => grid.spear?.owner?.id === 'p_wizard'
    },
    { 
      id: 2, 
      text: "Step 2: The 🛡️ <span style='color: #607D8B;'>Knight</span> is the proud owner of the defensive 🛡️ <span style='color: #4CAF50;'>Shield</span>.", 
      status: "neutral",
      check: (grid) => grid.shield?.owner?.id === 'p_knight'
    },
    { 
      id: 3, 
      text: "Step 3: The living 🧪 <span style='color: #E91E63;'>Potion</span> (Alchemist) uses the 🪵 <span style='color: #795548;'>Wood</span> element.", 
      status: "neutral",
      check: (grid) => grid.sword?.owner?.id === 'p_potion' && grid.sword?.element?.id === 'e_wood' 
    },
    { 
      id: 4, 
      text: "Step 4: The 🪵 <span style='color: #795548;'>Wood</span> element is infused in the 🗡️ <span style='color: #4CAF50;'>Sword</span>, which is a ⭐⭐⭐ <span style='color: #8D6E63;'>3 Star</span> weapon worth <span style='color: #4CAF50;'>$ $ $</span>.", 
      status: "neutral",
      check: (grid) => grid.sword?.element?.id === 'e_wood' && grid.sword?.rarity?.id === 'r_3' && grid.sword?.value?.id === 'v_3'
    },
    { 
      id: 5, 
      text: "Step 5: The farthest weapon (🔨 <span style='color: #4CAF50;'>Hammer</span>) is the most expensive at <span style='color: #4CAF50;'>$ $ $ $ $</span>, while the 🏹 <span style='color: #4CAF50;'>Bow</span> costs <span style='color: #4CAF50;'>$ $ $ $</span>.", 
      status: "neutral",
      check: (grid) => grid.hammer?.value?.id === 'v_5' && grid.bow?.value?.id === 'v_4'
    },
    { 
      id: 6, 
      text: "Step 6: 🎅 <span style='color: #D32F2F;'>Santa</span> bought his ⭐⭐⭐⭐ <span style='color: #8D6E63;'>4 Star</span> weapon from the 🎪 <span style='color: #9C27B0;'>Store</span>.", 
      status: "neutral",
      check: (grid) => grid.hammer?.owner?.id === 'p_santa' && grid.hammer?.rarity?.id === 'r_4' && grid.hammer?.origin?.id === 'o_shop'
    },
    { 
      id: 7, 
      text: "Step 7: The 🏹 <span style='color: #4CAF50;'>Bow</span> and 🦯 <span style='color: #4CAF50;'>Spear</span> both utilize the destructive 🔥 <span style='color: #FF9800;'>Fire</span> element. The 🛡️ <span style='color: #4CAF50;'>Shield</span> uses the ✨ <span style='color: #FBC02D;'>Stars</span> (Light) element.", 
      status: "neutral",
      check: (grid) => grid.bow?.element?.id === 'e_fire' && grid.spear?.element?.id === 'e_fire' && grid.shield?.element?.id === 'e_stars'
    },
    { 
      id: 8, 
      text: "Step 8: The 🦯 <span style='color: #4CAF50;'>Spear</span> is a legendary ⭐⭐⭐⭐⭐ <span style='color: #8D6E63;'>5 Star</span> weapon, while the 🏹 <span style='color: #4CAF50;'>Bow</span> found in the 🌊 <span style='color: #03A9F4;'>Ocean</span> is only ⭐ <span style='color: #8D6E63;'>1 Star</span>.", 
      status: "neutral",
      check: (grid) => grid.spear?.rarity?.id === 'r_5' && grid.bow?.origin?.id === 'o_ocean' && grid.bow?.rarity?.id === 'r_1'
    },
    { 
      id: 9, 
      text: "Step 9: Fill in the remaining traits by elimination!", 
      status: "neutral",
      check: (grid) => grid.sword?.origin?.id === 'o_ruins' && grid.shield?.rarity?.id === 'r_2' && grid.shield?.value?.id === 'v_2' && grid.bow?.owner?.id === 'p_boy' && grid.hammer?.element?.id === 'e_ice'
    }
  ]
};
