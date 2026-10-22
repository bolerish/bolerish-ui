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

## 팔레트

거의 검정인 차가운 표면과 Zinc 계열의 흑백 주요 행동을 사용합니다. 라이트 표면과 필수 컨트롤 경계는 읽기와 조작에 필요한 대비를 유지합니다.

| 역할                  | 값      | 적용                        |
| --------------------- | ------- | --------------------------- |
| 다크 캔버스           | #08090A | 화면의 가장 낮은 면         |
| 다크 콘텐츠           | #0F1011 | 카드·입력·기본 표면         |
| 다크 팝업             | #161718 | 떠 있는 면·약한 묶음        |
| 다크 선택·구분선      | #23252A | 선택 면·장식 경계           |
| 다크 보조 글자        | #8A8F98 | 읽을 수 있는 설명·메타 정보 |
| 라이트 캔버스         | #F5F6F8 | 밝은 화면의 기본 면         |
| 라이트 콘텐츠         | #FFFFFF | 카드·입력                   |
| 라이트 묶음           | #E5E5E6 | 약한 묶음·구분선            |
| 라이트 주요 행동      | #18181B | 밝은 면 위의 어두운 버튼    |
| 라이트 주요 행동 글자 | #FFFFFF | 어두운 버튼 위의 밝은 글자  |
| 다크 주요 행동        | #E4E4E7 | 어두운 면 위의 밝은 버튼    |
| 다크 주요 행동 글자   | #18181B | 밝은 버튼 위의 어두운 글자  |
| 라이트 주요 행동 호버 | #3F3F46 | 어두운 버튼의 호버          |
| 다크 주요 행동 호버   | #D4D4D8 | 밝은 버튼의 호버            |

주요 행동과 현재 단계는 흑백 대비로 구분합니다. 정보·성공·경고·오류 색은 각각의 상태를 알리는 데 사용합니다.

라이트 입력의 `strokeControl`은 #81868F, 다크는 #62666D입니다. `strokeDefault`는 장식용 구분선이며 필수 경계를 대신하지 않습니다. 다크 선택 경계의 `strokeStrong`은 #81868F로 구별합니다. 포커스는 라이트 #383B3F, 다크 #8A8F98을 사용합니다. 검사한 조합에서 글자는 4.5:1, 필수 컨트롤·포커스 경계는 3:1을 기준으로 확인합니다.

## 팔레트 작성과 생성

팔레트 원본은 `packages/tokens/palette.oklch.json`에서 OKLCH로 작성합니다.
명도·채도·색상을 조정한 뒤 `pnpm palette:generate`로 StyleX 토큰의 HEX 값을 생성합니다.
생성된 `color-palette.stylex.ts`의 팔레트 값은 직접 수정하지 않습니다.
불투명 색은 6자리 HEX, 반투명 색은 8자리 HEX로 저장하며 알파는 8비트로 반올림됩니다.
sRGB 범위를 벗어나면 생성을 중단하므로 채도를 줄여 다시 검토합니다.
`pnpm palette:check`는 원본과 생성 결과의 일치를, `pnpm test:tokens`는 변환과 대비를 확인합니다.
소비자에게는 생성된 토큰만 전달되며 OKLCH 변환을 런타임에서 실행하지 않습니다.
