import React from "react";

export const metadata = {
  title: "개인정보처리방침 | 성남시 생활 정보",
  description: "성남시 생활 정보 사이트의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <header className="mb-16">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          개인정보처리방침
        </h1>
        <p className="text-slate-500 text-sm">최종 수정일: 2026년 4월 2일</p>
      </header>

      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. 개인정보의 수집 및 이용 목적</h2>
          <p>
            '성남시 생활 정보'(이하 '사이트')는 이용자들에게 별도의 회원가입 없이 서비스를 제공하고 있으며, 서비스 이용 과정에서 자동으로 생성되는 정보(IP 주소, 쿠키, 방문 기록 등) 외에 개인정보를 수집하지 않습니다. 수집된 자동 생성 정보는 사이트의 이용 통계 분석 및 서비스 개선을 위해서만 사용됩니다.
          </p>
        </section>

        <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. 쿠키(Cookie) 및 제3자 광고 고지 (중요)</h2>
          <p className="mb-4">
            본 사이트는 이용자에게 최적화된 서비스를 제공하고 맞춤형 광고를 게재하기 위해 '쿠키(Cookie)'를 사용합니다. 쿠키란 웹사이트를 운영하는 데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로 이용자의 컴퓨터 하드디스크에 저장됩니다.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Google AdSense 활용:</strong> Google을 포함한 제3자 제공업체는 이용자의 이전 웹사이트 방문 기록을 토대로 광고를 게재하기 위해 쿠키를 사용합니다.</li>
            <li><strong>맞춤형 광고:</strong> Google의 광고 쿠키를 사용함으로써 Google과 파트너 업체는 본 사이트 및 인터넷상의 다른 사이트 방문 기록을 토대로 이용자에게 맞춤형 광고를 제공할 수 있습니다.</li>
            <li><strong>수집 거부 방법:</strong> 이용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google 광고 설정</a>을 방문하여 맞춤설정 광고 게재를 해제할 수 있습니다. 또는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. 제3자에게의 개인정보 제공 및 위탁</h2>
          <p>
            사이트는 이용자의 개인정보를 원칙적으로 외부에 제공하거나 위탁하지 않습니다. 단, 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. 이용자의 권리 및 거부권</h2>
          <p>
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 쿠키의 설치 사용 및 거부권 등에 대해 자유롭게 설정할 수 있습니다. 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">5. 개인정보 보호 문의</h2>
          <p>
            개인정보 보호와 관련하여 궁금한 사항이나 데이터 관련 문의 사항이 있으시면 아래의 연락처로 문의해 주시기 바랍니다.
          </p>
          <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="font-bold text-slate-900">데이터 및 개인정보 문의처</p>
            <p>이메일: <a href="mailto:buzasun@naver.com" className="text-blue-600">buzasun@naver.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
