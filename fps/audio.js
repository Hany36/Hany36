// Jammini_FPS sound effects from recorded files (fps/assets/sounds/source/, kept untouched).
// Each file is played through a "clip": the part of the file to use (the AI-made files carry clicks at their ends and
// noise after the sound dies away), short fades, an optional high-pass for inaudible rumble, and a loudness-matching
// gain (norm, dB) worked out from the file's analysis (K-weighted momentary loudness of the clip, true peak kept under -1 dBFS).
// Sounds without a file (or whose file fails to load) are left to the game's old synthesized sounds.
// The test page (sound-test.html) changes the volumes and file choices; they are saved in this browser and used by the game.
(function () {
  const AUDIO_CONFIG = {
    masterVolume: 1,
    gunshotsVolume: 1,
    footstepsVolume: 1,
    combatEffectsVolume: 1,
    dir: 'assets/sounds/source/',
    // clip: [start, end] seconds in the file, fade in/out ms, hp: high-pass Hz (0 = none), norm: gain in dB from the analysis
    clips: {
      knifeA:  { file: 'One_fast_knife_swing_#2-1791853040873.mp3', clip: [.10, .45], fadeIn: 5, fadeOut: 60, hp: 0, norm: -10.2, note: '파일 안의 첫 번째 휘두르기' },
      knifeB:  { file: 'One_fast_knife_swing_#2-1791853040873.mp3', clip: [1.68, 1.98], fadeIn: 5, fadeOut: 60, hp: 0, norm: -10.6, note: '파일 안의 두 번째 휘두르기' },
      grenade: { file: 'One_hand_grenade_exp_#4-1791853120591.mp3', clip: [0, 1.75], fadeIn: 0, fadeOut: 300, hp: 0, norm: -3.7 },
      rifle:   { file: 'One_isolated_assault_#4-1791852873626.mp3', clip: [0, .60], fadeIn: 0, fadeOut: 100, hp: 0, norm: -12.0 },
      pistol:  { file: 'One_isolated_pistol__#1-1791852982564.mp3', clip: [0, 1.00], fadeIn: 0, fadeOut: 150, hp: 0, norm: -8.0 },
      pw1:     { file: 'One_isolated_powerfu_#1-1791853007928.mp3', clip: [0, .80], fadeIn: 0, fadeOut: 100, hp: 0, norm: -12.4, note: '저격총 (저장소 주인이 들어 보고 확인)' },
      pw2:     { file: 'One_isolated_powerfu_#2-1791853350227.mp3', clip: [0, 1.10], fadeIn: 0, fadeOut: 200, hp: 0, norm: -14.5, note: '리볼버 (저장소 주인이 들어 보고 확인)' },
      shotgun: { file: 'One_isolated_shotgun_#3-1791852958577.mp3', clip: [0, .85], fadeIn: 0, fadeOut: 150, hp: 0, norm: -12.8 },
      smg:     { file: 'One_isolated_submach_#4-1791853321652.mp3', clip: [0, .90], fadeIn: 0, fadeOut: 200, hp: 0, norm: -9.0 },
      hit:     { file: 'One_short_bullet-hit_#3-1791853437882.mp3', clip: [0, .45], fadeIn: 0, fadeOut: 80, hp: 45, norm: 7.8, note: '에너지의 77%가 40Hz 아래 초저음이라 45Hz 아래를 걸러냄' },
      stepA:   { file: 'One_single_footstep__#3-1791854574133.mp3', clip: [0, .50], fadeIn: 0, fadeOut: 80, hp: 0, norm: -4.8, note: '모래 (저장소 주인이 들어 보고 확인)' },
      stepB:   { file: 'One_single_footstep__#3-1791854605619.mp3', clip: [0, .50], fadeIn: 0, fadeOut: 80, hp: 0, norm: 8.1, note: '컨테이너 (저장소 주인이 들어 보고 확인). 아주 작게 녹음됨(최고 -21dBFS), 파일 끝에서 소리가 잘려 있음' },
      stepC:   { file: 'One_single_loud,_fir_#3-1791854657905.mp3', clip: [0, .45], fadeIn: 0, fadeOut: 60, hp: 45, norm: 6.0, note: '콘크리트 (저장소 주인이 들어 보고 확인). 소리의 95%가 45Hz 아래, 80Hz 위는 거의 없어서 귀에는 작게 들림 → 새 파일 필요' },
    },
    // use: the clips the sound plays (several: they take turns); candidates: files not yet told apart, picked on the test page
    sounds: {
      rifle_shot:        { cat: 'gunshots', use: ['rifle'], gain: 1, check: '0.15초 지점에 첫 소리와 거의 같은 크기의 충격음이 한 번 더 있어요. 두 발이 들어 있는지 들어 보고 확인해 주세요.' },
      smg_shot:          { cat: 'gunshots', use: ['smg'], gain: 1 },
      shotgun_shot:      { cat: 'gunshots', use: ['shotgun'], gain: 1.1 },   // 110%, 80%: the owner's ears (2026-10-13)
      pistol_shot:       { cat: 'gunshots', use: ['pistol'], gain: .8 },
      sniper_shot:       { cat: 'gunshots', use: ['pw1'], candidates: ['pw1', 'pw2'], gain: 1 },
      revolver_shot:     { cat: 'gunshots', use: ['pw2'], candidates: ['pw1', 'pw2'], gain: 1 },
      knife_swing:       { cat: 'combat', use: ['knifeA', 'knifeB'], gain: 1, check: '파일 하나에 휘두르기가 두 번 들어 있어서 두 트랙(A, B)으로 잘라 번갈아 써요.' },
      grenade_explosion: { cat: 'combat', use: ['grenade'], gain: 1 },
      character_hit:     { cat: 'combat', use: ['hit'], gain: 1 },
      step_sand:         { cat: 'footsteps', use: ['stepA'], candidates: ['stepA', 'stepB', 'stepC'], gain: 1 },
      // the file is almost all deep rumble: as loud as the peak allows (about -1.4 dBFS); a new recording is wanted
      step_concrete:     { cat: 'footsteps', use: ['stepC'], candidates: ['stepA', 'stepB', 'stepC'], gain: 1.25, check: '이 파일은 소리 대부분이 아주 낮은 저음이라 귀에는 작게 들려요. 새 콘크리트 발소리 파일을 기다리는 중이에요.' },
      step_container:    { cat: 'footsteps', use: ['stepB'], candidates: ['stepA', 'stepB', 'stepC'], gain: 1 },
    },
  };
  const CAT_KEY = { gunshots: 'gunshotsVolume', footsteps: 'footstepsVolume', combat: 'combatEffectsVolume' };
  const STORE = 'jammini-audio-v2';
  const DEFAULTS = JSON.parse(JSON.stringify(AUDIO_CONFIG));

  // saved changes from the test page: volumes, per-sound gain and file choice
  function loadOverrides() {
    try {
      const o = JSON.parse(localStorage.getItem(STORE) || 'null'); if (!o) return;
      for (const k of ['masterVolume', ...Object.values(CAT_KEY)]) if (Number.isFinite(o[k])) AUDIO_CONFIG[k] = o[k];
      for (const k in o.sounds || {}) {
        const s = AUDIO_CONFIG.sounds[k], v = o.sounds[k]; if (!s || !v) continue;
        if (Number.isFinite(v.gain)) s.gain = v.gain;
        if (Array.isArray(v.use) && v.use.every(c => AUDIO_CONFIG.clips[c])) s.use = v.use.slice();
      }
    } catch (e) { /* storage unavailable: defaults */ }
  }
  function saveOverrides() {
    const o = { sounds: {} }, D = DEFAULTS;
    for (const k of ['masterVolume', ...Object.values(CAT_KEY)]) if (AUDIO_CONFIG[k] !== D[k]) o[k] = AUDIO_CONFIG[k];
    for (const k in AUDIO_CONFIG.sounds) {
      const s = AUDIO_CONFIG.sounds[k], d = D.sounds[k], v = {};
      if (s.gain !== d.gain) v.gain = s.gain;
      if (s.use.join() !== d.use.join()) v.use = s.use.slice();
      if (Object.keys(v).length) o.sounds[k] = v;
    }
    try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) { /* not saved */ }
    return o;
  }
  loadOverrides();

  let ctx = null, out = null, bus = null, limiter = null;
  const cats = {}, raw = {}, buffers = {}, missing = [], turn = {}, groups = {};
  const dB = d => Math.pow(10, d / 20);
  // fetch every file once (the bytes wait until the first click makes the audio context, then they are decoded)
  const files = [...new Set(Object.values(AUDIO_CONFIG.clips).map(c => c.file))];
  const fetched = Promise.all(files.map(f => fetch(AUDIO_CONFIG.dir + encodeURIComponent(f))
    .then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
    .then(b => { raw[f] = b; })
    .catch(e => { missing.push(f); console.warn('효과음 파일을 불러오지 못했어요:', f, e.message || e); })));

  function buildBus() {
    bus = ctx.createGain(); bus.gain.value = AUDIO_CONFIG.masterVolume;
    // safety clip for stacked sounds (bursts, an explosion over gunfire): untouched up to -1 dBFS, then rounded off below 0 dBFS.
    // Single sounds peak at -3 dBFS or lower, so it only acts on pile-ups (a compressor here squashed the grenade's long rumble)
    const pre = ctx.createGain(); pre.gain.value = .5;   // the curve spans -2..2 (6 dB over full scale)
    limiter = ctx.createWaveShaper(); limiter.oversample = '4x';
    const n = 4097, curve = new Float32Array(n), k = .891, r = 1 - k;
    for (let i = 0; i < n; i++) { const u = (i / (n - 1) * 2 - 1) * 2, a = Math.abs(u); curve[i] = Math.sign(u) * (a <= k ? a : k + r * Math.tanh((a - k) / r)); }
    limiter.curve = curve;
    bus.connect(pre); pre.connect(limiter); limiter.connect(out);
    for (const c in CAT_KEY) { cats[c] = ctx.createGain(); cats[c].gain.value = AUDIO_CONFIG[CAT_KEY[c]]; cats[c].connect(bus); }
  }
  // the game calls this after the first click with its audio context and its volume node
  function attach(audioCtx, dest) {
    if (ctx === audioCtx) return ready;
    ctx = audioCtx; out = dest; buildBus();
    ready = fetched.then(() => Promise.all(files.filter(f => raw[f]).map(f => ctx.decodeAudioData(raw[f].slice(0))
      .then(b => { buffers[f] = b; })
      .catch(e => { missing.push(f); console.warn('효과음 파일을 열지 못했어요:', f, e.message || e); }))))
      .then(() => { if (missing.length && SND.onwarn) SND.onwarn(missing.slice()); return missing.slice(); });
    return ready;
  }
  let ready = null;
  const clipReady = c => { const cl = AUDIO_CONFIG.clips[c]; return !!(cl && buffers[cl.file]); };
  function has(key) { const s = AUDIO_CONFIG.sounds[key]; return !!(ctx && s && s.use.length && s.use.some(clipReady)); }

  // play a sound. opts: vol (extra factor), pos [x, y, z] for a sound in the world (3D, fades with distance: ref, rolloff, max),
  // group: a voice group (one shooter's gun) -- a new sound in the group ducks the tails of the earlier ones (duck, 0..1) and
  // at most maxVoices keep playing, so automatic fire doesn't pile up. Returns false when the sound has no file (use the old one).
  function play(key, opts = {}) {
    const s = AUDIO_CONFIG.sounds[key];
    if (!has(key)) return false;
    const list = s.use.filter(clipReady), ci = list[(turn[key] = ((turn[key] ?? -1) + 1) % list.length)];
    return start(AUDIO_CONFIG.clips[ci], s.cat, s.gain * (opts.vol ?? 1), opts);
  }
  // one clip by name (the test page compares the files that aren't assigned yet)
  function playClip(ci, cat, opts = {}) { return !!(ctx && clipReady(ci)) && start(AUDIO_CONFIG.clips[ci], cat, opts.vol ?? 1, opts); }
  function start(c, cat, gain, opts) {
    const t = ctx.currentTime + (opts.delay || 0), dur = c.clip[1] - c.clip[0];
    const g = dB(c.norm) * gain;
    if (g < 1e-4) return true;
    const src = ctx.createBufferSource(); src.buffer = buffers[c.file];
    let node = src;
    if (c.hp) { const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = c.hp; f.Q.value = -3.01; node.connect(f); node = f; }   // Q in dB here: -3.01 = a plain 2-pole (Butterworth) cut, as in the analysis
    const env = ctx.createGain(), fi = (c.fadeIn || 0) / 1000, fo = Math.min(dur * .8, (c.fadeOut || 0) / 1000);
    if (fi) { env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(g, t + fi); } else env.gain.setValueAtTime(g, t);
    if (fo) { env.gain.setValueAtTime(g, t + dur - fo); env.gain.linearRampToValueAtTime(0, t + dur); }
    node.connect(env); node = env;
    if (opts.pos) {
      const pn = ctx.createPanner(); pn.panningModel = 'HRTF'; pn.distanceModel = 'inverse';
      pn.refDistance = opts.ref ?? 3; pn.rolloffFactor = opts.rolloff ?? 1; pn.maxDistance = opts.max ?? 200;
      if (pn.positionX) { pn.positionX.value = opts.pos[0]; pn.positionY.value = opts.pos[1]; pn.positionZ.value = opts.pos[2]; } else pn.setPosition(...opts.pos);
      node.connect(pn); node = pn;
    }
    node.connect(cats[cat]);
    src.start(t, c.clip[0], dur + .01);
    if (opts.group) {
      const gl = groups[opts.group] = (groups[opts.group] || []).filter(v => v.end > ctx.currentTime);
      const duck = opts.duck ?? 1, maxV = opts.maxVoices ?? 4;
      gl.forEach((v, i) => {
        const keep = i >= gl.length - (maxV - 1) ? duck : 0;   // the oldest beyond the voice limit fade out completely
        if (keep >= 1) return;
        const p = v.env.gain, now = p.value, to = now * keep, rampEnd = Math.min(v.end, t + .035);
        p.cancelScheduledValues(t); p.setValueAtTime(now, t); p.linearRampToValueAtTime(to, rampEnd);
        if (to > 0 && v.end - v.fo > rampEnd) { p.setValueAtTime(to, v.end - v.fo); p.linearRampToValueAtTime(0, v.end); }   // keep its own fade at the end
        else if (to > 0) p.linearRampToValueAtTime(0, v.end);
      });
      gl.push({ env, end: t + dur, fo });
      if (gl.length > maxV) gl.splice(0, gl.length - maxV);
    }
    return true;
  }
  function setVolume(name, v) {
    AUDIO_CONFIG[name] = v;
    if (!ctx) return;
    if (name === 'masterVolume') bus.gain.value = v;
    for (const c in CAT_KEY) if (CAT_KEY[c] === name) cats[c].gain.value = v;
  }
  function reset() {
    try { localStorage.removeItem(STORE); } catch (e) { /* nothing saved */ }
    const d = JSON.parse(JSON.stringify(DEFAULTS));
    for (const k of ['masterVolume', ...Object.values(CAT_KEY)]) setVolume(k, d[k]);
    for (const k in d.sounds) Object.assign(AUDIO_CONFIG.sounds[k], { gain: d.sounds[k].gain, use: d.sounds[k].use });
  }
  const SND = { CONFIG: AUDIO_CONFIG, DEFAULTS, CAT_KEY, attach, has, play, playClip, setVolume, save: saveOverrides, reset, missing, files,
    get ready() { return ready; }, get ctx() { return ctx; }, onwarn: null };
  window.SND = SND;
})();
