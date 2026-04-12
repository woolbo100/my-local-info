<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code when available. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BUSAN NOW CODEX INSTRUCTIONS

## 프로젝트 목적

이 프로젝트는 부산 지역 정보 중심의 정적 사이트입니다.
목표는 검색엔진 친화적인 구조, 에드센스 승인 가능한 콘텐츠 품질, 그리고 사용자에게 실제로 도움이 되는 로컬 정보 제공입니다.

---

## 1. 콘텐츠 운영 원칙

- 모든 글은 부산 지역 정보와 직접적으로 연결되어야 한다.
- 카테고리는 부산 로컬 생활 정보라는 큰 주제 안에서만 확장한다.
- 단순 정보 복붙형 문서는 만들지 않는다.
- 실제 방문자 입장에서 도움이 되는 선택형 정보를 우선한다.
- AI 느낌이 강한 반복 문장, 과장 표현, 의미 없는 나열을 피한다.
- 글은 가능한 한 경험 기반 문장과 현실적인 상황 설명을 포함해야 한다.

---

## 2. 글 작성 규칙

### 필수 규칙

- 본문은 최소 1500자 이상 작성한다.
- 메타 설명을 포함한다.
- 도입에는 공감형 상황과 질문형 문장을 넣는다.
- 부산 지역 특성을 반영한다.
- 최소 3개 이상의 선택지 또는 비교 대상을 포함한다.
- 각 선택지에는 장점과 단점을 함께 적는다.
- 현실적인 경험 또는 상황 예시를 최소 2개 이상 포함한다.
- 결론에서는 독자가 선택할 수 있도록 정리한다.
- 내부링크 문장 1개를 포함한다.

### 권장 표현

- 실제로
- 생각보다
- 많이들
- 이 경우 → 이 선택

### 금지

- 의미 없는 키워드 반복
- 문장 끝의 과도한 `~입니다` 반복
- 사실 확인 없는 단정
- 출처 불명 확정 표현
- 저작권 침해 가능성이 있는 복붙 문장

---

## 3. 포스트 파일 형식 규칙

```yaml
---
title: 제목
date: YYYY-MM-DD
category: 카테고리명
image: /images/카테고리/파일명.webp
excerpt: 120~160자 이내 요약문
---
```

### 규칙

- `title`은 검색 의도가 드러나게 작성한다.
- `date`는 실제 발행일 기준으로 작성한다.
- `category`는 사전에 정한 슬러그만 사용한다.
- `image` 경로는 반드시 `/images/...` 규칙을 따른다.
- `excerpt`는 검색 결과와 목록 페이지에서 바로 이해되도록 작성한다.

---

## 4. 카테고리 및 슬러그 규칙

프로젝트에서 허용하는 카테고리는 아래 6개로 고정한다.

- `festivals`
- `benefits`
- `food`
- `hotplaces`
- `dates`
- `blog`

### 주의

- 위 6개 외의 카테고리 값은 사용하지 않는다.
- `festival`, `event`, `events`, `date-course`, `date-courses`, `hotplace` 같은 변형값을 새 글에 사용하지 않는다.
- 축제와 이벤트 성격의 글은 모두 `festivals`로 통일한다.
- 데이트 코스 글은 모두 `dates`로 통일한다.
- 핫플 카테고리는 반드시 `hotplaces`를 사용한다.
- 슬러그를 임의로 변형하지 않는다.

---

## 5. 콘텐츠 저장 경로 규칙

- `festivals` 글은 `content/festivals/`에 저장한다.
- `benefits` 글은 `content/benefits/`에 저장한다.
- `food` 글은 `content/food/`에 저장한다.
- `hotplaces` 글은 `content/hotplaces/`에 저장한다.
- `dates` 글은 `content/dates/`에 저장한다.
- `blog` 글은 `content/blog/`에 저장한다.

### 금지

- `content/date-courses/` 같은 레거시 경로에 새 글을 만들지 않는다.
- 카테고리와 다른 폴더에 글을 저장하지 않는다.

---

## 6. URL 및 슬러그 변경 규칙

### 반드시 지킬 것

1. 기존 주소에서 새 주소로 301 리디렉션을 설정한다.
2. 카테고리 메인 주소와 상세 글 주소를 모두 처리한다.
3. 내부 링크도 새 주소로 함께 수정한다.
4. canonical을 새 주소 기준으로 유지한다.
5. 404를 방치하지 않는다.

---

## 7. 리디렉션 구현 원칙

- 이 프로젝트는 정적 배포 환경을 사용하므로 서버 리디렉션만 믿지 않는다.
- 배포 환경에서 실제로 동작하는 리디렉션 규칙을 함께 유지한다.
- 기존 주소 접속 시 새 주소로 정상 이동하는지 확인한다.

---

## 8. SEO 원칙

- 제목 키워드를 앞쪽에 배치한다.
- H1은 1개만 사용한다.
- H2는 3개 이상 구성한다.
- WebP 이미지를 우선 사용한다.
- 내부링크를 반드시 포함한다.
- URL 변경 시 SEO 손실을 막기 위해 리디렉션과 내부 링크를 같이 수정한다.

---

## 9. 에드센스 대응

### 필수 페이지

- About
- Contact
- Privacy Policy
- Terms

### 금지

- 복붙 콘텐츠
- 링크 유도형 글

---

## 10. 사실성 원칙

- 확정된 정보만 단정 표현을 사용한다.
- 예측성 내용은 `예정`, `가능성`처럼 불확실성을 명시한다.

---

## 11. 이미지 규칙

- 16:9 비율을 우선한다.
- WebP를 사용한다.
- 텍스트 없는 이미지를 우선한다.

---

## 12. 내부 링크

- 내부 링크는 최소 1개 필수다.
- 문맥상 자연스럽게 연결한다.

---

## 13. 수정 작업 체크

- frontmatter 확인
- category 통일
- 링크 깨짐 확인
- 기존 URL 리디렉션 확인

---

## 14. 우선순위

1. 구조 유지
2. SEO 유지
3. 사용자 가치

---

## 15. 금지 사항

- 404 방치
- 슬러그 무단 변경
- 짧은 글
- 카테고리 혼용

---

## 16. Codex 행동 규칙

- preserve routes
- add redirects
- update links
- keep SEO structure
- keep category values fixed to `festivals`, `benefits`, `food`, `hotplaces`, `dates`, `blog`
