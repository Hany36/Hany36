# 외부 에셋 출처와 이용 조건 (Jammini_FPS_1.0)

확인일: 2026-10-09 (SWAT 동작 추가분은 2026-10-12, 무기 7종은 2026-10-11, 레드닷 조준기는 2026-10-12). 예전에 미리보기용으로 넣었던 three.js Soldier.glb와 MRTK Gun.glb는 2026-10-11에 저장소에서 지웠어요. 저장소의 코드 라이선스를 모델에 자동으로 적용하지 않았어요. 모델마다 따로 찾은 근거만 적었어요.

## 0. 캐릭터: `assets/models/swat.glb` (현재 게임에 적용함)

| 항목 | 내용 |
|---|---|
| 원본 | Adobe Mixamo(https://www.mixamo.com)의 캐릭터 **SWAT**과 애니메이션 **Rifle Idle**, **Walk With Rifle**, **Rifle Run**, **Firing Rifle**, **Crouch Idle**, **Crouch Walking**, **Walk Crouching Backward**, **Running Slide**, **Death From Front Headshot**, **Crouch To Stand**(받았지만 2.9초로 길어 게임에는 쓰지 않음), 그리고 2차로 **Sprint Forward**, **Rifle Jump**, **Jump Up**, **Jump Down**, **Prone Idle**, **Prone Firing Rifle**(2개), **Rifle Kneel To Prone**, **Rifle Prone To Kneel**(같은 동작이 2개 올라와 하나만 남김), **Rifle Stand To Kneel**, **Fall Over**. 저장소 주인이 Adobe 계정으로 직접 받아 2026-10-10~12에 올림 |
| 원본 파일 | `assets/models/source/swat.fbx`(5,674,928 바이트, With Skin, T-pose), `rifle-idle.fbx`, `walk-with-rifle.fbx`, `rifle-run.fbx`, `firing-rifle.fbx`, `crouch-idle.fbx`, `crouch-walking.fbx`, `crouch-walk-backward.fbx`, `running-slide.fbx`, `death-headshot.fbx`, `crouch-to-stand.fbx`, `sprint-forward.fbx`, `rifle-jump.fbx`, `jump-up.fbx`, `jump-down.fbx`, `prone-idle.fbx`, `prone-firing-rifle.fbx`, `prone-firing-rifle-2.fbx`, `rifle-kneel-to-prone.fbx`, `rifle-prone-to-kneel.fbx`, `rifle-stand-to-kneel.fbx`, `fall-over.fbx`(Without Skin, 올린 파일 이름의 띄어쓰기만 바꿈). 모두 FBX 바이너리 7.7 |
| 내용 | 스킨 메시 2개(머리, 몸), 약 1.9만 삼각형, 텍스처(색상 1024², 노멀·스페큘러 512²), Mixamo 뼈대 |
| 변환 | three.js r128의 FBXLoader로 읽어 GLTFExporter로 `swat.glb` 하나로 합침. 이동 동작은 나아가는 이동(루트 모션)을 지워 제자리 동작으로 바꿈(쓰러지기·엎드리기·일어나기 같은 자세 바꾸기 동작은 원래 움직임을 살림). 점프(Rifle Jump)는 몸이 위로 뜨는 높이도 지워서 다리만 접히게 함(높이는 게임이 올림). 클립은 21개(Idle, Walk, Run, Sprint, Fire, CrouchIdle, CrouchWalk, CrouchBack, Slide, Jump, JumpUp, JumpDown, ProneIdle, ProneFire, ProneFireShort, KneelToProne, ProneToKneel, StandToKneel, CrouchToStand, Death, FallOver). 재질 두 개를 함께 쓰는 머리 메시는 재질별로 나눔(합친 채로 내보내면 헬멧과 얼굴 재질이 뒤바뀜). |
| 1인칭 손 | 같은 모델을 한 번 더 불러와 팔에 붙은 삼각형만 남기고(몸통·머리·다리는 게임 안에서 잘라냄) Fire 동작의 손가락 모양으로 1인칭 무기를 쥐게 함. 모델 파일을 따로 만들거나 고치지 않음 |
| 팀 색 | 블루팀은 원래 색. 레드팀은 게임이 시작할 때 제복 텍스처의 파란 천 부분만 사막 황갈색으로 바꿔 씀(`index.html`의 `CHARACTER.teamColor`) |
| 이용 조건 | Adobe Mixamo 이용 조건. 이 작업 환경에서는 mixamo.com·adobe.com에 접속할 수 없어서 약관 원문을 직접 확인하지 못했어요. 일반적으로 알려진 Mixamo 조건은 "개인·상업·비영리 프로젝트에 로열티 없이 사용 가능, 캐릭터·애니메이션 파일 자체를 단독으로 재배포하는 것은 금지"예요. 이 저장소는 공개 저장소라 원본 FBX와 변환한 GLB를 누구나 받을 수 있다는 점을 알고 쓰세요. 원문: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html |

## 1. 무기 7종: `assets/models/weapons.glb` (게임에 적용함)

원본은 저장소 주인이 Sketchfab에서 직접 받아 2026-10-11에 `assets/models/source/`에 올린 GLB 7개예요(받을 때 고른 형식: GLB, 텍스처 1k, MP5만 512). 올린 파일 이름은 무기별로 바꿨어요.

**라이선스 근거**
- 7개 파일 모두 안에 Sketchfab이 써 넣은 정보(`asset.extras`: 제목·제작자·라이선스·원본 주소)가 있어요. 7개 모두 `CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)`이고, 원본 주소가 저장소 주인이 준 모델 페이지 주소와 같아요.
- 칼은 저장소 주인이 보낸 다운로드 창 스크린샷으로도 확인했어요: "CC Attribution — Author must be credited. Commercial use is allowed.", "BUCK 120 General Knife by Kirilllucas is licensed under Creative Commons Attribution", 페이지의 License 줄 "CC Attribution", "This model is free".
- 이 작업 환경에서는 sketchfab.com에 접속할 수 없어서(네트워크 정책) 나머지 6개의 모델 페이지는 직접 열어 보지 못했어요. 위 파일 속 정보가 확인한 근거예요.
- CC BY 4.0 조건: 제작자·제목·원본 주소·라이선스를 밝히고, 바꾼 내용을 알려야 해요. 아래 표와 '바꾼 내용'이 그 표시예요(게임 메뉴의 '에셋 출처' 링크가 이 문서로 연결돼요).

| 게임 무기 | 모델 (원본 파일) | 제작자 | 모델 페이지 | 라이선스 |
|---|---|---|---|---|
| 소총 | M4 (`source/gun-rifle.glb`) | BR1 (https://sketchfab.com/BR1_art) | https://sketchfab.com/3d-models/m4-3f349dce93814bbaaed815f34ede203c | CC BY 4.0 |
| 권총 | Pistol (`source/gun-pistol.glb`) | h1ggs (https://sketchfab.com/h1ggs) | https://sketchfab.com/3d-models/pistol-393c280875c84172a191a66adc52c60c | CC BY 4.0 |
| 저격총 | Sniper rifle GameReady Free (`source/gun-sniper.glb`) | pashtetuser (https://sketchfab.com/pashtetuser) | https://sketchfab.com/3d-models/sniper-rifle-gameready-free-e520b234140049e7890db0b6c29d3925 | CC BY 4.0 |
| 산탄총 | Shotgun (`source/gun-shotgun.glb`) | DJMaesen (https://sketchfab.com/bumstrum) | https://sketchfab.com/3d-models/shotgun-2f5b48d9904145a39c1c2fcc6e5579b7 | CC BY 4.0 |
| 기관단총 | MP5 - COD:MW2019 (PBR) (`source/gun-smg-mw.glb`, 받은 이름 `mp5_-_codmw2019_pbr.glb`) | Wicked_Vixx (https://sketchfab.com/tylukex) | https://sketchfab.com/3d-models/mp5-codmw2019-pbr-8d32423f6a0f4d1d99ecb0744f40e22f | 파일에는 CC BY 4.0이라고 적혀 있지만 **불확실** (아래 주의) |
| 리볼버 | Revolver Low-poly (`source/gun-revolver.glb`) | Georg_Evd (https://sketchfab.com/Georg_Evd) | https://sketchfab.com/3d-models/revolver-low-poly-1b204e03f23e45508e6669d7c128f382 | CC BY 4.0 |
| 칼 | BUCK 120 General Knife (`source/knife.glb`) | Kirilllucas (https://sketchfab.com/Kirill_Rostovtsev) | https://sketchfab.com/3d-models/buck-120-general-knife-e854d824feb14900b6963729ae122f55 | CC BY 4.0 |

**파일 검사 결과** (원본 GLB를 그대로 열어 셈. 삼각형 기준 2만 개 이하만 적용)

| 무기 | 크기·형식 | 메시 / 재질 / 텍스처 | 삼각형 (부품 이름 기준 분류) | bounding box (파일 단위) | 실제 크기 |
|---|---|---|---|---|---|
| 소총 M4 | 5,576,852 B, glTF 2.0 (Sketchfab-16.59.0) | 13 / 13 / 1024² 39장 | 15,328: 본체 14,892, 탄창(caricatore) 436. 부착물·손 없음 | 0.206 × 0.061 × 0.016 | 미확인 |
| 권총 | 1,923,404 B, glTF 2.0 | 2 / 2 / 1024² 3장 | 14,350: 본체(glock) 13,410, 가늠자 발광 부분(sight_glow) 940. 탄창 따로 없음, 손 없음 | 0.036 × 0.143 × 0.207 | 미확인 |
| 저격총 | 3,435,716 B, glTF 2.0 | 42 / 1 / 1024² 3장 | 15,257: 본체 12,591(손잡이 318 포함), 조준경으로 보이는 부품(Aim·eccentric 이름) 1,822, 레일 724, 탄창 120. 손 없음 | 2.516 × 7.902 × 32.469 | 미확인 |
| 산탄총 | 4,520,728 B, glTF 2.0 | 5 / 1 / 1024² 3장 | 16,260: 본체 13,784, 펌프 1,766, 탄(slug) 526, 장전부(loader) 110, 방아쇠 74. 손 없음 | 10.091 × 34.679 × 138.078 | 미확인 |
| 기관단총 MP5 (MW2019) | 11,434,092 B, glTF 2.0 (Sketchfab-16.64.0), 확장 `KHR_materials_specular`(필수 아님, 게임에선 무시) | 5 / 5 / PNG 11장(1024², 색·노멀) | **34,193** (기준 2만 개 초과, 저장소 주인이 확인 후 적용 결정): 위 몸통 12,283, 아래 몸통 11,604, 조준기 부분 5,154, 표면 부품 3,336, 탄창 1,816 | 0.050 × 0.232 × 0.578 | 미확인 |
| 리볼버 | 3,764,900 B, glTF 2.0 | 1 / 1 / 1024² 3장 | 13,288 (부품 하나, 이름으로 구분 불가) | 0.564 × 1.958 × 3.994 | 미확인 |
| 칼 | 3,865,956 B, glTF 2.0 | 7 / 2 / 1024² 6장 | 3,100: 칼 1,328(날 366·코등이 158·손잡이 804), 칼집 1,772. 모델 페이지 설명(칼 1328, 칼집 1772)과 같음 | 0.374 × 0.123 × 0.028 (칼집 포함) | 미확인 |

- **기관단총(MP5 MW2019) 주의:** 제목이 상용 게임 *Call of Duty: Modern Warfare (2019)*의 무기이고, 파일 속 부품 이름(`w_smg_mp5`, `mp5.smd`, `ValveBiped.weapon_bone`)이 게임에서 추출해 다른 게임(Garry's Mod 등)용으로 옮긴 모델의 형식이에요. 원래 저작권은 게임 회사에 있을 가능성이 커서, 업로더가 붙인 CC BY 4.0이 유효하다고 보기 어려워요. 이 점과 공개 저장소·게임 사이트로 배포되는 위험(저작권 신고 시 사이트가 내려갈 수 있음)을 저장소 주인에게 알렸고, 저장소 주인이 2026-10-12에 알고 쓰기로 결정했어요. 함께 받은 더 큰 텍스처 버전(`mp5_-_codmw2019_pbr_1.glb`)은 넣지 않았어요. 이전 MP5(Long Nguyễn의 Mp5)는 이걸로 바꾸면서 지웠어요.
- 7개 모두 HTML이 아닌 정상 glTF 바이너리(헤더 `glTF`, 선언 길이 = 파일 길이), 필수 확장 없음, 애니메이션 없음, 손 모델 없음.
- 파일마다 단위가 제각각이고(예: 소총은 0.2, 산탄총은 138) 실제 치수를 알려 주는 근거가 없어서 실제 크기는 "미확인"으로 남겼어요.

**바꾼 내용** (`weapons.glb`를 만들 때. 원본 파일은 그대로 둠)
- 총구가 앞(-z), 위가 +y가 되게 돌리고 가운데로 옮김.
- MP5(MW2019): 뼈대(스킨)는 쓰지 않고 기본 자세 그대로 굳힘. 원래 재질이 거울처럼 매끈한 플라스틱(금속성 0, 거칠기 0.016)이라 금속성 0.35, 거칠기 0.5로 바꿈. 색 텍스처는 1024 유지.
- 크기: 실제 크기를 알 수 없어서 게임의 예전 블록 무기 길이에 맞춤(소총 1.08, 권총 0.21, 저격총 1.18, 산탄총 1.01, 기관단총 0.67, 리볼버 0.30, 칼 0.34. 3인칭에서는 0.8배).
- 같은 재질을 쓰는 부품은 하나로 합침(저격총 42개 → 1개 등, 그리기 횟수 줄이기).
- 텍스처를 줄임: 색 1024, 나머지(노멀·거칠기·금속·AO·발광) 512, 재질이 많은 소총은 모두 512. JPEG로 다시 저장. 7개 합계 23.6MB → 7.2MB.
- 칼: 칼집(LP_Leather_Tris 부품)을 뺌.
- 게임 안에서: 소총·기관단총·산탄총 위에 레드닷 조준기(아래 2번)를 얹음(M4 모델에는 조준기가 없음). 리볼버는 모델 파일은 그대로 두고, 정조준할 때 가늠쇠 끝에 작은 빨간 점(코드로 그린 점)을 켜고, 총을 살짝 기울여 뒤쪽 윗면과 가늠쇠 끝을 조준선에 맞춤. 손 위치·조준선·총구 위치는 각 모델 위에서 직접 재서 `index.html`의 `GUN_MODELS`에 적음.

## 2. 레드닷 조준기 2종 (`weapons.glb` 안의 `sightCTS`·`sightReflex`, 게임에 적용함)

저장소 주인이 Sketchfab에서 받아 2026-10-12 채팅으로 보낸 GLB예요. 라이선스 근거는 각 파일 안의 Sketchfab 정보(`asset.extras`)예요. 이 작업 환경에서는 sketchfab.com에 접속할 수 없어 모델 페이지는 직접 열어 보지 못했어요.

| 게임에서 | 모델 (원본 파일) | 제작자 | 모델 페이지 | 라이선스 |
|---|---|---|---|---|
| 소총(M4) 레일 위 | Crimson Trace CTS-1550 Red Dot Sight (`source/sight-cts.glb`, 받은 이름 `crimson_trace_cts-1550_red_dot_sight.glb`) | Orshia 3D (https://sketchfab.com/TalhaHelvaci) | https://sketchfab.com/3d-models/crimson-trace-cts-1550-red-dot-sight-a29f7326e13c454a9de1a027c74dd8ae | CC BY 4.0 |
| 기관단총(MP5) 레일 위, 산탄총 몸통 위 | FPS Red Dot Sight (Game Model) (`source/sight-reflex.glb`, 받은 이름 `fps_red_dot_sight_game_model.glb`) | Michael Makivic (https://sketchfab.com/makivic) | https://sketchfab.com/3d-models/fps-red-dot-sight-game-model-0cf999d9363940c2b149dcd80c448554 | CC BY 4.0 |

**파일 검사 결과**

| 모델 | 크기·형식 | 메시 / 재질 / 텍스처 | 삼각형 | bounding box (파일 단위) | 실제 크기 |
|---|---|---|---|---|---|
| CTS-1550 | 6,740,592 B, glTF 2.0 (Sketchfab-14.1.2) | 4 / 4 (유리·빨간 점은 반투명) / PNG 13장(1024²·512²) | 6,416: 조준기 몸체 2,936, 레일 마운트 2,828, 유리 644, 빨간 점 8 | 0.026 × 0.032 × 0.051 | 미확인 (파일 값이 실제 제품 길이와 비슷해 보이지만 근거 문서 없음) |
| FPS Red Dot Sight | 2,377,924 B, glTF 2.0 (Sketchfab-12.67.0) | 2 / 2 (유리 반투명) / PNG 3장(1024²) | 2,195: 몸체·레일 클램프 2,107, 유리 88 | 69.66 × 94.24 × 158.18 | 미확인 |

- 둘 다 정상 glTF 바이너리, 필수 확장 없음, 애니메이션 없음.
- 함께 받은 (PBR) Mini Red Dot(Eric Wallbank, CC BY 4.0)은 몸체까지 전부 반투명 재질 하나로 되어 있어 게임에서 비쳐 보일 수 있어서 쓰지 않았고 저장소에도 넣지 않았어요.

**바꾼 내용**
- 유리(가장 높은 쪽)가 앞(-z)을 보게 돌리고 바닥을 y = 0, 가운데 맞춤. 길이 CTS 0.065, FPS Red Dot 0.095(게임 단위). 텍스처 축소(색 1024, 나머지 512, 유리는 투명도를 살려 PNG).
- CTS의 빨간 점 부품(Reddot_M, 삼각형 8개)은 뺌. 정조준할 때 렌즈 가운데 보이는 빨간 점은 게임이 그리는 빛 효과 하나만 씀(두 개가 겹쳐 보이지 않게).
- 게임 안에서: CTS는 M4 위쪽 레일에 마운트 바닥을 붙이고, FPS Red Dot은 MP5 위쪽 레일과 산탄총 몸통 뒷부분 윗면(뒤쪽 가늠자 뒤, 눈에 가깝게)에 클램프를 붙임. 유리는 뒤가 잘 보이도록 더 투명하게(불투명도 0.45배).
- 이전에 쓰던 Reflex Sight | LowPoly(VyrianStudios)는 2026-10-12에 이 두 조준기로 바꾸면서 저장소에서 지웠어요.

## 3. 효과음 14개: `assets/sounds/source/` (게임에 적용함, 일부는 저장소 주인이 고른 뒤 적용)

- 출처: 저장소 주인이 AI로 만들어서 2026-10-13에 올린 파일이에요. 만든 도구와 이용 조건: **미확인**.
- 파일은 모두 mp3, 48 kHz 스테레오예요. 파일 안에 내용을 알려 주는 정보(태그)는 없어서, 파일 이름과 소리 분석(길이·파형·주파수)으로만 구분했어요. Claude는 소리를 직접 들을 수 없어요.
- 원본 파일은 고치지 않았어요. 게임은 파일의 일부 구간만 재생하고(앞뒤 클릭 잡음과 소리가 끝난 뒤의 바닥 잡음을 뺌), 짧은 페이드와 소리별 크기 보정을 재생할 때 적용해요(`fps/audio.js`의 `AUDIO_CONFIG`).

| 파일 | 연결한 효과음 | 길이 | 재생 구간 | 확인 필요 |
|---|---|---|---|---|
| `A_realistic_sound_ef_#2-1791854401666.mp3` | (사용 안 함) bullet_whiz (총탄 스침) | 0.60초 | – | 2026-10-13 저장소 주인 요청으로 총탄 스침 소리를 뺌. 파일은 원본 보존 |
| `One_fast_knife_swing_#2-1791853040873.mp3` | knife_swing (칼, 트랙 A·B를 번갈아) | 3.00초 | A 0.10–0.45초, B 1.68–1.98초 | 파일 하나에 휘두르기가 두 번 들어 있음 |
| `One_hand_grenade_exp_#4-1791853120591.mp3` | grenade_explosion (수류탄) | 2.00초 | 0–1.75초 | |
| `One_isolated_assault_#4-1791852873626.mp3` | rifle_shot (소총) | 1.00초 | 0–0.60초 | 0.15초 지점의 두 번째 충격음은 한 발의 일부(저장소 주인이 들어 보고 확인) |
| `One_isolated_pistol__#1-1791852982564.mp3` | pistol_shot (권총) | 2.00초 | 0–1.00초 | |
| `One_isolated_powerfu_#1-1791853007928.mp3` | sniper_shot (저격총, 저장소 주인이 들어 보고 확인) | 1.00초 | 0–0.80초 | |
| `One_isolated_powerfu_#2-1791853350227.mp3` | revolver_shot (리볼버, 저장소 주인이 들어 보고 확인) | 2.00초 | 0–1.10초 | |
| `One_isolated_shotgun_#3-1791852958577.mp3` | shotgun_shot (산탄총) | 2.00초 | 0–0.85초 | |
| `One_isolated_submach_#4-1791853321652.mp3` | smg_shot (기관단총) | 2.00초 | 0–0.90초 | |
| `One_light_punch_agai_#2-1791854246884.mp3` | (사용 안 함) hitmarker | 0.60초 | – | 잘 안 들려서 저장소 주인 결정으로 히트마커는 화면 표시만 씀. 파일은 원본 보존 |
| `One_short_bullet-hit_#3-1791853437882.mp3` | character_hit (피격음) | 1.00초 | 0–0.45초, 45 Hz 아래 걸러냄 | 에너지의 77%가 40 Hz 아래 초저음 |
| `One_single_footstep__#3-1791854574133.mp3` | step_sand (모래, 저장소 주인이 들어 보고 확인) | 0.60초 | 0–0.50초 | |
| `One_single_footstep__#3-1791854605619.mp3` | step_container (컨테이너, 저장소 주인이 들어 보고 확인) | 0.60초 | 0–0.50초 | 아주 작게 녹음됨, 끝에서 소리가 잘림 |
| `One_single_loud,_fir_#3-1791854657905.mp3` | (사용 안 함) 콘크리트 발소리로 만든 파일 | 0.60초 | – | 소리의 95%가 45 Hz 아래라 귀에 작게 들려서, 저장소 주인 결정으로 콘크리트는 게임의 예전 합성 발소리를 씀. 파일은 원본 보존 |

- 처음에 구분하지 못한 저격총/리볼버와 발소리 3개는 저장소 주인이 효과음 테스트 화면에서 듣고 알려 준 대로 연결했어요(2026-10-13, 볼륨 확정 뒤 테스트 화면은 지움).

## 4. 함께 넣은 코드

| 파일 | 출처 | 라이선스 |
|---|---|---|
| `lib/GLTFLoader.js`, `lib/SkeletonUtils.js` | npm `three@0.128.0` 패키지의 `examples/js/` (게임이 쓰는 three.js r128과 같은 버전) | MIT, Copyright © 2010-2021 three.js authors |
