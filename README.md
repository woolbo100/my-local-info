# ⚓️ 부산나우 (Busan Now)

부산의 축제, 혜택, 맛집, 핫플, 데이트 코스 정보를 한눈에 볼 수 있는 지역 정보 포털 사이트입니다.

## 🚀 시작하기

이 프로젝트는 **Next.js 16 (App Router)**와 **Tailwind CSS**를 기반으로 제작되었습니다.

### 로컬 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## 🌐 배포 설정 (Cloudflare Pages)

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다. 정상적인 배포를 위해 아래 **GitHub Secrets** 설정을 완료해주세요.

### 1단계: 클라우드플레어 인증 관리
깃허브 리포지토리의 **Settings > Secrets and variables > Actions** 메뉴에서 다음 값을 추가합니다.

- `CLOUDFLARE_API_TOKEN`: 클라우드플레어 대시보드에서 생성한 API 토큰 (Pages 권한 필요)
- `CLOUDFLARE_ACCOUNT_ID`: 클라우드플레어 대시보드 우측 하단에서 확인 가능한 계정 ID

### 2단계: 프로젝트 이름 확인
`.github/workflows/deploy.yml` 파일의 `projectName` 값이 클라우드플레어 페이지 스 프로젝트 이름과 일치하는지 확인하십시오. 현재 기본값은 `my-local-info`입니다.

---

## 📂 프로젝트 구조

- `src/app/`: 각 카테고리별 페이지 및 API 라우트
- `src/components/`: 레이아웃, 카드, 섹션 등 재사용 컴포넌트
- `src/data/`: 부산 지역 정보 샘플 데이터 (목데이터)
- `src/types/`: 데이터 모델의 타입 정의

---

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: Cloudflare Pages + GitHub Actions
- **Language**: TypeScript

## 📅 향후 계획

- [ ] 공공데이터 API 실시간 연동 (축제, 혜택 등)
- [ ] Gemini AI 기반 블로그 자동 생성 자동화
- [ ] Google AdSense 및 쿠팡 파트너스 배너 연동
