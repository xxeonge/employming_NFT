## How to run

1. `.env` 생성 후 환경변수 설정

```
PRIVATE_KEY=<Test Facet이 들어있는 개인키>
EMPLOYMINT_FACTORY=<Employmint Contract을 배포한 주소> e.g. Sepolia Testnet에 배포한 컨트랙 주소
PORT=8080
RPC_ENDPOINT=<Infura/Alchemy 등에서 발급받은 API Endpoint URL> e.g. Sepolia Testnet에 연결된 API Endpoint
```

2. 서버실행

```
npm start
```

3. 테스트

```
https://localhost:8080/api/v1/sbt 에 POST request 전송
```
