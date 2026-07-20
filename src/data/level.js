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
      id: 'type',
      label: 'Type',
      options: [
        { id: 't_sword', label: 'Sword', emoji: '🗡️' },
        { id: 't_spear', label: 'Spear', emoji: '🦯' },
        { id: 't_shield', label: 'Shield', emoji: '🛡️' },
        { id: 't_bow', label: 'Bow', emoji: '🏹' },
        { id: 't_hammer', label: 'Hammer', emoji: '🔨' },
      ]
    },
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
        { id: 'o_cave', label: 'Cave', emoji: '🪨' },
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
        { id: 'p_boy', label: 'Boy', emoji: '👱‍♂️' },
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
    sword: { type: 't_sword', element: 'e_wood', origin: 'o_shop', owner: 'p_knight', rarity: 'r_3', value: 'v_3' },
    spear: { type: 't_spear', element: 'e_fire', origin: 'o_cave', owner: 'p_wizard', rarity: 'r_5', value: 'v_2' },
    shield: { type: 't_shield', element: 'e_ice', origin: 'o_volcano', owner: 'p_boy', rarity: 'r_2', value: 'v_1' },
    bow: { type: 't_bow', element: 'e_fire', origin: 'o_ocean', owner: 'p_potion', rarity: 'r_1', value: 'v_4' },
    hammer: { type: 't_hammer', element: 'e_stars', origin: 'o_shop', owner: 'p_santa', rarity: 'r_4', value: 'v_5' },
  },
  clues: [
    {
      id: 1,
      text: "The <span style='color: #2e7d32; font-weight: 800'>🗡️ Sword</span> is sold in the <span style='color: #d81b60; font-weight: 800'>🎪 Shop</span>",
      status: "neutral"
    },
    {
      id: 2,
      text: "Santa owns the <span style='color: #fbc02d; font-weight: 800'>✨ Stars</span> weapon, which is extremely expensive",
      status: "neutral"
    },
    {
      id: 3,
      text: "The <span style='color: #0288d1; font-weight: 800'>❄️ Ice</span> element is found in the <span style='color: #d84315; font-weight: 800'>🌋 Volcano</span>",
      status: "highlight"
    },
    {
      id: 4,
      text: "The <span style='color: #8e24aa; font-weight: 800'>🦯 Spear</span> is rated 5 Stars and belongs to a Wizard",
      status: "neutral"
    }
  ]
};
