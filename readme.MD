# Fortnite Web<!-- TOC -->

- [Spec](#Spec)
- [Prerequisites](#Prerequisites)
- [Pre-install](#Pre_Install)
- [Config](#Config)
    - [Develop env](#Develop_env)
- [Commands](#Commands)
- [Start](#Start)
- [Folder structure](#Folder_structure)

<!-- /TOC -->

#Spec

- [o] next.js 세팅
- [o] typescript (https://github.com/zeit/next.js/tree/canary/examples/custom-server-typescript, https://github.com/zeit/next.js/tree/canary/examples/with-typescript)
- [o] 다국어 처리 (https://github.com/zeit/next.js/tree/canary/examples/with-react-intl)
- [o] 다국시간 처리
- [o] ie 브라우저 처리
- [o] 템플릿 캐싱 (https://github.com/zeit/next.js/tree/canary/examples/ssr-caching)
- [o] static 파일 설정 (도메인 변경) (https://github.com/zeit/next.js/tree/canary/examples/root-static-files)
- [o] 환경변수 설정 (https://github.com/zeit/next.js/tree/canary/examples/with-dotenv)
- [o] 쿠키 관리 
- ~~[ ] 캐시 강제로 날리는 법 (배포시) : 캐시를 서버 실행하고서 객체에다 쌓아놓는 방식으로 되어있어서 서버를 재실행 하게되면 캐시가 아예 빈 상태로 시작하게됨. 그래서 강제 캐시 삭제는 궅이 없어도 될듯.~~
- [o] **상태관리 (redux등을 붙일 수 있는지)
    - ~~[ ] Context, GraphQL : 시기상조라 고려 안하기로 함 (해도 다음 프로젝트에서)~~
- [o] 스타일링 styled-component ( https://github.com/zeit/next.js/tree/canary/examples/with-styled-components)
- [o] 테마 작업 환경
- [o] 페이지 이동시 로딩바(프로그레스바) (https://github.com/zeit/next.js/tree/canary/examples/with-loading)
- [o] 로거환경
- [o] immutable
- [o] 커스텀 페이지(이벤트 페이지)
- [o] tooltip
- ~~[ ] 지도(아직 필요 없음.)~~
- [o] test 환경 (jest, enzyme 으로 세팅 storybook은 nextjs환경에서의 문제인지 react16버전의 문제인지 정상작동 하지 않아서 포기)
- ~~[ ] jwt 확인(역시 아직 필요 없음.)~~
- [o] facebook, ga sdk
- [o] 폴리필 (ie10 <) 적용
- [o] 프로세스 메니저 세팅
- [o] svg 이미지 적용(색상 바꿀 수 있도록)
- [o] 도커 세팅


#Prerequisites

- Node.js >= 8.x (Recommended the latest version) - 2018.08.08 v8.11.3 테스트 완료

#Pre_Install

기본적으로 package.json에 등록된 npm명령어들은 yarn이 설치되었다는 전제하에 작성되어있다.
yarn 설치 되어있다면 건너뛴다.
```sh
npm i -g yarn
```

#Install

package.json에 작성된 의존성들을 설치한다.
```sh
yarn
```

#Config

`.env.sample`파일을 복사하여 `.env`이름으로 새로 저장한다.
```sh
cp .env.sample .env
```

#Develop_env

```env
URL=http://localhost:3000
CDN_URL=
PORT=
API_URL=https://api.github.com //실제로 개발시에는 앞으로 사용 할 api주소를 사용해야한다.
```

포트 번호를 다르게 하고싶다면 URL 쪽 포트도 꼭 같도록 맞추어야 한다.
```env
URL=http://localhost:8809
CDN_URL=
PORT=8809
API_URL=https://api.github.com
```

#Commands

```sh
"scripts": {
    "test": "jest", //테스트코드
    "dev": "nodemon server/index.ts", //개발환경
    "dev:prod": "pm2-dev start ecosystem.config.js", //pm2 개발용 환경
    "build": "next build && tsc --project tsconfig.server.json", // 빌드
    "start": "cross-env NODE_ENV=production node .next/production-server/index.js", // 빌드코드 실행
    "prod": "pm2-runtime start ecosystem.config.js --env production", //pm2 프로덕션 실행
    "deploy": "yarn && pm2 kill && yarn build && pm2 start ecosystem.config.js --env production" // pm2로 배포
  }
```

#Start
`.env`파일에 `PORT`값을 기준으로 서버포트가 열린다. (아무값도 지정하지 않을 경우 :3000)
```sh
yarn dev
open http://localhost:3000
```

#Folder_structure
```bash
├── README.md                 - 리드미 파일
├── tsconfig.test.json        - 테스트 코드용 ts 설정 파일 (tsconfig.json을 확장하여 사용)
├── tsconfig.server.json      - node 서버용 ts 설정 파일 (tsconfig.json을 확장하여 사용)
├── tsconfig.json             - 기본 ts 설정 파일
├── package.json              - npm 패키지 json
├── nodemon.json              - nodemon 명령어용 json
├── next.config.js            - nextjs 설정파일
├── ecosystem.config.js       - pm2 설정파일
├── Dockerfile                - docker 명령어 파일
├── .prettierrc               - 프리티어 코드 포매팅 설정파일
├── .prettierignore           - 코드 포매팅 제외 파일, 폴더 설정
├── .gitignore                - git 제외 설정
├── .env.sample               - .env 환경변수 샘플파일
├── .dockerignore             - 도커 제외 설정
├── .babelrc                  - 바벨 컴파일러 설정
│
├── svgs/                     - svg components
├── styles/                   - style용 함수, 변수들(styled-components 용)
├── store/                    - 리덕스 스토어
├── static/                   - img, font, css 등 static한 파일들
├── server/                   - node 서버영역
├── sagas/                    - 리덕스 사가
├── reducers/                 - 리덕스 리듀서
├── pages/                    - 실제 페이지용 컴포넌트 영역
├── lib/                      - 자체 라이브러리
├── lang/                     - 번역 정보 설정
├── contexts/                 - react context api (테마 컨트롤, 채팅 레이아웃 컨트롤)
├── containers/               - container 컴포넌트 역역
├── constants/                - 상수영역
├── components/               - 컴포넌트 영역
├── client/                   - client 영역
│   └── api/                  - client 용 api
└── actions/                  - 리덕스 actions
```