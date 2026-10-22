# 색상

색상의 역할을 일관되게 쓰면 사용자는 제목, 보조 설명, 필요한 행동을 빠르게 구별할 수 있습니다. 역할에 맞는 의미 토큰을 선택하면 라이트·다크 모드에서도 같은 기준으로 화면을 구성할 수 있습니다.

## 선택 기준

| 사용 상황                 | 권장 선택                 | 적용 코드                              |
| ------------------------- | ------------------------- | -------------------------------------- |
| 화면의 가장 바깥 배경     | `colorVars.bgCanvas`      | `backgroundColor: colorVars.bgCanvas`  |
| 일반 콘텐츠 영역          | `colorVars.bgSurface`     | `backgroundColor: colorVars.bgSurface` |
| 약하게 구별할 영역        | `colorVars.bgSubtle`      | `backgroundColor: colorVars.bgSubtle`  |
| 팝업처럼 떠 있는 표면     | `colorVars.bgRaised`      | `backgroundColor: colorVars.bgRaised`  |
| 제목·필수 본문            | `colorVars.fgPrimary`     | `color: colorVars.fgPrimary`           |
| 설명·보조 정보            | `colorVars.fgSecondary`   | `color: colorVars.fgSecondary`         |
| 일반 구분선               | `colorVars.strokeDefault` | `borderColor: colorVars.strokeDefault` |
| 반드시 구별해야 하는 경계 | `colorVars.strokeControl` | `borderColor: colorVars.strokeControl` |

주요 행동이나 파괴적 행동의 배경에는 대응하는 `fgOnActionPrimary` 또는 `fgOnActionDestructive`를 사용합니다. 오류는 `fgFeedbackError` 같은 상태 토큰과 구체적인 설명을 함께 사용합니다.

## 적용 예시

### 설정 패널에 적용하기

패널은 `bgSurface`, 제목은 `fgPrimary`, 보조 설명은 `fgSecondary`로 구성합니다. 저장 오류가 생기면 오류 색과 함께 수정 방법을 표시합니다. 설명과 오류를 모두 약한 색으로 처리하면 지금 해결할 문제가 묻힙니다.

> 라이트·다크 모드에서 같은 의미 토큰을 유지합니다. 의미 토큰을 썼다는 이유만으로 모든 전경·배경 조합의 대비가 보장되지는 않습니다. 실제 조합을 검사하고, 상태를 색만으로 전달하지 않습니다.

## 위계와 경계

`fgPrimary`는 필수 본문, `fgSecondary`는 읽을 수 있어야 하는 보조 설명에 사용합니다.
`fgTertiary`는 중요도가 낮은 부가 표시, `fgDisabled`는 실제로 사용할 수 없는 조작에만
사용합니다. 보조 설명을 비활성 색으로 처리하지 않습니다.

단순 구획에는 `strokeDefault`, 메뉴 안의 행동 그룹처럼 더 분명한 구분에는
`strokeStrong`을 사용합니다. `strokeStrong`은 선택·오류·포커스의 대체 색이 아니며,
그 자체로 접근성 대비를 보장하지 않습니다. Dropdown Menu 구분선은 이 기준을 따릅니다.

선택과 드롭의 배경·전경·경계 조합은 [상태](?path=/docs/foundations-state--docs)의
역할별 조합 계약을 따릅니다. `bgSubtle`만으로 선택을 표시하지 않습니다.

## 채택한 팔레트

미세하게 차가운 Zinc 계열의 회색을 사용합니다. 기존 토큰 이름과 라이트·다크 역할을 유지하며, 배경·글자·테두리·주요 행동에 같은 계열을 적용합니다. 정보·성공·경고·오류 색과 글자·간격·모서리 배율은 유지합니다.

| 팔레트   | 값      | 역할                                 |
| -------- | ------- | ------------------------------------ |
| White    | #FFFFFF | 라이트 콘텐츠 표면, 주요 행동 글자   |
| Chalk    | #F4F4F5 | 라이트 캔버스, 반전 표면 글자와 행동 |
| Fog      | #E4E4E7 | 라이트 묶음과 장식 구분선            |
| Silver   | #A1A1AA | 반전 표면 설명                       |
| Steel    | #71717A | 강한 경계, 비활성 글자               |
| Iron     | #52525B | 라이트 설명, 반전 표면 구분선        |
| Graphite | #27272A | 주요 행동 호버, 반전 표면            |
| Carbon   | #09090B | 라이트 본문과 주요 행동              |

White나 Chalk 위 입력에는 `strokeControl`(Zinc 450, #85858F)을 사용합니다. Fog 위 선택 경계에는 `strokeAction`을 사용합니다. `strokeDefault`는 장식용 구분선입니다. 검사한 조합에서 글자는 4.5:1, 필수 컨트롤·포커스 경계는 3:1을 기준으로 확인합니다.

다크 캔버스는 Zinc 900(`#18181B`), 표면은 Graphite(`#27272A`)를 사용해 밝기 차이를 완만하게 합니다. 기존 정보·성공·경고·오류 색은 유지합니다. 주요 버튼은 호버에 `bgActionPrimaryHover`를 사용하고 나머지 상태 레이어는 기존 역할을 유지합니다.

평상시 컨트롤 경계는 라이트에서 Zinc 450, 다크에서 Steel을 사용합니다. 일반 다크 구분선은 Zinc 700입니다. 호버는 `strokeStrong`, 포커스는 Iron·Silver로 강도를 구분하며 포커스·오류·필수 경계의 대비는 유지합니다.
