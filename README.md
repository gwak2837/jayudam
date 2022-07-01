# 자유담

자유담 백엔드에서 데이터를 받아 웹 페이지에 사용자가 알아보기 쉽게 표시해주는 웹 서버

## 💻 Requirements

- macOS 12.4 (or Windows 10 Edu 21H2 with minor errors)
- [Node.js](https://nodejs.org/en/) 16.14
- [Yarn](https://yarnpkg.com/getting-started/install#install-corepack) 3.2
- [Git](https://git-scm.com/download) 2.36
- [Docker](https://www.docker.com/products/docker-desktop/) 20.10
- Docker compose 2.6
- [PostgreSQL](https://www.postgresql.org/download/) 14.3
- [Redis](https://redis.io/download/) 7.0

## ☁ Cloud

- [Vercel](https://vercel.com)

## 📦 Installation

### Download codes

프로젝트 소스코드를 다운로드 받고 의존 패키지를 설치합니다.

```
git clone https://github.com/rmfpdlxmtidl/jayudam.git
cd jayudam
yarn
```

### Start Node.js server

Node.js 웹 서버를 실행하는 방법은 아래와 같이 3가지 있습니다.

1. Next.js 웹 서버를 [개발 모드](https://nextjs.org/docs/api-reference/cli#development)로 실행합니다.

```
yarn dev
```

2.  Next.js 웹 서버를 [배포 모드](https://nextjs.org/docs/api-reference/cli#production)로 실행합니다.

```
yarn build && yarn start
```

### CI/CD

GitHub에 push 할 때마다 자동으로 `Vercel`에서 코드를 빌드해서 새로운 버전의 웹 서버를 재실행합니다.

## 개발 가이드

1. .graphql 파일을 생성합니다.
   (src/graphql/queries/Posts.graphql)

2. yarn generate 를 실행합니다.

3. 타입과 함께 자동 생성된 hook을 불러옵니다. (usePostsQuery)

1, 2, 3을 반복합니다.

## ⚙️ Configuration

#### Next.js

https://nextjs.org/docs/getting-started#automatic-setup

#### ESLint
