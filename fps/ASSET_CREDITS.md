# 외부 에셋 출처와 이용 조건 (Jammini_FPS_1.0)

확인일: 2026-10-09 (SWAT 동작 추가분은 2026-10-12, 무기 7종은 2026-10-11). 저장소의 코드 라이선스를 모델에 자동으로 적용하지 않았어요. 모델마다 따로 찾은 근거만 적었어요.

## 0. 캐릭터: `assets/models/swat.glb` (현재 게임에 적용함)

| 항목 | 내용 |
|---|---|
| 원본 | Adobe Mixamo(https://www.mixamo.com)의 캐릭터 **SWAT**과 애니메이션 **Rifle Idle**, **Walk With Rifle**, **Rifle Run**, **Firing Rifle**, **Crouch Idle**, **Crouch Walking**, **Walk Crouching Backward**, **Running Slide**, **Death From Front Headshot**, **Crouch To Stand**(받았지만 2.9초로 길어 게임에는 쓰지 않음), 그리고 2차로 **Sprint Forward**, **Rifle Jump**, **Jump Up**, **Jump Down**, **Prone Idle**, **Prone Firing Rifle**(2개), **Rifle Kneel To Prone**, **Rifle Prone To Kneel**(같은 동작 2개), **Rifle Stand To Kneel**, **Fall Over**. 저장소 주인이 Adobe 계정으로 직접 받아 2026-10-10~12에 올림 |
| 원본 파일 | `assets/models/source/swat.fbx`(5,674,928 바이트, With Skin, T-pose), `rifle-idle.fbx`, `walk-with-rifle.fbx`, `rifle-run.fbx`, `firing-rifle.fbx`, `crouch-idle.fbx`, `crouch-walking.fbx`, `crouch-walk-backward.fbx`, `running-slide.fbx`, `death-headshot.fbx`, `crouch-to-stand.fbx`, `sprint-forward.fbx`, `rifle-jump.fbx`, `jump-up.fbx`, `jump-down.fbx`, `prone-idle.fbx`, `prone-firing-rifle.fbx`, `prone-firing-rifle-2.fbx`, `rifle-kneel-to-prone.fbx`, `rifle-prone-to-kneel.fbx`, `rifle-prone-to-kneel-2.fbx`, `rifle-stand-to-kneel.fbx`, `fall-over.fbx`(Without Skin, 올린 파일 이름의 띄어쓰기만 바꿈). 모두 FBX 바이너리 7.7 |
| 내용 | 스킨 메시 2개(머리, 몸), 약 1.9만 삼각형, 텍스처(색상 1024², 노멀·스페큘러 512²), Mixamo 뼈대 |
| 변환 | three.js r128의 FBXLoader로 읽어 GLTFExporter로 `swat.glb` 하나로 합침. 이동 동작은 나아가는 이동(루트 모션)을 지워 제자리 동작으로 바꿈(쓰러지기·엎드리기·일어나기 같은 자세 바꾸기 동작은 원래 움직임을 살림). 점프(Rifle Jump)는 몸이 위로 뜨는 높이도 지워서 다리만 접히게 함(높이는 게임이 올림). 클립은 21개(Idle, Walk, Run, Sprint, Fire, CrouchIdle, CrouchWalk, CrouchBack, Slide, Jump, JumpUp, JumpDown, ProneIdle, ProneFire, ProneFireShort, KneelToProne, ProneToKneel, StandToKneel, CrouchToStand, Death, FallOver). 재질 두 개를 함께 쓰는 머리 메시는 재질별로 나눔(합친 채로 내보내면 헬멧과 얼굴 재질이 뒤바뀜). |
| 1인칭 손 | 같은 모델을 한 번 더 불러와 팔에 붙은 삼각형만 남기고(몸통·머리·다리는 게임 안에서 잘라냄) Fire 동작의 손가락 모양으로 1인칭 무기를 쥐게 함. 모델 파일을 따로 만들거나 고치지 않음 |
| 팀 색 | 블루팀은 원래 색. 레드팀은 게임이 시작할 때 제복 텍스처의 파란 천 부분만 사막 황갈색으로 바꿔 씀(`index.html`의 `CHARACTER.teamColor`) |
| 이용 조건 | Adobe Mixamo 이용 조건(아래 1번과 같은 내용과 주의점). 원문: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html |

## 1. 캐릭터: `assets/models/soldier.glb` (예전 캐릭터, 지금은 게임에 쓰지 않고 미리보기에만 남김)

| 항목 | 내용 |
|---|---|
| 원본 | three.js 저장소 `examples/models/gltf/Soldier.glb` — https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/Soldier.glb |
| 받은 경로 | `https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb` (HTTP 200, 2,160,468 바이트) |
| 원본 일치 확인 | 저장소 커밋 `7d87e91`의 git blob `1788f122d03bec6c3c634e7625e6cdfa960eef49` = 받은 파일의 git hash (동일) |
| 파일 검사 | glTF 2.0 바이너리(헤더 `glTF`, 선언 길이 = 파일 길이). HTML·Git LFS 포인터·빈 파일 아님 |
| 내용 | 스킨 메시 2개(`vanguard_Mesh`, `vanguard_visor`), 약 11,400 삼각형, 재질 2개, 1024×1024 텍스처 2장(색상·노멀), 뼈대 Mixamo 49개 관절, 애니메이션 `Idle`·`Run`·`TPose`·`Walk` |
| 출처 표기 | three.js 예제 페이지(`webgl_animation_skinning_blending.html`, `webgl_animation_multiple.html`)에 "model from mixamo.com"이라고 적혀 있음. 저장소 안에 이 모델 전용 라이선스 파일은 없음 |
| 이용 조건 | **Adobe Mixamo 이용 조건을 따름** (three.js의 MIT 라이선스는 코드에 대한 것이고 이 모델에 그대로 적용된다고 보지 않음) |
| 확인 수준 | 이 작업 환경에서는 mixamo.com·adobe.com에 접속할 수 없어서 약관 원문을 직접 확인하지 못했어요. 일반적으로 알려진 Mixamo 조건은 "개인·상업·비영리 프로젝트에 로열티 없이 사용 가능, 캐릭터·애니메이션 파일 자체를 단독으로 재배포하는 것은 금지"예요. 이 저장소는 공개 저장소라 모델 파일을 누구나 받을 수 있다는 점(three.js 저장소도 같은 방식으로 공개 중)을 알고 쓰세요. 원문: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html |

## 2. 예전 총기 후보: `assets/models/gun.glb` (게임에는 적용 안 함, 미리보기만)

| 항목 | 내용 |
|---|---|
| 원본 | Microsoft MixedRealityToolkit 저장소 `SpatialInput/Samples/DemoRoom/Media/Models/Gun.glb` — https://github.com/Microsoft/MixedRealityToolkit/blob/master/SpatialInput/Samples/DemoRoom/Media/Models/Gun.glb |
| 받은 경로 | `https://raw.githubusercontent.com/Microsoft/MixedRealityToolkit/master/SpatialInput/Samples/DemoRoom/Media/Models/Gun.glb` (HTTP 200, 4,776,896 바이트) |
| 원본 일치 확인 | 저장소 커밋 `6573648`의 git blob `98738c0815ad37f63ae17b2bd0a5a46170f54994` = 받은 파일의 git hash (동일). LFS 추적 파일 아님 |
| 파일 검사 | glTF 2.0 바이너리(정상). 확장 `KHR_materials_pbrSpecularGlossiness`, `MSFT_lod` 사용(필수 아님) |
| 내용 | 메시 1개, 약 1,200 삼각형, 재질 1개, 1024×1024 텍스처 4장, 애니메이션 없음, 손·팔 없음 |
| 이용 조건 | 저장소 루트 `LICENSE.md`가 MIT 라이선스(Copyright (c) Microsoft Corporation). 모델 폴더와 DemoRoom README, 저장소의 다른 LICENSE/NOTICE 파일 어디에도 이 모델을 MIT에서 제외한다는 내용은 없었어요. 모델 전용 조건은 찾지 못했고, 저장소 전체에 붙은 MIT 라이선스가 이 파일에도 적용된다고 보는 것이 현재 찾은 유일한 근거예요(확인 수준: 중간). MIT 조건에 따라 쓸 때는 저작권 표시와 라이선스 문구를 함께 남겨야 해요 |
| 적용하지 않은 이유 | 외형이 주황·흰색의 SF 블래스터(레이저총)라서 "실제 총"이라는 목표와 맞지 않아요. 미리보기 화면(`model-preview.html?m=gun`)에서 확인할 수 있어요 |

## 3. 무기 7종: `assets/models/weapons.glb` (게임에 적용함)

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
| 기관단총 | Mp5 (`source/gun-smg.glb`) | Long Nguyễn (https://sketchfab.com/LongNguyen89) | https://sketchfab.com/3d-models/mp5-fa9b8914fda34acb9a54fa64e99d5608 | CC BY 4.0 |
| 리볼버 | Revolver Low-poly (`source/gun-revolver.glb`) | Georg_Evd (https://sketchfab.com/Georg_Evd) | https://sketchfab.com/3d-models/revolver-low-poly-1b204e03f23e45508e6669d7c128f382 | CC BY 4.0 |
| 칼 | BUCK 120 General Knife (`source/knife.glb`) | Kirilllucas (https://sketchfab.com/Kirill_Rostovtsev) | https://sketchfab.com/3d-models/buck-120-general-knife-e854d824feb14900b6963729ae122f55 | CC BY 4.0 |

**파일 검사 결과** (원본 GLB를 그대로 열어 셈. 삼각형 기준 2만 개 이하만 적용)

| 무기 | 크기·형식 | 메시 / 재질 / 텍스처 | 삼각형 (부품 이름 기준 분류) | bounding box (파일 단위) | 실제 크기 |
|---|---|---|---|---|---|
| 소총 M4 | 5,576,852 B, glTF 2.0 (Sketchfab-16.59.0) | 13 / 13 / 1024² 39장 | 15,328: 본체 14,892, 탄창(caricatore) 436. 부착물·손 없음 | 0.206 × 0.061 × 0.016 | 미확인 |
| 권총 | 1,923,404 B, glTF 2.0 | 2 / 2 / 1024² 3장 | 14,350: 본체(glock) 13,410, 가늠자 발광 부분(sight_glow) 940. 탄창 따로 없음, 손 없음 | 0.036 × 0.143 × 0.207 | 미확인 |
| 저격총 | 3,435,716 B, glTF 2.0 | 42 / 1 / 1024² 3장 | 15,257: 본체 12,591(손잡이 318 포함), 조준경으로 보이는 부품(Aim·eccentric 이름) 1,822, 레일 724, 탄창 120. 손 없음 | 2.516 × 7.902 × 32.469 | 미확인 |
| 산탄총 | 4,520,728 B, glTF 2.0 | 5 / 1 / 1024² 3장 | 16,260: 본체 13,784, 펌프 1,766, 탄(slug) 526, 장전부(loader) 110, 방아쇠 74. 손 없음 | 10.091 × 34.679 × 138.078 | 미확인 |
| 기관단총 MP5 | 475,404 B, glTF 2.0 | 1 / 1 / 512² 2장 | 1,865 (부품이 하나로 합쳐져 있어 이름으로 구분 불가) | 61.583 × 32.202 × 49.255 | 미확인 |
| 리볼버 | 3,764,900 B, glTF 2.0 | 1 / 1 / 1024² 3장 | 13,288 (부품 하나, 이름으로 구분 불가) | 0.564 × 1.958 × 3.994 | 미확인 |
| 칼 | 3,865,956 B, glTF 2.0 | 7 / 2 / 1024² 6장 | 3,100: 칼 1,328(날 366·코등이 158·손잡이 804), 칼집 1,772. 모델 페이지 설명(칼 1328, 칼집 1772)과 같음 | 0.374 × 0.123 × 0.028 (칼집 포함) | 미확인 |

- 7개 모두 HTML이 아닌 정상 glTF 바이너리(헤더 `glTF`, 선언 길이 = 파일 길이), 필수 확장 없음, 애니메이션 없음, 손 모델 없음.
- 파일마다 단위가 제각각이고(예: 소총은 0.2, 산탄총은 138) 실제 치수를 알려 주는 근거가 없어서 실제 크기는 "미확인"으로 남겼어요.

**바꾼 내용** (`weapons.glb`를 만들 때. 원본 파일은 그대로 둠)
- 총구가 앞(-z), 위가 +y가 되게 돌리고 가운데로 옮김. MP5는 파일 안에서 비스듬히(약 38°) 놓여 있어 꼭짓점 분포로 긴 축을 찾아 돌림.
- 크기: 실제 크기를 알 수 없어서 게임의 예전 블록 무기 길이에 맞춤(소총 1.08, 권총 0.21, 저격총 1.18, 산탄총 1.01, 기관단총 0.67, 리볼버 0.30, 칼 0.34. 3인칭에서는 0.8배).
- 같은 재질을 쓰는 부품은 하나로 합침(저격총 42개 → 1개 등, 그리기 횟수 줄이기).
- 텍스처를 줄임: 색 1024, 나머지(노멀·거칠기·금속·AO·발광) 512, 재질이 많은 소총은 모두 512. JPEG로 다시 저장. 7개 합계 23.6MB → 7.2MB.
- 칼: 칼집(LP_Leather_Tris 부품)을 뺌.
- 게임 안에서: 소총 레일 위에 예전부터 있던 레드닷 조준기를 얹음(M4 모델에는 조준기가 없음). 손 위치·조준선·총구 위치는 각 모델 위에서 직접 재서 `index.html`의 `GUN_MODELS`에 적음.

## 4. 함께 넣은 코드

| 파일 | 출처 | 라이선스 |
|---|---|---|
| `lib/GLTFLoader.js`, `lib/SkeletonUtils.js` | npm `three@0.128.0` 패키지의 `examples/js/` (게임이 쓰는 three.js r128과 같은 버전) | MIT, Copyright © 2010-2021 three.js authors |
