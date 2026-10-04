import * as THREE from 'three';

// =====================================================================================
// MAP_CONFIG: every map dimension, zone and object lives here.
// Coordinates are meters. x runs west (-, Blue) to east (+, Red), z runs north (-) to south (+), y is up.
// Boxes use corner ranges: { x: [x0, x1], z: [z0, z1], y: [y0, y1], mat }.
// Everything in `west` is built once as written and once mirrored across x = 0 (Blue side -> Red side),
// so both teams get the same distances to A and B. Everything in `center` is built once.
// =====================================================================================
const MAP_CONFIG = {
  size: { x: [-64, 64], z: [-44, 44] },
  outerWallHeight: 8,
  player: { radius: .35, height: 1.7, eye: 1.6, walk: 4.6, run: 7.6, jump: 6, gravity: 16, stepUp: .45 },
  spawns: {
    blue: { pos: [-58, 0, 0], yaw: -Math.PI / 2 },   // looking east
    red: { pos: [58, 0, 0], yaw: Math.PI / 2 },      // looking west
  },
  palette: {
    asphalt: 0x575b5b, concrete: 0x9b9b95, concreteDark: 0x7a7c77, block: 0x6c706b,
    blueWall: 0x3a5d90, redWall: 0x8f3b35, blueFloor: 0x4d6488, redFloor: 0x7d4a44,
    warehouse: 0x6e7c77, warehouseFloor: 0x696b66, hall: 0xa79f8e, hallFloor: 0x8a857a, slab: 0x8e8a80, roof: 0x464b4f,
    crate: 0x8b6a40, pallet: 0xa1824f, barrier: 0xbcb8aa, metal: 0x4f565b, rail: 0xd6a31e, pipe: 0x6c757a, tank: 0xc6c4bb,
    contRust: 0x8a4630, contBlue: 0x2f5f8d, contGreen: 0x3f6b3c, contOchre: 0xa47a28, contGray: 0x7a8287,
    siteA: 0xd9a92b, siteB: 0xd9772b, zoneMid: 0x6d6f62, zoneLong: 0x6a6656,
  },
  // material swaps when the west half is mirrored to the east
  mirrorMat: { blueWall: 'redWall', blueFloor: 'redFloor', contBlue: 'contRust', contRust: 'contBlue' },
  mirrorText: { 'BLUE SPAWN': 'RED SPAWN', 'BLUE': 'RED' },

  // Zones for the HUD and minimap. The first match wins, so the order matters.
  zones: [
    { name: 'Central Hall 2F', ko: '중앙 건물 2층 · 발코니 · 보행로', x: [-20, 20], z: [-15.2, 13.2], yMin: 3.3, color: '#b6ab8f' },
    { name: 'Central Hall', ko: '중앙 건물 1층 통과로', x: [-12, 12], z: [-12, 10], color: '#b6ab8f' },
    { name: 'A Site', ko: 'A 지역 · 실내 창고', x: [-16, 16], z: [-44, -18], color: '#d9a92b' },
    { name: 'B Flank', ko: 'B 뒤쪽 우회로', x: [-14, 14], z: [41.5, 44], color: '#d9772b' },
    { name: 'B Site', ko: 'B 지역 · 야외 설비장', x: [-14, 14], z: [16, 44], color: '#d9772b' },
    { name: 'A Link', ko: '중앙 건물 → A 연결로', x: [-16, 16], z: [-18, -12], color: '#9b9b80' },
    { name: 'B Link', ko: '중앙 건물 → B 연결로', x: [-14, 14], z: [10, 16], color: '#9b9b80' },
    { name: 'Blue Short Route', ko: '블루 쪽 실내 진입로 (짧은 길)', x: [-48, -16], z: [-36, -26], color: '#7f8fa8' },
    { name: 'Red Short Route', ko: '레드 쪽 실내 진입로 (짧은 길)', x: [16, 48], z: [-36, -26], color: '#a88580' },
    { name: 'Blue Long Route', ko: '블루 쪽 야외 교전로 (긴 길)', x: [-50, -14], z: [13, 44], color: '#7f8fa8' },
    { name: 'Red Long Route', ko: '레드 쪽 야외 교전로 (긴 길)', x: [14, 50], z: [13, 44], color: '#a88580' },
    { name: 'Blue Mid Yard', ko: '블루 쪽 중앙 마당', x: [-50, -12], z: [-26, 13], color: '#7f8fa8' },
    { name: 'Red Mid Yard', ko: '레드 쪽 중앙 마당', x: [12, 50], z: [-26, 13], color: '#a88580' },
    { name: 'Blue Spawn', ko: '블루 팀 시작 지점 · 정비 구역', x: [-64, -48], z: [-44, 44], color: '#5b95f0' },
    { name: 'Red Spawn', ko: '레드 팀 시작 지점 · 하역 구역', x: [48, 64], z: [-44, 44], color: '#ef5a4f' },
  ],

  // ------------------------------------------------------------------ built once
  center: {
    floors: [  // colored floor paint (visual only)
      { x: [-16, 16], z: [-44, -18], color: 'warehouseFloor' },
      { x: [-7, 7], z: [-38, -24], color: 'siteA', alpha: .5 },
      { x: [-12, 12], z: [-12, 10], color: 'hallFloor' },
      { x: [-8, 8], z: [22, 36], color: 'siteB', alpha: .45 },
    ],
    decals: [  // big painted letters on the floor
      { text: 'A', x: 0, z: -31, size: 7, color: '#f2c64a' },
      { text: 'B', x: 0, z: 29, size: 7, color: '#f0913e' },
    ],
    walls: [
      // A warehouse south wall: big rolling door in the middle, two side doors
      { axis: 'z', at: -18, from: -16, to: 16, h: 9, mat: 'warehouse', open: [[-4, 4, 0, 4.5], [-14, -11, 0, 3], [11, 14, 0, 3]] },
      // Central hall north and south walls: 1F doors, 2F doors to the catwalk/balcony, 2F windows
      { axis: 'z', at: -12, from: -12, to: 12, h: 8, mat: 'hall', open: [[-2, 2, 0, 3], [-2, 2, 4, 6.4], [-7, -4.5, 5, 6.6], [4.5, 7, 5, 6.6]] },
      { axis: 'z', at: 10, from: -12, to: 12, h: 8, mat: 'hall', open: [[-2, 2, 0, 3], [-8, -6, 4, 6.4], [6, 8, 4, 6.4], [-4.5, -3, 5, 6.6], [3, 4.5, 5, 6.6]] },
    ],
    boxes: [
      // outer boundary
      { x: [-64.5, 64.5], z: [-44.5, -44], y: [0, 8], mat: 'concreteDark' },
      { x: [-64.5, 64.5], z: [44, 44.5], y: [0, 8], mat: 'concreteDark' },
      // A warehouse: roof, racks, crates (the site is split by pillars and stacks)
      { x: [-16, 16], z: [-44, -18], y: [9, 9.3], mat: 'roof', kind: 'roof' },
      { x: [-14, -6], z: [-43.8, -42.6], y: [0, 4], mat: 'metal' },
      { x: [6, 14], z: [-43.8, -42.6], y: [0, 4], mat: 'metal' },
      { x: [-3, -1], z: [-32, -30], y: [0, 2], mat: 'crate' },
      { x: [-2.6, -1.4], z: [-31.6, -30.4], y: [2, 3.2], mat: 'crate' },
      { x: [3, 4.5], z: [-28, -26.5], y: [0, 1.5], mat: 'crate' },
      { x: [5, 7], z: [-36, -34], y: [0, 1.2], mat: 'crate' },
      { x: [-13.5, -9], z: [-41, -39.5], y: [0, 1.5], mat: 'crate' },
      { x: [9, 11], z: [-42, -40], y: [0, 3], mat: 'crate' },
      { x: [-8, -6.5], z: [-23, -21.5], y: [0, 1.4], mat: 'crate' },
      { x: [6.5, 8], z: [-22, -20.5], y: [0, 2], mat: 'crate' },
      { x: [-.6, .6], z: [-37.4, -36.2], y: [0, 9], mat: 'concrete' },
      // Central hall: roof, 2F slab with two stairwell holes (x -11.75..-3.5 and 3.5..11.75 at the north wall)
      { x: [-12, 12], z: [-12, 10], y: [8, 8.3], mat: 'roof', kind: 'roof' },
      { x: [-11.75, 11.75], z: [-9.6, 9.75], y: [3.7, 4], mat: 'slab', kind: 'slab' },
      { x: [-3.5, 3.5], z: [-11.75, -9.6], y: [3.7, 4], mat: 'slab', kind: 'slab' },
      { x: [-.5, .5], z: [-1.5, -.5], y: [0, 3.7], mat: 'concrete' },                   // breaks the long 1F door-to-door sightline
      // south balcony (overlooks B Link and both long routes) and north catwalk (overlooks A Link)
      { x: [-12, 12], z: [10.25, 13], y: [3.7, 4], mat: 'slab', kind: 'slab' },
      { x: [-12, 12], z: [12.85, 13], y: [4, 5], mat: 'rail' },
      { x: [-12, 12], z: [-15, -12.25], y: [3.7, 4], mat: 'slab', kind: 'slab' },
      { x: [-12, 12], z: [-15, -14.85], y: [4, 5], mat: 'rail' },
      // B link: a barrier so the hall door does not look straight onto the site
      { x: [-3, 3], z: [17, 17.6], y: [0, 1.1], mat: 'barrier' },
      // B site: generator in the middle
      { x: [-2, 2], z: [30, 32], y: [0, 1.8], mat: 'metal' },
    ],
    signs: [
      { text: 'A SITE', sub: 'WAREHOUSE', pos: [0, 6.3, -17.7], ry: 0, w: 6, h: 1.8, bg: '#d9a92b', fg: '#1b1b1b' },
      { text: 'A', sub: 'LOADING BAY', pos: [0, 6.5, -43.7], ry: 0, w: 3.2, h: 2.4, bg: '#d9a92b', fg: '#1b1b1b' },
      { text: 'CENTRAL HALL', sub: '2F BALCONY', pos: [0, 7.3, 10.3], ry: 0, w: 7, h: 1.2, bg: '#e6e0d0', fg: '#262626' },
      { text: 'CENTRAL HALL', sub: '2F CATWALK', pos: [0, 7.3, -12.3], ry: Math.PI, w: 7, h: 1.2, bg: '#e6e0d0', fg: '#262626' },
    ],
    lights: [
      { pos: [0, 8.2, -31], color: 0xfff1d6, intensity: 60, distance: 26 },
      { pos: [0, 8.2, -22], color: 0xfff1d6, intensity: 40, distance: 20 },
      { pos: [0, 3.3, -6], color: 0xfff1d6, intensity: 18, distance: 14 },
    ],
    pipes: [],
    tanks: [],
    stairs: [],
  },

  // ------------------------------------------------------------------ Blue half (mirrored to Red)
  west: {
    floors: [
      { x: [-64, -50], z: [-16, 16], color: 'blueFloor' },
      { x: [-50, -12], z: [-26, 13], color: 'zoneMid', alpha: .25 },
      { x: [-50, -14], z: [13, 44], color: 'zoneLong', alpha: .25 },
    ],
    decals: [],
    walls: [
      // spawn enclosure: two exits east, one north (to the short route), one south (to the long route)
      { axis: 'x', at: -50, from: -16, to: 16, h: 4, mat: 'blueWall', open: [[-13, -9, 0, 3.2], [9, 13, 0, 3.2]] },
      { axis: 'z', at: -16, from: -64, to: -50, h: 4, mat: 'blueWall', open: [[-60, -55, 0, 3.2]] },
      { axis: 'z', at: 16, from: -64, to: -50, h: 4, mat: 'blueWall', open: [[-60, -55, 0, 3.2]] },
      // short route building: door from the spawn side, S-shaped corridor with two corners, door into A
      { axis: 'x', at: -48, from: -36, to: -26, h: 4.5, mat: 'concrete', open: [[-30, -27, 0, 3]] },
      { axis: 'z', at: -26, from: -48, to: -16, h: 4.5, mat: 'concrete' },
      { axis: 'z', at: -31, from: -48, to: -27, h: 4.5, mat: 'concrete' },                 // corner 1 is the gap x -27..-22
      { axis: 'z', at: -31, from: -22, to: -16, h: 4.5, mat: 'concrete' },
      { axis: 'x', at: -22, from: -31, to: -26, h: 4.5, mat: 'concrete' },                 // closes the south strip: turn north
      // A warehouse west wall with the short-route door
      { axis: 'x', at: -16, from: -44, to: -18, h: 9, mat: 'warehouse', open: [[-35, -32, 0, 3]] },
      // central hall west wall: 1F door, 2F windows looking over the mid yard
      { axis: 'x', at: -12, from: -12, to: 10, h: 8, mat: 'hall', open: [[-3, 1, 0, 3], [-8, -5, 5, 6.6], [3, 7, 5, 6.6]] },
      // divider between the mid yard and the long route (gap x -22..-14 next to the hall)
      { axis: 'z', at: 13, from: -50, to: -22, h: 3.5, mat: 'concrete' },
    ],
    boxes: [
      { x: [-64.5, -64], z: [-44.5, 44.5], y: [0, 8], mat: 'concreteDark' },                // outer west wall
      // Blue spawn: supply racks, crates, sight blockers in front of the exits
      { x: [-63.5, -62.5], z: [-10, 10], y: [0, 3], mat: 'metal' },
      { x: [-56, -54.5], z: [-14, -12.5], y: [0, 1.2], mat: 'crate' },
      { x: [-56, -54.5], z: [12.5, 14], y: [0, 1.2], mat: 'crate' },
      { x: [-47, -46.4], z: [-15, -7], y: [0, 3], mat: 'blueWall' },
      { x: [-47, -46.4], z: [7, 15], y: [0, 3], mat: 'blueWall' },
      { x: [-60, -58], z: [-36, -34], y: [0, 1.4], mat: 'crate' },
      { x: [-56, -53], z: [-24, -23.4], y: [0, 1.1], mat: 'barrier' },
      { x: [-60, -58], z: [24, 26], y: [0, 1.5], mat: 'crate' },
      // short route: the block north of the corridor, its roof, the sealed pocket, low crates
      { x: [-48, -16], z: [-44, -36], y: [0, 4.8], mat: 'block' },
      { x: [-48, -16], z: [-36, -26], y: [4.5, 4.8], mat: 'roof', kind: 'roof' },
      { x: [-21.75, -16], z: [-30.75, -26.25], y: [0, 4.5], mat: 'block' },
      { x: [-36, -35], z: [-30.6, -29.4], y: [0, 1], mat: 'crate' },
      { x: [-44, -42.8], z: [-27.4, -26.3], y: [0, 1.1], mat: 'crate' },
      { x: [-30, -29], z: [-35.6, -34.6], y: [0, 1], mat: 'crate' },
      { x: [-20, -19], z: [-32.4, -31.3], y: [0, 1], mat: 'crate' },
      // A warehouse pillars
      { x: [-8.4, -7.6], z: [-37.4, -36.6], y: [0, 9], mat: 'concrete' },
      { x: [-8.4, -7.6], z: [-25.4, -24.6], y: [0, 9], mat: 'concrete' },
      // mid yard: container, truck, crates, barriers, low wall
      { x: [-44, -38], z: [-22, -19.5], y: [0, 2.6], mat: 'contGreen', kind: 'container' },
      { x: [-40, -34], z: [-8, -5.5], y: [0, 3], mat: 'contGray' },
      { x: [-34, -32], z: [-8, -5.5], y: [0, 2.4], mat: 'blueWall' },
      { x: [-29, -27], z: [-19, -17], y: [0, 2], mat: 'crate' },
      { x: [-27, -26], z: [-18.5, -17.5], y: [0, 1], mat: 'crate' },
      { x: [-24, -21], z: [2, 2.6], y: [0, 1.1], mat: 'barrier' },
      { x: [-30, -29.4], z: [-4, 4], y: [0, 1.2], mat: 'concrete' },
      { x: [-18, -16.5], z: [5, 6.5], y: [0, 1.2], mat: 'crate' },
      { x: [-44, -42.8], z: [6, 7.2], y: [0, .25], mat: 'pallet' },
      { x: [-43.9, -42.9], z: [6.1, 7.1], y: [.25, 1.25], mat: 'crate' },
      // central hall: inner stair rail, 1F crates, balcony and catwalk supports
      { x: [-11.75, -3.5], z: [-9.75, -9.6], y: [4, 5], mat: 'rail' },
      { x: [-8, -6.5], z: [3, 4.5], y: [0, 1.2], mat: 'crate' },
      { x: [-6.15, -5.85], z: [12.5, 12.8], y: [0, 3.7], mat: 'metal' },
      { x: [-6.15, -5.85], z: [-14.8, -14.5], y: [0, 3.7], mat: 'metal' },
      // long route: containers (one stacked), barriers, pallets; pipe rack collider along the south wall
      { x: [-46, -40], z: [18, 20.5], y: [0, 2.6], mat: 'contRust', kind: 'container' },
      { x: [-36, -33.5], z: [24, 30], y: [0, 2.6], mat: 'contGreen', kind: 'container' },
      { x: [-28, -22], z: [17, 19.5], y: [0, 2.6], mat: 'contBlue', kind: 'container' },
      { x: [-28, -22], z: [17, 19.5], y: [2.6, 5.2], mat: 'contOchre', kind: 'container' },
      { x: [-44, -38], z: [36, 38.5], y: [0, 2.6], mat: 'contOchre', kind: 'container' },
      { x: [-21, -18.5], z: [30, 36], y: [0, 2.6], mat: 'contRust', kind: 'container' },
      { x: [-30, -27], z: [34, 34.6], y: [0, 1.1], mat: 'barrier' },
      { x: [-41, -38], z: [28, 28.6], y: [0, 1.1], mat: 'barrier' },
      { x: [-17, -14], z: [22, 22.6], y: [0, 1.1], mat: 'barrier' },
      { x: [-25, -23.8], z: [38, 39.2], y: [0, .25], mat: 'pallet' },
      { x: [-24.9, -23.9], z: [38.1, 39.1], y: [.25, 1.25], mat: 'crate' },
      { x: [-50, -16], z: [42.3, 43.7], y: [0, 2], mat: 'pipe', hidden: true },
      // B site: side container, flank wall of containers (gaps at x -8..-6 and -1.2..1.2), barrier
      { x: [-12, -6], z: [26, 28.5], y: [0, 2.6], mat: 'contBlue', kind: 'container' },
      { x: [-14, -8], z: [39, 41.5], y: [0, 2.6], mat: 'contGray', kind: 'container' },
      { x: [-6, -1.2], z: [39, 41.5], y: [0, 2.6], mat: 'contGreen', kind: 'container' },
      { x: [-6, -1.2], z: [39, 41.5], y: [2.6, 5.2], mat: 'contRust', kind: 'container' },
      { x: [-5, -2], z: [24, 24.6], y: [0, 1.1], mat: 'barrier' },
    ],
    stairs: [
      // ascent direction: '+x' means the steps rise toward +x
      { x: [-11.5, -3.5], z: [-11.75, -9.75], rise: 4, steps: 16, dir: '+x', mat: 'concreteDark' },   // inside the hall
      { x: [-20, -12], z: [10.5, 12.5], rise: 4, steps: 16, dir: '+x', mat: 'concreteDark' },       // up to the south balcony
      { x: [-20, -12], z: [-14.75, -12.75], rise: 4, steps: 16, dir: '+x', mat: 'concreteDark' },   // up to the north catwalk
    ],
    pipes: [
      { from: [-50, .6, 42.7], to: [-16, .6, 42.7], r: .35 },
      { from: [-50, 1.5, 43.3], to: [-16, 1.5, 43.3], r: .3 },
    ],
    tanks: [
      { x: -9.5, z: 33, r: 1.2, h: 3.2 },
    ],
    signs: [
      { text: 'BLUE SPAWN', sub: '← A        B →', pos: [-50.3, 3, 0], ry: -Math.PI / 2, w: 6, h: 1.6, bg: '#3a5d90', fg: '#ffffff' },
      { text: 'BLUE SPAWN', sub: 'MAINTENANCE', pos: [-49.7, 3, 0], ry: Math.PI / 2, w: 6, h: 1.5, bg: '#3a5d90', fg: '#ffffff' },
      { text: 'SHORT ROUTE', sub: '→ A', pos: [-48.3, 3.7, -28.5], ry: -Math.PI / 2, w: 4.4, h: 1.2, bg: '#e6e0d0', fg: '#262626' },
      { text: 'A', sub: '→', pos: [-16.3, 3.9, -33.5], ry: -Math.PI / 2, w: 1.6, h: 1.2, bg: '#d9a92b', fg: '#1b1b1b' },
      { text: 'LONG ROUTE', sub: '→ B', pos: [-36, 2.6, 13.3], ry: 0, w: 4.4, h: 1.2, bg: '#e6e0d0', fg: '#262626' },
      { text: 'B SITE', sub: 'UTILITY YARD', pos: [-3.6, 4, 38.9], ry: Math.PI, w: 4.2, h: 1.5, bg: '#d9772b', fg: '#1b1b1b' },
      { text: 'CENTRAL HALL', sub: '1F', pos: [-12.3, 3.6, -1], ry: -Math.PI / 2, w: 4.6, h: 1, bg: '#e6e0d0', fg: '#262626' },
    ],
    lights: [
      { pos: [-35, 4, -28.5], color: 0xffe3b0, intensity: 14, distance: 12 },
      { pos: [-24, 4, -33.5], color: 0xffe3b0, intensity: 14, distance: 12 },
      { pos: [-8, 8.2, -31], color: 0xfff1d6, intensity: 45, distance: 22 },
      { pos: [-6, 7.4, 0], color: 0xfff1d6, intensity: 18, distance: 14 },
    ],
  },
};

// =====================================================================================
// mirroring (Blue half -> Red half)
// =====================================================================================
const mm = m => MAP_CONFIG.mirrorMat[m] || m;
const flip = ([a, b]) => [-b, -a];
const mirror = {
  floors: f => ({ ...f, x: flip(f.x), color: mm(f.color) }),
  decals: d => ({ ...d, x: -d.x }),
  walls: w => w.axis === 'x'
    ? { ...w, at: -w.at, mat: mm(w.mat) }
    : { ...w, from: -w.to, to: -w.from, mat: mm(w.mat), open: (w.open || []).map(([a, b, y0, y1]) => [-b, -a, y0, y1]) },
  boxes: b => ({ ...b, x: flip(b.x), mat: mm(b.mat) }),
  stairs: s => ({ ...s, x: flip(s.x), dir: s.dir === '+x' ? '-x' : s.dir === '-x' ? '+x' : s.dir }),
  pipes: p => ({ ...p, from: [-p.from[0], p.from[1], p.from[2]], to: [-p.to[0], p.to[1], p.to[2]] }),
  tanks: t => ({ ...t, x: -t.x }),
  signs: s => ({
    ...s, pos: [-s.pos[0], s.pos[1], s.pos[2]], ry: -s.ry,
    text: MAP_CONFIG.mirrorText[s.text] || s.text,
    sub: s.sub === 'MAINTENANCE' ? 'LOADING DOCK' : s.sub === '← A        B →' ? '← B        A →' : s.sub === '→ A' ? 'A ←' : s.sub === '→ B' ? 'B ←' : s.sub === '→' ? '←' : s.sub,
    bg: s.bg === '#3a5d90' ? '#8f3b35' : s.bg,
  }),
  lights: l => ({ ...l, pos: [-l.pos[0], l.pos[1], l.pos[2]] }),
};
function layout() {
  const out = {};
  for (const key of Object.keys(mirror)) {
    const west = MAP_CONFIG.west[key] || [];
    out[key] = [...(MAP_CONFIG.center[key] || []), ...west, ...west.map(mirror[key])];
  }
  return out;
}

// =====================================================================================
// renderer, scene, lights
// =====================================================================================
const canvas = document.getElementById('view');
const lowEnd = matchMedia('(pointer: coarse)').matches || Math.min(screen.width, screen.height) < 700;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowEnd });
renderer.setPixelRatio(Math.min(devicePixelRatio, lowEnd ? 1.25 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const SKY = 0xb9c3c8;
scene.background = new THREE.Color(SKY);
scene.fog = new THREE.Fog(SKY, 35, 150);

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, .05, 400);
camera.rotation.order = 'YXZ';

scene.add(new THREE.HemisphereLight(0xe2eaf0, 0x5a574e, 1.7));
scene.add(new THREE.AmbientLight(0xffffff, .5));
const sun = new THREE.DirectionalLight(0xfff0d8, 2.6);
sun.position.set(45, 80, 30);
sun.castShadow = true;
sun.shadow.mapSize.set(lowEnd ? 2048 : 4096, lowEnd ? 2048 : 4096);
Object.assign(sun.shadow.camera, { left: -80, right: 80, top: 60, bottom: -60, near: 10, far: 220 });
sun.shadow.bias = -.0004;
sun.shadow.normalBias = .03;
scene.add(sun, sun.target);

// =====================================================================================
// map construction
// =====================================================================================
const COLLIDERS = [];   // { min: [x, y, z], max: [x, y, z], kind, mat }
const MATS = {};
function mat(key) {
  if (!MATS[key]) {
    const c = MAP_CONFIG.palette[key] ?? 0xff00ff;
    const metal = /^cont|metal|pipe|rail|tank/.test(key);
    MATS[key] = new THREE.MeshStandardMaterial({ color: c, roughness: metal ? .6 : .9, metalness: metal ? .35 : 0 });
  }
  return MATS[key];
}

function addBox(b) {
  const [x0, x1] = b.x, [z0, z1] = b.z, [y0, y1] = b.y;
  if (x1 - x0 <= 0 || z1 - z0 <= 0 || y1 - y0 <= 0) return;
  COLLIDERS.push({ min: [x0, y0, z0], max: [x1, y1, z1], kind: b.kind || 'solid', mat: b.mat });
  if (b.hidden) return;
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), mat(b.mat));
  mesh.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  mesh.castShadow = true; mesh.receiveShadow = true;
  scene.add(mesh);
  if (b.kind === 'container') addContainerTrim(b);
}

// Container look: darker end doors and corrugation ribs on the long sides (visual only).
const TRIM = {};
function trimMat(key) {
  if (!TRIM[key]) TRIM[key] = new THREE.MeshStandardMaterial({ color: new THREE.Color(MAP_CONFIG.palette[key]).multiplyScalar(.72), roughness: .7, metalness: .3 });
  return TRIM[key];
}
function addContainerTrim(b) {
  const [x0, x1] = b.x, [z0, z1] = b.z, [y0, y1] = b.y;
  const alongX = x1 - x0 >= z1 - z0;
  const len = alongX ? x1 - x0 : z1 - z0, wid = alongX ? z1 - z0 : x1 - x0, h = y1 - y0;
  const g = new THREE.Group();
  for (const e of [-1, 1]) {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(.12, h + .02, wid + .04), trimMat(b.mat));
    frame.position.x = e * (len / 2 - .05);
    g.add(frame);
  }
  const ribMat = mat(b.mat);
  for (let i = 1; i < len / .55; i++) {
    for (const s of [-1, 1]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(.12, h - .2, .05), ribMat);
      rib.position.set(-len / 2 + i * .55, 0, s * (wid / 2 + .02));
      g.add(rib);
    }
  }
  g.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  if (!alongX) g.rotation.y = Math.PI / 2;
  g.traverse(o => { o.castShadow = o.receiveShadow = true; });
  scene.add(g);
}

// A wall with openings. axis 'x': wall at x = at running along z; axis 'z': wall at z = at running along x.
// open: [[a, b, y0, y1]] along the wall length. The wall is cut into columns and each column keeps the
// solid height ranges that no opening covers.
function addWall(w) {
  const t = w.t ?? .5, y0 = w.y0 ?? 0, open = w.open || [];
  const cuts = [...new Set([w.from, w.to, ...open.flatMap(o => [o[0], o[1]])])].filter(v => v >= w.from && v <= w.to).sort((a, b) => a - b);
  for (let i = 0; i < cuts.length - 1; i++) {
    const a = cuts[i], b = cuts[i + 1], mid = (a + b) / 2;
    const holes = open.filter(o => o[0] <= mid && o[1] >= mid).map(o => [o[2], o[3]]).sort((p, q) => p[0] - q[0]);
    let y = y0;
    const solids = [];
    for (const [h0, h1] of holes) { if (h0 > y) solids.push([y, h0]); y = Math.max(y, h1); }
    if (y < y0 + w.h) solids.push([y, y0 + w.h]);
    for (const ys of solids) {
      if (w.axis === 'x') addBox({ x: [w.at - t / 2, w.at + t / 2], z: [a, b], y: ys, mat: w.mat });
      else addBox({ x: [a, b], z: [w.at - t / 2, w.at + t / 2], y: ys, mat: w.mat });
    }
  }
}

// Stairs: one solid box per step, each step reaching from the floor to its tread.
function addStairs(s) {
  const n = s.steps, along = s.dir.endsWith('x') ? 'x' : 'z', up = s.dir.startsWith('+');
  const [a0, a1] = s[along], step = (a1 - a0) / n;
  for (let i = 0; i < n; i++) {
    const k = up ? i : n - 1 - i;
    const r = [a0 + k * step, a0 + (k + 1) * step];
    const top = (s.y0 ?? 0) + s.rise * (i + 1) / n;
    addBox({ x: along === 'x' ? r : s.x, z: along === 'z' ? r : s.z, y: [s.y0 ?? 0, top], mat: s.mat, kind: 'stairs' });
  }
}

function addPipe(p) {
  const a = new THREE.Vector3(...p.from), b = new THREE.Vector3(...p.to);
  const len = a.distanceTo(b);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(p.r, p.r, len, 14), mat('pipe'));
  mesh.position.copy(a).add(b).multiplyScalar(.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  mesh.castShadow = mesh.receiveShadow = true;
  scene.add(mesh);
  // supports every 6 m
  for (let d = 0; d <= len; d += 6) {
    const q = a.clone().lerp(b, d / len);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(.15, q.y + p.r, .9), mat('metal'));
    leg.position.set(q.x, (q.y + p.r) / 2, q.z); leg.castShadow = true;
    scene.add(leg);
  }
}

function addTank(t) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(t.r, t.r, t.h, 24), mat('tank'));
  mesh.position.set(t.x, t.h / 2, t.z);
  mesh.castShadow = mesh.receiveShadow = true;
  scene.add(mesh);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(t.r + .03, t.r + .03, .25, 24), mat('rail'));
  band.position.set(t.x, t.h * .7, t.z);
  scene.add(band);
  COLLIDERS.push({ min: [t.x - t.r, 0, t.z - t.r], max: [t.x + t.r, t.h, t.z + t.r], kind: 'tank', mat: 'tank' });
}

function addFloor(f) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(f.x[1] - f.x[0], f.z[1] - f.z[0]),
    new THREE.MeshStandardMaterial({ color: MAP_CONFIG.palette[f.color], roughness: .95, transparent: f.alpha !== undefined, opacity: f.alpha ?? 1, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set((f.x[0] + f.x[1]) / 2, .005, (f.z[0] + f.z[1]) / 2);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function textCanvas(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function addDecal(d) {
  const tex = textCanvas(256, 256, (g, w, h) => {
    g.fillStyle = d.color; g.globalAlpha = .85;
    g.font = '900 230px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(d.text, w / 2, h / 2 + 10);
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(d.size, d.size),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: .9, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(d.x, .01, d.z);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function addSign(s) {
  const pw = 512, ph = Math.round(512 * s.h / s.w);
  const tex = textCanvas(pw, ph, (g, w, h) => {
    g.fillStyle = s.bg; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(0,0,0,.55)'; g.lineWidth = Math.max(6, h * .05); g.strokeRect(g.lineWidth / 2, g.lineWidth / 2, w - g.lineWidth, h - g.lineWidth);
    g.fillStyle = s.fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    const big = Math.min(h * (s.sub ? .5 : .7), w / Math.max(3, s.text.length * .62));
    g.font = `900 ${big}px system-ui, sans-serif`;
    g.fillText(s.text, w / 2, s.sub ? h * .4 : h / 2);
    if (s.sub) { g.font = `700 ${Math.min(h * .22, big * .5)}px system-ui, sans-serif`; g.fillText(s.sub, w / 2, h * .78); }
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), new THREE.MeshBasicMaterial({ map: tex }));
  mesh.position.set(...s.pos);
  mesh.rotation.y = s.ry;
  scene.add(mesh);
}

function addLight(l) {
  const p = new THREE.PointLight(l.color, l.intensity, l.distance, 2);
  p.position.set(...l.pos);
  scene.add(p);
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(.8, .08, .3), new THREE.MeshBasicMaterial({ color: 0xfff6dc }));
  lamp.position.set(l.pos[0], l.pos[1] + .1, l.pos[2]);
  scene.add(lamp);
}

const L = layout();
function buildMap() {
  const [mx0, mx1] = MAP_CONFIG.size.x, [mz0, mz1] = MAP_CONFIG.size.z;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(mx1 - mx0 + 40, mz1 - mz0 + 40), new THREE.MeshStandardMaterial({ color: MAP_CONFIG.palette.asphalt, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  L.floors.forEach(addFloor);
  L.decals.forEach(addDecal);
  L.walls.forEach(addWall);
  L.boxes.forEach(addBox);
  L.stairs.forEach(addStairs);
  L.pipes.forEach(addPipe);
  L.tanks.forEach(addTank);
  L.signs.forEach(addSign);
  L.lights.forEach(addLight);
}
buildMap();

// =====================================================================================
// player: movement, look, jump, collision
// =====================================================================================
const P = MAP_CONFIG.player;
const player = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, yaw: 0, pitch: 0, ground: true };
let team = 'blue';

function respawn() {
  const s = MAP_CONFIG.spawns[team];
  [player.x, player.y, player.z] = s.pos;
  player.vx = player.vy = player.vz = 0;
  player.yaw = s.yaw; player.pitch = 0; player.ground = true;
}

// does the player's box at (x, y, z) overlap any collider?
function overlaps(x, y, z) {
  const r = P.radius, top = y + P.height;
  for (const c of COLLIDERS) {
    if (c.min[0] < x + r && c.max[0] > x - r && c.min[2] < z + r && c.max[2] > z - r && c.min[1] < top && c.max[1] > y + .001) return c;
  }
  return null;
}
function highestBlockingTop(x, y, z) {
  const r = P.radius, top = y + P.height;
  let best = -Infinity;
  for (const c of COLLIDERS) {
    if (c.min[0] < x + r && c.max[0] > x - r && c.min[2] < z + r && c.max[2] > z - r && c.min[1] < top && c.max[1] > y + .001) best = Math.max(best, c.max[1]);
  }
  return best;
}
// height of the highest surface under the player's footprint at or below y (0 = ground)
function supportBelow(x, y, z) {
  const r = P.radius;
  let best = 0;
  for (const c of COLLIDERS) {
    if (c.min[0] < x + r && c.max[0] > x - r && c.min[2] < z + r && c.max[2] > z - r && c.max[1] <= y + .001 && c.max[1] > best) best = c.max[1];
  }
  return best;
}
function ceilingAbove(x, y, z) {
  const r = P.radius, top = y + P.height;
  let best = Infinity;
  for (const c of COLLIDERS) {
    if (c.min[0] < x + r && c.max[0] > x - r && c.min[2] < z + r && c.max[2] > z - r && c.min[1] >= top - .001 && c.min[1] < best) best = c.min[1];
  }
  return best;
}

// move along one axis; on the ground a low obstacle (stairs, curbs) is stepped onto instead of blocking
function moveAxis(axis, d) {
  if (!d) return;
  const n = Math.ceil(Math.abs(d) / .2), s = d / n;
  for (let i = 0; i < n; i++) {
    player[axis] += s;
    if (!overlaps(player.x, player.y, player.z)) continue;
    const top = highestBlockingTop(player.x, player.y, player.z);
    if (player.ground && top - player.y <= P.stepUp && !overlaps(player.x, top, player.z)) { player.y = top; continue; }
    player[axis] -= s;
    if (axis === 'x') player.vx = 0; else player.vz = 0;
    return;
  }
}

const keys = {};
let locked = false;
function updatePlayer(dt) {
  let fx = 0, fz = 0;
  if (keys.KeyW) fz += 1; if (keys.KeyS) fz -= 1;
  if (keys.KeyD) fx += 1; if (keys.KeyA) fx -= 1;
  const len = Math.hypot(fx, fz); if (len > 0) { fx /= len; fz /= len; }
  const speed = keys.ShiftLeft || keys.ShiftRight ? P.run : P.walk;
  const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw);
  // forward is (-sin, -cos), right is (cos, -sin)
  const tvx = (-sin * fz + cos * fx) * speed, tvz = (-cos * fz - sin * fx) * speed;
  const acc = player.ground ? 14 : 3;
  player.vx += (tvx - player.vx) * Math.min(1, dt * acc);
  player.vz += (tvz - player.vz) * Math.min(1, dt * acc);

  if (keys.Space && player.ground) { player.vy = P.jump; player.ground = false; }

  moveAxis('x', player.vx * dt);
  moveAxis('z', player.vz * dt);

  // vertical: gravity, landing, ceilings; stick to stairs when walking down
  const wasGround = player.ground;
  player.vy -= P.gravity * dt;
  let ny = player.y + player.vy * dt;
  if (player.vy <= 0) {
    const floor = supportBelow(player.x, player.y, player.z);
    if (ny <= floor || (wasGround && player.y - floor <= P.stepUp + .05)) { ny = floor; player.vy = 0; player.ground = true; }
    else player.ground = false;
  } else {
    const ceil = ceilingAbove(player.x, player.y, player.z);
    if (ny + P.height > ceil) { ny = ceil - P.height; player.vy = 0; }
    player.ground = false;
  }
  player.y = ny;

  // safety nets: never below the ground, never outside the map
  if (player.y < -2 || !Number.isFinite(player.y)) respawn();
  const [mx0, mx1] = MAP_CONFIG.size.x, [mz0, mz1] = MAP_CONFIG.size.z;
  player.x = Math.min(mx1 - P.radius, Math.max(mx0 + P.radius, player.x));
  player.z = Math.min(mz1 - P.radius, Math.max(mz0 + P.radius, player.z));
}

// =====================================================================================
// HUD: zone name, coordinates, minimap
// =====================================================================================
const $ = id => document.getElementById(id);
function zoneAt(x, y, z) {
  return MAP_CONFIG.zones.find(zn => x >= zn.x[0] && x <= zn.x[1] && z >= zn.z[0] && z <= zn.z[1] && (zn.yMin === undefined || y >= zn.yMin)) || null;
}

const mini = $('minimap'), mg = mini.getContext('2d');
const MS = 4;   // minimap pixels per meter (the canvas is 512 x 352 for 128 x 88 m)
mini.width = (MAP_CONFIG.size.x[1] - MAP_CONFIG.size.x[0]) * MS;
mini.height = (MAP_CONFIG.size.z[1] - MAP_CONFIG.size.z[0]) * MS;
const mx = x => (x - MAP_CONFIG.size.x[0]) * MS, mz = z => (z - MAP_CONFIG.size.z[0]) * MS;
const miniBase = document.createElement('canvas');
function drawMiniBase() {
  miniBase.width = mini.width; miniBase.height = mini.height;
  const g = miniBase.getContext('2d');
  g.fillStyle = '#2a2e2b'; g.fillRect(0, 0, mini.width, mini.height);
  for (const zn of [...MAP_CONFIG.zones].reverse()) {
    if (zn.yMin !== undefined) continue;
    g.fillStyle = zn.color; g.globalAlpha = .18;
    g.fillRect(mx(zn.x[0]), mz(zn.z[0]), (zn.x[1] - zn.x[0]) * MS, (zn.z[1] - zn.z[0]) * MS);
  }
  g.globalAlpha = 1;
  // solids sorted by height so tall walls draw on top; roofs are skipped so interiors stay readable
  const solids = COLLIDERS.filter(c => c.kind !== 'roof').sort((a, b) => a.max[1] - b.max[1]);
  for (const c of solids) {
    const h = c.max[1];
    g.fillStyle = c.kind === 'slab' ? 'rgba(200, 190, 160, .22)' : c.kind === 'stairs' ? '#77736a' : h > 3 ? '#c9cbc4' : h > 1.6 ? '#8d918a' : '#64685f';
    g.fillRect(mx(c.min[0]), mz(c.min[2]), Math.max(1, (c.max[0] - c.min[0]) * MS), Math.max(1, (c.max[2] - c.min[2]) * MS));
  }
  g.font = '900 40px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = '#f2c64a'; g.fillText('A', mx(0), mz(-31));
  g.fillStyle = '#f0913e'; g.fillText('B', mx(0), mz(29));
  g.font = '700 18px system-ui, sans-serif';
  g.fillStyle = '#7fb0ff'; g.fillText('BLUE', mx(-57), mz(-2));
  g.fillStyle = '#ff8a80'; g.fillText('RED', mx(57), mz(-2));
}
drawMiniBase();
function drawMini() {
  mg.drawImage(miniBase, 0, 0);
  const px = mx(player.x), pz = mz(player.z);
  // view cone
  const dir = Math.atan2(-Math.cos(player.yaw), -Math.sin(player.yaw));   // canvas angle of the forward vector
  mg.fillStyle = 'rgba(255, 255, 255, .14)';
  mg.beginPath(); mg.moveTo(px, pz); mg.arc(px, pz, 70, dir - .6, dir + .6); mg.closePath(); mg.fill();
  mg.save(); mg.translate(px, pz); mg.rotate(dir + Math.PI / 2);
  mg.fillStyle = team === 'blue' ? '#5b95f0' : '#ef5a4f'; mg.strokeStyle = '#fff'; mg.lineWidth = 2;
  mg.beginPath(); mg.moveTo(0, -11); mg.lineTo(8, 9); mg.lineTo(0, 5); mg.lineTo(-8, 9); mg.closePath(); mg.fill(); mg.stroke();
  mg.restore();
}

let lastZone = '';
function updateHud() {
  const zn = zoneAt(player.x, player.y, player.z);
  const name = zn ? zn.name : 'Depot';
  if (name !== lastZone) {
    lastZone = name;
    $('zoneName').textContent = name;
    $('zoneSub').textContent = zn ? zn.ko : '물류기지';
    $('zone').style.setProperty('--zone', zn ? zn.color : '#f0b03a');
  }
  $('coords').textContent = `x ${player.x.toFixed(1)}  z ${player.z.toFixed(1)}  y ${player.y.toFixed(2)}`;
  drawMini();
}

// =====================================================================================
// input, pointer lock, overlay
// =====================================================================================
const overlay = $('overlay');
addEventListener('keydown', e => {
  if (e.code === 'Space') e.preventDefault();
  keys[e.code] = true;
  if (!locked) return;
  if (e.code === 'KeyR') respawn();
  if (e.code === 'KeyM') mini.classList.toggle('big');
});
addEventListener('keyup', e => { keys[e.code] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
addEventListener('mousemove', e => {
  if (!locked) return;
  player.yaw -= e.movementX * .0022;
  player.pitch = Math.max(-1.5, Math.min(1.5, player.pitch - e.movementY * .0022));
});
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === canvas;
  overlay.hidden = locked;
  if (!locked) for (const k in keys) keys[k] = false;
});
document.addEventListener('pointerlockerror', () => { $('status').textContent = '마우스를 고정하지 못했어요. 화면을 한 번 더 클릭해 주세요.'; });
function lock() { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => {}); }
$('startBtn').addEventListener('click', lock);
canvas.addEventListener('click', () => { if (!locked) lock(); });
overlay.querySelector('.team').addEventListener('click', e => {
  const b = e.target.closest('[data-team]'); if (!b) return;
  team = b.dataset.team;
  overlay.querySelectorAll('[data-team]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  respawn();
});
addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

// =====================================================================================
// main loop
// =====================================================================================
respawn();
let last = performance.now(), bob = 0;
function frame(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (locked) updatePlayer(dt);
  const moving = player.ground && Math.hypot(player.vx, player.vz) > .5;
  bob += moving ? dt * Math.hypot(player.vx, player.vz) * 1.6 : 0;
  camera.position.set(player.x, player.y + P.eye + (moving ? Math.sin(bob) * .035 : 0), player.z);
  camera.rotation.set(player.pitch, player.yaw, 0);
  updateHud();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

window.__mapReady = true;
$('status').textContent = '화면을 클릭하면 마우스가 고정되고 맵을 돌아다닐 수 있어요.';
$('startBtn').disabled = false;
// handy for level editing from the browser console
Object.assign(window, { MAP_CONFIG, player, respawn, COLLIDERS, keys, updatePlayer, zoneAt });
