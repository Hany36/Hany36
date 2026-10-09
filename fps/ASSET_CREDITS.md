# 외부 에셋 출처와 이용 조건 (Jammini_FPS_1.0)

확인일: 2026-10-09. 저장소의 코드 라이선스를 모델에 자동으로 적용하지 않았어요. 모델마다 따로 찾은 근거만 적었어요.

## 1. 캐릭터: `assets/models/soldier.glb` (게임에 적용함)

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

## 2. 총기 후보: `assets/models/gun.glb` (게임에는 적용 안 함, 미리보기만)

| 항목 | 내용 |
|---|---|
| 원본 | Microsoft MixedRealityToolkit 저장소 `SpatialInput/Samples/DemoRoom/Media/Models/Gun.glb` — https://github.com/Microsoft/MixedRealityToolkit/blob/master/SpatialInput/Samples/DemoRoom/Media/Models/Gun.glb |
| 받은 경로 | `https://raw.githubusercontent.com/Microsoft/MixedRealityToolkit/master/SpatialInput/Samples/DemoRoom/Media/Models/Gun.glb` (HTTP 200, 4,776,896 바이트) |
| 원본 일치 확인 | 저장소 커밋 `6573648`의 git blob `98738c0815ad37f63ae17b2bd0a5a46170f54994` = 받은 파일의 git hash (동일). LFS 추적 파일 아님 |
| 파일 검사 | glTF 2.0 바이너리(정상). 확장 `KHR_materials_pbrSpecularGlossiness`, `MSFT_lod` 사용(필수 아님) |
| 내용 | 메시 1개, 약 1,200 삼각형, 재질 1개, 1024×1024 텍스처 4장, 애니메이션 없음, 손·팔 없음 |
| 이용 조건 | 저장소 루트 `LICENSE.md`가 MIT 라이선스(Copyright (c) Microsoft Corporation). 모델 폴더와 DemoRoom README, 저장소의 다른 LICENSE/NOTICE 파일 어디에도 이 모델을 MIT에서 제외한다는 내용은 없었어요. 모델 전용 조건은 찾지 못했고, 저장소 전체에 붙은 MIT 라이선스가 이 파일에도 적용된다고 보는 것이 현재 찾은 유일한 근거예요(확인 수준: 중간). MIT 조건에 따라 쓸 때는 저작권 표시와 라이선스 문구를 함께 남겨야 해요 |
| 적용하지 않은 이유 | 외형이 주황·흰색의 SF 블래스터(레이저총)라서 "실제 총"이라는 목표와 맞지 않아요. 미리보기 화면(`model-preview.html?m=gun`)에서 확인할 수 있어요 |

## 3. 함께 넣은 코드

| 파일 | 출처 | 라이선스 |
|---|---|---|
| `lib/GLTFLoader.js`, `lib/SkeletonUtils.js` | npm `three@0.128.0` 패키지의 `examples/js/` (게임이 쓰는 three.js r128과 같은 버전) | MIT, Copyright © 2010-2021 three.js authors |
