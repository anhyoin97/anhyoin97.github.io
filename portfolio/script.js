const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");

function setNavOpen(isOpen) {
  if (!nav || !toggle) return;
  nav.dataset.open = String(isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.dataset.open === "true";
    setNavOpen(!isOpen);
  });

  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement && target.getAttribute("href")?.startsWith("#")) {
      setNavOpen(false);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });
}

// Header shadow on scroll (subtle)
if (header) {
  const setHeaderOffset = () => {
    const h = header.offsetHeight || 0;
    // add a small buffer so section titles never tuck under header
    document.documentElement.style.setProperty("--header-offset", `${h + 12}px`);
  };

  const onScroll = () => {
    const y = window.scrollY || 0;
    header.style.boxShadow = y > 8 ? "0 10px 35px rgba(0,0,0,.35)" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", setHeaderOffset, { passive: true });
  setHeaderOffset();
  onScroll();
}

// Current year
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Scroll reveal (subtle)
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

// Brand text rotate (HYOIN ↔ PORTFOLIO)
const rotateEl = document.querySelector("[data-rotate-text]");
const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
if (rotateEl && !reduceMotion) {
  const raw = rotateEl.getAttribute("data-rotate-values") || "";
  const values = raw.split("|").map((v) => v.trim()).filter(Boolean);
  if (values.length >= 2) {
    let idx = values.indexOf(rotateEl.textContent?.trim() || "");
    if (idx < 0) idx = 0;

    window.setInterval(() => {
      rotateEl.classList.add("is-swapping");
      window.setTimeout(() => {
        idx = (idx + 1) % values.length;
        rotateEl.textContent = values[idx];
        rotateEl.classList.remove("is-swapping");
      }, 180);
    }, 2000);
  }
}

const projectCards = document.querySelectorAll(".project");
const projectModal = document.querySelector("[data-project-modal]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalContent = document.querySelector("[data-project-modal-content]");
const projectModalCloseTriggers = document.querySelectorAll("[data-project-modal-close]");

// Achievement image modal
const achievementCards = document.querySelectorAll(".achievement");
const imageModal = document.querySelector("[data-image-modal]");
const imageModalImg = document.querySelector("[data-image-modal-img]");
const imageModalCloseTriggers = document.querySelectorAll("[data-image-modal-close]");

const updateBodyScrollLock = () => {
  const projectOpen = projectModal && !projectModal.hidden;
  const imageOpen = imageModal && !imageModal.hidden;
  document.body.style.overflow = projectOpen || imageOpen ? "hidden" : "";
};

const projectDetails = {
  iot: {
    title: "아파트 IoT 통합시스템 구축",
    html: `
      <div class="project-detail">
        <article class="project-detail-intro">
          <p class="project-detail-intro-title">INTRO.</p>
          <p>
            이종 플랫폼 간 데이터 동기화를 기반으로, 아파트 관리 서비스의 전입·전출·인증 프로세스를 자동화한 프로젝트입니다.
            사용자가 여러 시스템을 오가지 않아도 핵심 기능을 한 곳에서 처리할 수 있도록 인터페이스를 구성했습니다.
          </p>
        </article>

        <section class="project-detail-section">
          <h4>⏱ 개발 기간</h4>
          <p class="project-detail-quote">2025.06.30 ~ 2026.01.09</p>
        </section>

        <section class="project-detail-section">
          <h4>👥 구성원</h4>
          <p class="project-detail-quote">2명 (풀스택 개발)</p>
        </section>

        <section class="project-detail-section">
          <h4>📌 기여도</h4>
          <div class="project-detail-chips">
            <span>개발 80%</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>🛠 사용된 기술 스택</h4>
          <div class="project-detail-badges">
            <span>C#</span>
            <span>MS-SQL</span>
            <span>JavaScript</span>
            <span>Vue.js</span>
            <span>.NET 8.0</span>
            <span>Microsoft Azure</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>주요 개발 및 기여</h4>
          <ul>
            <li><strong>공통 API 및 WebView 개발:</strong> 앱 이동 없이 출입증 발급과 세대원 관리를 처리하도록 인터페이스 구축</li>
            <li><strong>XpERP ↔ GAYO 실시간 동기화:</strong> 전입·전출 데이터가 한 번의 등록으로 양 시스템에 반영되도록 동기화 로직 설계</li>
            <li><strong>인증 자동화 설계:</strong> ERP 등록 정보를 활용한 무인증 가입 프로세스 구성</li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>진행 중 이슈 및 해결</h4>
          <ul>
            <li><strong>건물 식별 데이터 불일치:</strong> XpERP, 아파트아이, GAYO의 코드 체계가 달라 대규모 단지 데이터 동기화가 어려움
              <ul class="project-detail-replies">
                <li><strong>해결</strong> 사업자등록번호를 기준 키로 매핑 테이블을 설계해 약 4,000개 단지 데이터를 자동 매핑</li>
              </ul>
            </li>
            <li><strong>전출 처리 중복 업무:</strong> 전출 처리 시 양 시스템에 각각 작업해야 해 운영 부담과 데이터 불일치가 발생
              <ul class="project-detail-replies">
                <li><strong>해결</strong> 실시간 전출 API를 구현해 한 번의 처리로 두 시스템이 동시에 업데이트되도록 자동화</li>
              </ul>
            </li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>결과 및 성과</h4>
          <ul>
            <li>전입 승인부터 전출 처리까지 자동화해 관리소 수작업을 크게 절감</li>
            <li>코드 체계가 다른 외부 시스템 간 데이터 정합성을 확보해 연동 안정성 향상</li>
          </ul>
        </section>
      </div>
    `,
  },
  "clinical-app": {
    title: "순천향대학교 중앙의료원 임상연구협력단 APP 구축",
    html: `
      <div class="project-detail">
        <article class="project-detail-intro">
          <p class="project-detail-intro-title">INTRO.</p>
          <p>
            의료진 교육 서비스를 효율적으로 관리하고 운영할 수 있도록,
            React Native 기반의 모바일 앱과 백엔드 API를 함께 구축한 프로젝트입니다.
          </p>
        </article>

        <section class="project-detail-section">
          <h4>⏱ 개발 기간</h4>
          <p class="project-detail-quote">2022.09.01 ~ 2023.01.31</p>
        </section>

        <section class="project-detail-section">
          <h4>👥 구성원</h4>
          <p class="project-detail-quote">2명 (백엔드 개발 / iOS 담당)</p>
        </section>

        <section class="project-detail-section">
          <h4>📌 기여도</h4>
          <div class="project-detail-chips">
            <span>개발 50%</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>🛠 사용된 기술 스택</h4>
          <div class="project-detail-badges">
            <span>JavaScript</span>
            <span>React Native</span>
            <span>Java</span>
            <span>Spring</span>
            <span>Oracle</span>
            <span>Objective-C</span>
            <span>Xcode</span>
            <span>Android Studio</span>
            <span>FCM</span>
            <span>Node.js</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>주요 개발 및 기여</h4>
          <ul>
            <li><strong>크로스플랫폼 앱 개발:</strong> React Native 기반으로 Android/iOS 앱을 동시 개발</li>
            <li><strong>백엔드 API 구축:</strong> 앱 전반의 백엔드 프로세스를 설계하고 API를 개발</li>
            <li><strong>iOS 네이티브 대응:</strong> Objective-C 기반 개발 및 앱 등록/배포까지 수행</li>
            <li><strong>핵심 기능 구현:</strong> 생체인증, PDF 다운로드, 결제 기능 적용</li>
            <li><strong>운영 고도화:</strong> iOS/Android CodePush 구축 및 사용자별 FCM 푸시알림 개발</li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>진행 중 이슈 및 해결</h4>
          <ul>
            <li><strong>iOS 개발 리소스 부족:</strong> 내부 iOS 개발자 부재로 개발부터 배포까지 직접 학습하며 병행
              <ul class="project-detail-replies">
                <li><strong>해결</strong> iOS 네이티브 개발/배포 프로세스를 내재화해 프로젝트 일정 내 안정적으로 런칭</li>
              </ul>
            </li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>결과 및 성과</h4>
          <ul>
            <li>Android/iOS 앱 동시 구축 완료</li>
            <li>iOS 개발/배포 미경험 상태를 극복하고 운영 가능한 배포 체계 확립</li>
            <li>CodePush 적용으로 스토어 심사 없이 신속한 기능 배포 가능</li>
            <li>관리자 페이지에서 그룹/사용자 단위 푸시알림 운영으로 업무 효율 향상</li>
          </ul>
        </section>
      </div>
    `,
  },
  "placeholder-a": {
    title: "iM뱅크 개인채무자보호법 시행령에 따른 내부기준 제정",
    html: `
      <div class="project-detail">
        <article class="project-detail-intro">
          <p class="project-detail-intro-title">INTRO.</p>
          <p>
            개인채무자보호법 시행령 대응을 위해 iM뱅크 여신사후관리시스템의 내부 기준을 제정하고,
            채권추심 제한/유예 및 대외기관 연계 기능을 안정적으로 운영할 수 있도록 시스템을 개편한 프로젝트입니다.
          </p>
        </article>

        <section class="project-detail-section">
          <h4>⏱ 개발 기간</h4>
          <p class="project-detail-quote">2024.06.03 ~ 2025.01.10</p>
        </section>

        <section class="project-detail-section">
          <h4>👥 구성원</h4>
          <p class="project-detail-quote">3명 (풀스택 개발)</p>
        </section>

        <section class="project-detail-section">
          <h4>📌 기여도</h4>
          <div class="project-detail-chips">
            <span>개발 30%</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>🛠 사용된 기술 스택</h4>
          <div class="project-detail-badges">
            <span>Java 1.8</span>
            <span>Spring</span>
            <span>WebSquare</span>
            <span>JavaScript</span>
            <span>Oracle</span>
            <span>Rexpert 3.0</span>
            <span>JEUS 6.0</span>
            <span>Linux</span>
            <span>SVN</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>주요 개발 및 기여</h4>
          <ul>
            <li>당행 ↔ 한국신용정보원 채권자변동정보 전송/응답 배치 프로그램 개발</li>
            <li>채권추심 제한 및 유예 관리 기능 개발</li>
            <li>채권추심예정차주 전자고지 자동화 구현</li>
            <li>전자통지(SMS, Email, 전자우편) 기능 개발</li>
            <li>iM뱅크 인터넷뱅킹 연동 실시간 채무자 정보 조회 API 설계/개발</li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>진행 중 이슈 및 해결</h4>
          <ul>
            <li><strong>채권자변동정보 배치 부하:</strong> 영업일 기준 약 100,000건 처리로 약 10시간 소요되는 병목 발생
              <ul class="project-detail-replies">
                <li><strong>해결</strong> 전문 열기/쓰기와 DB 호출 구간을 Handler 기반 비동기 호출로 전환하고 Auto Commit을 적용해 트랜잭션 부하를 감소</li>
              </ul>
            </li>
            <li><strong>추심제한 데이터 구조 한계:</strong> 기존 단일 제한 구조에서 복수 제한 등록이 가능한 신규 테이블 구조로 재설계</li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>결과 및 성과</h4>
          <ul>
            <li>채권자변동정보 전송 배치 속도 90% 개선 (약 10시간 → 1시간 이내)</li>
            <li>채권추심 제한/유예 관리 기능을 시스템 내부에 안정적으로 구축</li>
            <li>전자고지 자동화로 수작업 오류를 줄이고 사전 안내를 통해 민원 예방에 기여</li>
            <li>실시간 조회 API 구축으로 인터넷뱅킹에서 고객이 직접 채무 정보 확인 가능</li>
          </ul>
        </section>
      </div>
    `,
  },
  "placeholder-c": {
    title: "순천향대학병원 내시경 PACS 고도화",
    html: `
      <div class="project-detail">
        <article class="project-detail-intro">
          <p class="project-detail-intro-title">INTRO.</p>
          <p>
            내시경 PACS 시스템의 실시간 영상 처리 성능을 높이고, 의료진이 실제 업무에서 더 빠르고 안정적으로 사용할 수 있도록
            조회 성능과 UI/UX를 함께 개선한 프로젝트입니다.
          </p>
        </article>

        <section class="project-detail-section">
          <h4>⏱ 개발 기간</h4>
          <p class="project-detail-quote">2023.02.01 ~ 2023.08.11</p>
        </section>

        <section class="project-detail-section">
          <h4>👥 구성원</h4>
          <p class="project-detail-quote">2명 (풀스택 개발)</p>
        </section>

        <section class="project-detail-section">
          <h4>📌 기여도</h4>
          <div class="project-detail-chips">
            <span>개발 50%</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>🛠 사용된 기술 스택</h4>
          <div class="project-detail-badges">
            <span>C#</span>
            <span>DevExpress</span>
            <span>WPF</span>
            <span>OpenCV</span>
            <span>Oracle</span>
            <span>SQLite</span>
            <span>.NET 4.7</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>주요 개발 및 기여</h4>
          <ul>
            <li><strong>Worklist 조회 성능 개선:</strong> 대용량 영상목록 검색/조회 구간에 인덱스 최적화와 파티셔닝을 적용</li>
            <li><strong>조회 방식 개선:</strong> 전체 조회 방식에서 비동기 페이징 방식으로 전환해 응답 속도 향상</li>
            <li><strong>실시간 녹화/캡처 안정화:</strong> 비정상 종료 이슈를 해결하고 메모리 관리 로직 개선</li>
            <li><strong>WPF UI 최적화:</strong> DevExpress 기반 UI 개선 및 MVVM 패턴 적용으로 화면/서비스 로직 분리</li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>진행 중 이슈 및 해결</h4>
          <ul>
            <li><strong>의료진별 UI 요구사항 상이:</strong> 사용자마다 선호하는 화면 구성이 달라 공통 UI만으로 만족도 확보가 어려움
              <ul class="project-detail-replies">
                <li><strong>해결</strong> SQLite 로컬 DB를 활용한 사용자 맞춤 UI 설정 기능을 구현해 커스터마이징 가능하도록 개선</li>
              </ul>
            </li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>결과 및 성과</h4>
          <ul>
            <li>Worklist 대용량 영상목록 조회 체감시간 50% 개선</li>
            <li>실시간 녹화/캡처 안정성 확보 및 실제 메모리 사용량 40% 절감</li>
            <li>UI 커스터마이징 기능 제공으로 사용자 만족도 향상</li>
            <li>MVVM 적용으로 유지보수성과 확장성 향상</li>
          </ul>
        </section>
      </div>
    `,
  },
  "recruitment-system": {
    title: "순천향대학병원 통합채용관리시스템 구축",
    html: `
      <div class="project-detail">
        <article class="project-detail-intro">
          <p class="project-detail-intro-title">INTRO.</p>
          <p>
            중앙의료원 산하병원(서울, 부천, 천안, 구미)의 채용 공고, 지원자 관리, 평가, 인사 발령 프로세스를
            하나의 시스템으로 통합해 운영 효율을 높인 프로젝트입니다.
          </p>
        </article>

        <section class="project-detail-section">
          <h4>⏱ 개발 기간</h4>
          <p class="project-detail-quote">2022.05.23 ~ 2022.11.30</p>
        </section>

        <section class="project-detail-section">
          <h4>👥 구성원</h4>
          <p class="project-detail-quote">3명 (풀스택 개발)</p>
        </section>

        <section class="project-detail-section">
          <h4>📌 기여도</h4>
          <div class="project-detail-chips">
            <span>개발 50%</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>🛠 사용된 기술 스택</h4>
          <div class="project-detail-badges">
            <span>Java</span>
            <span>JSP</span>
            <span>Spring</span>
            <span>JavaScript</span>
            <span>MS-SQL</span>
            <span>Apache</span>
            <span>Tomcat</span>
            <span>NginX</span>
            <span>SVN</span>
            <span>Jenkins</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>주요 개발 및 기여</h4>
          <ul>
            <li><strong>채용관리 전체 프로세스 개발:</strong> 서류 접수부터 서류 평가까지 채용 단계 전반 구현</li>
            <li><strong>대용량 트래픽 대응:</strong> 발표일 동시 접속 환경을 고려한 서버 구성 및 성능 최적화</li>
            <li><strong>ERP 인사 연동 개발:</strong> 최종합격자 정보를 ERP 인사시스템으로 자동 전송하는 배치 프로그램 구현</li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>진행 중 이슈 및 해결</h4>
          <ul>
            <li><strong>동시 접속 폭증으로 웹 서버 다운:</strong> 첫 대규모 서류전형 발표일에 트래픽 급증으로 서비스 장애 발생
              <ul class="project-detail-replies">
                <li><strong>해결</strong> Apache에서 NginX 중심 구조로 전환하고 정적 파일 캐시를 적용해 서버 부하를 크게 완화</li>
              </ul>
            </li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>결과 및 성과</h4>
          <ul>
            <li>채용공고부터 인사 발령까지 전 과정 시스템화로 업무 효율 향상 및 수작업 오류 감소</li>
            <li>지원자 홈페이지 동시 접속자 1,800명 처리 (기존 300명 대비 600% 개선)</li>
            <li>인사발령 자동화로 100명 기준 약 5시간 소요되던 수작업 업무를 제거</li>
          </ul>
        </section>
      </div>
    `,
  },
  "broadcast-upgrade": {
    title: "신한카드·신한투자증권 사내방송시스템 고도화",
    html: `
      <div class="project-detail">
        <article class="project-detail-intro">
          <p class="project-detail-intro-title">INTRO.</p>
          <p>
            Internet Explorer 종료 이슈에 대응해 사내방송시스템을 마이그레이션하고,
            사용자 중심 UI/UX 개선을 통해 방송 운영 효율을 높인 프로젝트입니다.
          </p>
        </article>

        <section class="project-detail-section">
          <h4>⏱ 개발 기간</h4>
          <p class="project-detail-quote">2021.05.03 ~ 2022.03.04</p>
        </section>

        <section class="project-detail-section">
          <h4>👥 구성원</h4>
          <p class="project-detail-quote">4명 (프론트엔드 개발)</p>
        </section>

        <section class="project-detail-section">
          <h4>📌 기여도</h4>
          <div class="project-detail-chips">
            <span>개발 20%</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>🛠 사용된 기술 스택</h4>
          <div class="project-detail-badges">
            <span>C#</span>
            <span>.NET</span>
            <span>ASP.NET</span>
            <span>JavaScript</span>
            <span>jQuery</span>
            <span>MS-SQL</span>
            <span>WebForm</span>
            <span>IIS</span>
          </div>
        </section>

        <section class="project-detail-section">
          <h4>주요 개발 및 기여</h4>
          <ul>
            <li><strong>프레임워크 전환:</strong> Silverlight 기반 화면을 ASP.NET(WebForm)으로 마이그레이션</li>
            <li><strong>방송 제어 화면 개발:</strong> 지점/층/공간별 특정 장소 방송 컨트롤 기능 구현</li>
            <li><strong>방송 예약 기능 개발:</strong> 송출 화면, 음향, 송출 장소를 설정하는 예약 기능 구현</li>
            <li><strong>실시간 대화 화면 개발:</strong> 사내방송 클라이언트(Viewer) 내 운영 커뮤니케이션 화면 구현</li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>진행 중 이슈 및 해결</h4>
          <ul>
            <li><strong>IE 종속 구조 한계:</strong> 브라우저 정책 변화로 기존 Silverlight 환경 유지가 어려운 상황
              <ul class="project-detail-replies">
                <li><strong>해결</strong> ASP.NET 기반으로 화면/기능을 재구성해 브라우저 호환성과 유지보수성을 확보</li>
              </ul>
            </li>
          </ul>
        </section>

        <section class="project-detail-section">
          <h4>결과 및 성과</h4>
          <ul>
            <li>IE 종속 환경을 제거하고 브라우저 호환성 확보</li>
            <li>장소별 방송 송출 기능으로 운영 유연성 향상</li>
            <li>방송 예약 자동화로 반복 업무 부담 감소</li>
            <li>실시간 대화 기능 도입으로 운영 커뮤니케이션 효율 증가</li>
          </ul>
        </section>
      </div>
    `,
  },
};

const openProjectModal = (projectKey) => {
  if (!projectModal || !projectModalTitle || !projectModalContent) return;
  const detail = projectDetails[projectKey];
  if (!detail) return;
  projectModalTitle.textContent = detail.title;
  projectModalContent.innerHTML = detail.html;
  projectModal.hidden = false;
  updateBodyScrollLock();
};

const closeProjectModal = () => {
  if (!projectModal || !projectModalContent) return;
  projectModal.hidden = true;
  projectModalContent.innerHTML = "";
  updateBodyScrollLock();
};

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectKey = card.getAttribute("data-project-key");
    if (!projectKey) return;
    openProjectModal(projectKey);
  });
});

projectModalCloseTriggers.forEach((el) => {
  el.addEventListener("click", closeProjectModal);
});

const openImageModal = (src, alt) => {
  if (!imageModal || !imageModalImg || !src) return;
  imageModalImg.src = src;
  imageModalImg.alt = alt || "수상 및 자격증 이미지";
  imageModal.hidden = false;
  updateBodyScrollLock();
};

const closeImageModal = () => {
  if (!imageModal || !imageModalImg) return;
  imageModal.hidden = true;
  imageModalImg.src = "";
  imageModalImg.alt = "";
  updateBodyScrollLock();
};

achievementCards.forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector(".achievement-img");
    if (!img) return;
    openImageModal(img.getAttribute("src"), img.getAttribute("alt"));
  });
});

imageModalCloseTriggers.forEach((el) => {
  el.addEventListener("click", closeImageModal);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (projectModal && !projectModal.hidden) closeProjectModal();
    if (imageModal && !imageModal.hidden) closeImageModal();
  }
});

