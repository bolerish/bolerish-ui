## 사용 가이드

`variant`는 `body`(기본값), `description`, `caption` 중 선택합니다. 기본 배율에서 본문은 16px, 설명은 14px, 캡션은 12px이고 행간은 모두 1.5입니다. 본문은 `fgPrimary`, 설명은 `fgSecondary`, 캡션은 `fgTertiary`를 사용합니다. 모든 변형은 HTML `p`로 출력됩니다.

`type` 대신 `variant`로 시각적 역할을 고릅니다. 문단에는 외부 여백이 없으므로 `xstyle`의 여백이나 부모의 `gap`으로 배치합니다. `id`, `aria-describedby` 같은 일반 문단 속성도 전달할 수 있습니다.

> 제목은 `Heading`을 사용합니다. 입력과 연결되는 이름·설명·오류는 `FieldLabel`, `FieldDescription`, `FieldError`가 담당합니다. 필수 안내를 캡션으로 줄이지 않습니다.
