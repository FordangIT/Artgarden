# Artgarden
## **배포 URL**: https://artgarden.co.kr/
![image](https://github.com/FordangIT/Artgarden/assets/93567754/6dd6e36d-5d35-4e48-96d0-016e40a577ae)





## 🙉 프로젝트 소개


#### 1.개발 기간
2024.01.01 ~ 진행중

#### 2.기획 의도
디지털화가 가속화된 현대 사회에서, 우리는 더 많은 사람들이 **풍요로운 여가시간을** 누릴 수 있기를 바라는 마음으로 이 프로젝트를 기획했습니다. </br>
**트렌디한 공연, 전시회, 팝업스토어 정보**를 사용자에게 제공함으로써, **사용자가 손쉽게 다양한 문화 정보를 접근하고** 즐길 수 있는 웹 플랫폼을 구현하게 되었습니다.

#### 3.업무 방식 
- **Jira** : 전체 일정 관리 및 진행 상황 공유, 이슈 트래킹 및 우선순위 설정 
- **Discord** : 실시간 커뮤니케이션 및 질문, 정보 공유 및 음성 회의 

## 🙉팀원 소개

|            [이유정 FE](https://github.com/FordangIT)            |           [이창훈 BE](https://github.com/ChangHoon97)            |
| :-------------------------------------------------------------: | :--------------------------------------------------------------: |
|                      fordang0819@gmail.com                      |                       hyo040441@gmail.com                        |
| ![이유정](https://avatars.githubusercontent.com/u/93567754?v=4) | ![이창훈](https://avatars.githubusercontent.com/u/118735836?v=4) |

## 🙉 Stacks
![image](https://github.com/FordangIT/Artgarden/assets/93567754/e7d3e996-3b64-4c3d-aae8-4168993a9ae6)

## 🙉 주요 기능
### [메인 페이지]
| 기능              | 설명                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 반응형 웹 디자인 | 다양한 디바이스에서 원활하게 사용 가능하도록 반응형 웹 디자인을 구현하였습니다                         |
| 목록 상태 관리 | 사용자가 클릭하는 목록의 상태를 redux-toolkit을 이용하여 효율적으로 관리합니다. |


### [로그인 페이지]
| 기능              | 설명                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 인증 시스템 | NextAuth를 사용하여 카카오, 구글 소셜로그인이 가능하도록 구현하였습니다.                            |


### [전체 페이지]
| 기능              | 설명                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 무한스크롤 | 데이터를 끝없이 불러올 수 있도록 react-query의 무한 스크롤 기능을 적용하였습니다.                             |
| 조건 검색 | redux-toolkit을 활용하여 다양한 조건으로 데이터를 검색할 수 있습니다. |
| 실시간 초성 검색 | 사용자가 입력한 초성에 따라 실시간으로 검색 결과를 표시합니다. |

### [상세 페이지]
| 기능              | 설명                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 낙관적 업데이트 | react-query의 낙관적 업데이트(optimistic update) 기능을 이용하여 리뷰를 생성, 읽기, 수정, 삭제할 수 있습니다.   |              

### [찜 페이지]
| 기능              | 설명                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 비로그인 회원 찜 목록 | 세션 스토리지를 통해 찜 목록을 관리해 사용자의 로그인을 유도합니다.               |
| 로그인 회원 찜 목록 | 쿠키를 보냄으로써 백엔드가 유저의 세션 id로 해당 유저의 찜 목록을 관리합니다. |


### [기타]
| 기능              | 설명                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 다양한 렌더링 | 페이지 기능에 따라 서버사이드 렌더링(SSR),정적 사이트 생성(SSG),클라이언트 사이드 렌더링(CSR)를 활용했습니다. |
| API 통합 | 기존에 사용하던 next.js API로 데이터를 가져오는 방식에서, 백엔드 API를 활용하는 방식으로 변경하였습니다. |



