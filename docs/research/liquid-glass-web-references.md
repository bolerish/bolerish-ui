# 웹 Liquid Glass 구현 참고 조사

2026-11-02 · 설치·실행 없는 원본 소스 조사

## 결론

현재 React·StyleX 라이브러리에는 **shuding의 변위 맵 생성 원리와 glassy-liquid의 장면별 렌더링 경계**를 참고하는 것이 적합하다. 의존성 채택은 보류한다. Liquid Glass를 표방하는 웹 구현은 존재하지만, 임의의 실시간 DOM 배경을 모든 브라우저에서 Apple 네이티브와 같은 방식으로 굴절시키는 해결책은 확인하지 못했다. 좋은 광학 참고 구현과 기존 패키지에 바로 넣을 수 있는 의존성은 다르다.

이 문서의 ‘소스 확인’은 원본 파일을 읽었다는 뜻이다. 작성자의 지원·성능 주장은 별도로 표시한다. 데모 실행, 시각 비교, 빌드, 브라우저 자동화, 실기기 측정은 하지 않았다. 브랜치 링크는 이후 변경될 수 있다.

## 후보 비교

| 원본 및 라이선스 | 확인한 메커니즘 | 지원 한계와 통합 비용 | 판단 |
|---|---|---|---|
| [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react), [MIT](https://github.com/rdev/liquid-glass-react/blob/master/LICENSE) | `src/index.tsx`에서 SVG 색 채널별 변위 및 합성. 별도 레이어의 blur backdrop에 SVG `filter`를 적용한다. shader 모드는 캔버스로 **변위 맵**을 생성하며 페이지를 캡처하는 캔버스가 아니다. | 렌더 중 `navigator.userAgent` 접근이 있어 현재 소스 그대로 서버 렌더 안전하다고 할 수 없다. Firefox에서 필터를 끄는 분기 존재. Safari의 동일 굴절은 미확인. React 외 필수 런타임 의존성은 package.json에서 확인되지 않았지만 클래스 기반 주변 스타일도 점검해야 한다. | 잘 알려진 React 참고점. 그대로 채택보다 가장자리 마스크·색 분산 구조만 참고. |
| [shuding/liquid-glass](https://github.com/shuding/liquid-glass), [MIT](https://github.com/shuding/liquid-glass/blob/main/LICENSE) | `liquid-glass.js`가 숨긴 캔버스로 변위 벡터를 인코딩하고 SVG `feImage`·`feDisplacementMap`을 `backdrop-filter:url(...)`에 연결. 실제 배경은 브라우저의 backdrop 입력. | `window`·`document`에 즉시 접근하는 실행 스크립트이며 React 패키지가 아니다. SVG backdrop 경로는 Chromium 중심. 이벤트·DOM 생성과 정리를 제품 생명주기에 맞게 다시 설계해야 한다. | **광학 원리 우선 참고**. 스크립트 직접 삽입은 비추천. |
| [naughtyduk/liquidGL](https://github.com/naughtyduk/liquidGL), [제한 범위 MIT](https://github.com/naughtyduk/liquidGL/blob/main/LICENSE) | 현재 `package/liquidGL.js`에는 자체 DOM 래스터라이저가 있다. 페이지를 재현한 스냅샷을 GPU 텍스처로 굴절한다. README의 현재 경로는 WebGPU→WebGL2→WebGL1→CSS. 과거 html2canvas 설명과 혼동하지 말 것. | 작성자는 Safari·Firefox 지원을 주장하지만 Safari에서 렌즈가 뷰포트 절반 이상일 때 불안정 가능성을 명시한다. 긴 페이지·CORS·비동기 초기 캡처·공유 캔버스의 쌓임 순서 제약이 있다. 무의존성도 무비용은 아니다. | GPU 광학·틴트 참고용. 전체 페이지 캡처 도입은 현 범위 밖. **assets의 폰트·음원·이미지는 MIT 적용 제외**, 별도 허가 필요. |
| [lucaperullo/simple-liquid-glass](https://github.com/lucaperullo/simple-liquid-glass), [MIT 및 고지](https://github.com/lucaperullo/simple-liquid-glass/blob/main/THIRD_PARTY_NOTICES.md) | Chromium SVG backdrop과 명시적 배경의 WebGL 경로. `src/core/webgl/source.ts`는 vendored HtmlCapture와 복제·캡처 경로를 사용한다. HTML은 래스터 스냅샷, 직접 지정한 video/canvas는 실시간 프레임 경로다. | README상 Safari/iOS/Firefox는 Scene 또는 명시적 배경이 있어야 굴절하고 나머지는 CSS 대체. 기본 장면 캐시 64 MiB, 활성 장면은 초과 가능하다는 작성자 설명. 중첩 미디어는 스냅샷이고 iframe·shadow DOM·보호 미디어는 보장하지 않는다. | 현재 라이브러리보다 훨씬 큰 캡처 수명주기. 자원·실패 처리 참고로 한정. MIT 본문 외 포함된 제삼자 고지도 보존해야 한다. |
| [9und30/glassy-liquid](https://github.com/9und30/glassy-liquid), [MIT](https://github.com/9und30/glassy-liquid/blob/main/LICENSE) | Chromium 실제 backdrop, 명시적 img/video/canvas 장면은 공유 WebGL. `src/scene/dom.ts`는 **원래 장면 배경 요소 자체에 영역별 SVG 필터**를 적용한다. DOM 복제나 화면 스냅샷 방식과 다르다. | 작성자 지원표상 Safari 16.4+·Firefox 103+는 장면 안에서만 굴절. DOM 장면은 WebKit CPU 비용 주의. Web Components와 React 바인딩·별도 스타일 체계까지 있어 기존 UI 교체 비용이 크다. | **지원 경계·캐시·접근성 참고 우선**. 전체 컨트롤 패키지 채택 추천은 아님. |

소스 근거: [rdev 컴포넌트](https://github.com/rdev/liquid-glass-react/blob/master/src/index.tsx), [맵 생성](https://github.com/rdev/liquid-glass-react/blob/master/src/shader-utils.ts), [shuding 스크립트](https://github.com/shuding/liquid-glass/blob/main/liquid-glass.js), [liquidGL 구현](https://github.com/naughtyduk/liquidGL/blob/main/package/liquidGL.js), [liquidGL 지원·제약](https://github.com/naughtyduk/liquidGL#readme), [simple 캡처 소스](https://github.com/lucaperullo/simple-liquid-glass/blob/main/src/core/webgl/source.ts), [simple 현재 설명](https://github.com/lucaperullo/simple-liquid-glass#readme), [glassy DOM](https://github.com/9und30/glassy-liquid/blob/main/src/scene/dom.ts), [glassy 미디어](https://github.com/9und30/glassy-liquid/blob/main/src/scene/gl.ts).

초기 후보의 저장소 정체성도 GitHub API로 확인했다. [sohumsuthar/liquid-glass](https://github.com/sohumsuthar/liquid-glass), [medfa12/liquid-glass-react](https://github.com/medfa12/liquid-glass-react), [PallavAg/liquid-glass-web-react](https://github.com/PallavAg/liquid-glass-web-react)는 각각 독립 저장소이며 MIT 표기가 있었다. 깊은 소스 검토를 하지 않았으므로 우열을 주장하거나 추가 권장하지 않는다. 이름이 비슷하다는 이유로 rdev의 배포물과 동일시해서는 안 된다.

## 실제 웹 에이전트 스킬

[xinlingfeiwu/liquid-glass-design-skill](https://github.com/xinlingfeiwu/liquid-glass-design-skill)은 실제 웹·Electron용 스킬이며 [SKILL.md](https://github.com/xinlingfeiwu/liquid-glass-design-skill/blob/main/skills/liquid-glass-design/SKILL.md), [React 맵 생성](https://github.com/xinlingfeiwu/liquid-glass-design-skill/blob/main/packages/react-liquid-glass/src/displacementMap.js), [템플릿 CSS](https://github.com/xinlingfeiwu/liquid-glass-design-skill/blob/main/skills/liquid-glass-design/assets/templates/react-liquid-glass/src/liquidGlass.css)를 읽었다. 외부 지시는 실행하지 않고 참고 데이터로만 취급했다. [MIT](https://github.com/xinlingfeiwu/liquid-glass-design-skill/blob/main/LICENSE).

단순 blur/border 템플릿보다 구체적이다. 크기·반경에 따른 역렌즈 맵과 실측 벡터 범위에 맞춘 scale, 캐시, 밝기별 틴트, 안쪽 림과 바깥 그림자를 다룬다. 다만 숫자 기본값을 정답으로 고정하거나 쇼케이스 제작 절차를 현재 프로젝트에 강제할 이유는 없다. CSS의 하이라이트는 실제 환경 조명을 계산하는 증거가 아니라 그라디언트 합성이다. Safari/Firefox의 임의 backdrop 굴절 문제도 스킬이 해결하지 않는다. **설치 권장보다 체크리스트와 수학 참고로 조건부 권장**한다.

[simple-liquid-glass의 스킬](https://github.com/lucaperullo/simple-liquid-glass/blob/main/skills/simple-liquid-glass/SKILL.md)도 읽었다. 해당 라이브러리 API 사용 설명에 가까우며, 앞부분의 Safari/Firefox WebGL 설명과 뒤쪽의 ‘Chromium에서만 굴절’ 문장이 함께 남아 있다. 최신 README·소스와 대조해야 하므로 독립적인 설계 권위로 삼기 어렵다. 이번에는 원본 저장소 검색을 사용했으며 skills.sh 설치 워크플로·npx는 사용하지 않았다. SwiftUI 전용 스킬은 웹 구현 후보로 포함하지 않았다. 검토한 범위에서 전 브라우저 실시간 DOM 굴절까지 검증된 범용 웹 스킬은 없다.

## 기존 구현에 가져올 학습 범위

현재 프로젝트의 material 경로는 고정 256×128 SVG 맵·scale 6과 작은 blur를 사용하고, 명시적 Liquid 경로는 소유한 배경과 형상 기반 맵·scale 12를 사용한다는 부모 작업의 확인을 전제로 한다. 이 수치들은 이번 조사에서 재측정하지 않았다. 기존 `liquid-glass-depth-and-borders.md`의 구조적 경계와 광학 림 분리 방향을 대체하는 제안이 아니다.

shuding에서 배울 것은 **맵과 요소 형상의 대응**이다. 중앙과 가장자리의 변위 분포를 분리하고, 반경·종횡비 변화가 벡터 방향과 인코딩 범위에 미치는 영향을 검토한다. 큰 scale 자체는 품질 증거가 아니다. rdev의 색 채널 분리는 선택적 광학 효과이며 텍스트 위에서는 가독성 비용이 있을 수 있다.

glassy-liquid에서 배울 것은 **입력 배경의 소유권에 따른 경로 분리**다. 실제 backdrop, 소유 미디어, 제한된 DOM 장면은 서로 다른 계약이다. 원래 DOM에 필터를 걸면 캡처 복제는 피하지만 배경 레이어 자체의 렌더링을 바꾸므로 기존 페이지 구조와 무료로 호환되는 것은 아니다.

광택은 방향성 하이라이트, 그림자는 부유 깊이, 바깥 선은 구조적 경계를 담당하도록 분리한다. 틴트는 배경의 복잡도와 텍스트 대비를 조절하는 층으로 취급한다. 외부 데모의 흰 선·색 분산 강도를 그대로 복사하는 것보다 이 책임 분리가 유용하다. 이는 소스 구조에서 얻은 설계 추론이며 Apple과의 시각적 일치 측정 결과가 아니다.

## 통합 전제와 미검증 사항

SSG HTML을 보존하는 현재 흐름에서는 모듈 평가·렌더 시 브라우저 전역 접근, hydration 전 DOM 삽입, SVG ID 안정성, 측정 전후 스타일 변화, preload와 캡처 시점을 따로 검토해야 한다. rdev의 직접 navigator 접근과 shuding의 즉시 실행은 구체적인 위험 근거다. 다른 후보의 SSR 안전성은 README 선언만으로 확인 완료 처리하지 않는다.

SVG backdrop의 엔진 차이는 [WebKit 원본 이슈 245510](https://bugs.webkit.org/show_bug.cgi?id=245510) 및 각 프로젝트 지원 설명이 근거다. 특정 Safari/iOS·Firefox 최신 버전에서 직접 재현하지 않았으므로 정확한 현재 회귀 상태는 미검증이다. WebGL 사용 여부와 임의 DOM 배경 지원 여부는 별개다.

성능 수치는 비교 근거로 채택하지 않았다. glassy-liquid의 60 fps·번들 크기와 liquidGL의 다수 렌즈 테스트는 작성자의 특정 환경 주장이다. 캡처는 DOM 직렬화·폰트/이미지 로딩·래스터 메모리·텍스처 업로드를 추가하고, GPU 경로도 패널 면적·DPR·프레임버퍼·색 분산 패스에 비례하는 비용이 있다. 의존성이 없다는 표현은 이런 자원 비용이나 vendored 코드가 없다는 뜻이 아니다.

접근성은 기존 reduced transparency·forced colors를 유지하고 불투명 표면·시스템 색·포커스 표시를 우선해야 한다. glassy-liquid README는 reduced motion·transparency 및 forced colors 처리를 명시하지만 실제 보조 기술 검증은 수행하지 않았다. blur fallback이 있다는 사실만으로 대비나 접근성이 충족되지는 않는다.

다음 단계는 **의존성 추가 없이** 현재 두 렌더링 경로에 대한 짧은 설계 검토로 한정하는 것이 적절하다. 가장자리 맵의 크기 대응, 방향성 림, 틴트·그림자 역할을 우선순위화하고 별도 승인된 구현 작업에서 대상 브라우저와 배경 조건을 정해 비교한다. 이번 완료 기준은 참고 후보·라이선스·메커니즘·지원 한계의 문서화이며 설치나 제품 변경은 포함하지 않는다.
