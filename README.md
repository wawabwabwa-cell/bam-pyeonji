# 🌙 밤 편지 — 익명 펜팔 소셜 앱 프로토타입

차분한 다크 모드 기반의 감성 편지 앱 MVP 프로토타입입니다.

## 📱 구현된 화면

| # | 화면 | 설명 |
|---|------|------|
| 1 | 온보딩 | 별하늘 + 초승달 브랜딩, 시작 버튼 |
| 2 | 관심사 선택 | 태그 멀티셀렉트, 3개 이상 선택 유도 |
| 3 | 매칭 대기 | 파동 애니메이션, 자동 전환 |
| 4 | 오늘의 질문 | 질문 카드 + 지난 질문 아코디언 |
| 5 | 편지 작성 | 편지지 UI, 글자수 제한, 지연 전달 뱃지 |
| 6 | 편지함 | 읽음/안읽음, 도착 예정 편지 |
| 7 | 편지 읽기 | 편지지 감성 본문, 답장 버튼 |
| 8 | 신고/차단 | 바텀시트 UX |

## 🚀 실행 방법 (Windows Visual Studio Code)

### 1. 사전 준비
Node.js 설치: https://nodejs.org (LTS 버전 권장)

설치 확인:
```bash
node -v
npm -v
```

### 2. 프로젝트 열기
1. 이 폴더를 VS Code로 열기 (`File > Open Folder`)
2. 터미널 열기 (`Ctrl + `` ` ``)

### 3. 의존성 설치
```bash
npm install
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 자동으로 열리거나, 터미널에 나오는 주소를 클릭하세요.
보통 `http://localhost:5173` 입니다.

### 5. 빌드 (배포용)
```bash
npm run build
```
`dist/` 폴더에 정적 파일이 생성됩니다.

## 🗂️ 프로젝트 구조

```
src/
├── components/
│   └── StarField.tsx        # 별빛 배경 컴포넌트
├── screens/
│   ├── OnboardingScreen.tsx # 온보딩
│   ├── InterestsScreen.tsx  # 관심사 선택
│   ├── MatchingScreen.tsx   # 매칭 대기
│   ├── QuestionScreen.tsx   # 오늘의 질문
│   ├── WriteScreen.tsx      # 편지 작성
│   ├── InboxScreen.tsx      # 편지함
│   ├── ReadScreen.tsx       # 편지 읽기
│   └── ReportScreen.tsx     # 신고/차단
├── types/
│   └── index.ts             # TypeScript 타입
├── App.tsx                  # 메인 앱 + 화면 네비게이션
├── main.tsx                 # 진입점
└── index.css                # 전역 스타일
```

## 🛠 기술 스택

- **React 18** + **TypeScript**
- **Vite** (빠른 개발 서버)
- **Tailwind CSS** (유틸리티 스타일링)
- **lucide-react** (아이콘)

## 📌 다음 단계 (백엔드 연동 시)

- [ ] Supabase Auth 연동 (익명 로그인)
- [ ] PostgreSQL 편지 DB 설계
- [ ] Redis 큐 기반 지연 전달 시스템
- [ ] 실시간 알림 (Supabase Realtime)
- [ ] PWA 설정 (모바일 앱처럼 설치)
