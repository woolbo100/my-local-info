import React from "react";
import { siteConfig } from "@/data/site";
import DarkOceanShell from "@/components/layout/DarkOceanShell";

export const metadata = {
  title: `개인정보처리방침 | ${siteConfig.name}`,
  description: `${siteConfig.name} 사이트의 개인정보처리방침입니다.`,
};

export default function PrivacyPage() {
  return (
    <DarkOceanShell className="max-w-4xl px-4 py-20 text-slate-100 sm:px-6 lg:px-8">
      <header className="mb-16">
        <h1 className="mb-4 text-3xl font-black text-white md:text-4xl">
          개인정보처리방침
        </h1>
        <p className="text-sm text-slate-300">최종 수정일: 2026년 4월 2일</p>
      </header>

      <div className="space-y-10 leading-relaxed text-slate-200">
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">1. 개인정보의 수집 및 이용 목적</h2>
          <p>
            &apos;{siteConfig.name}&apos;(이하 &apos;사이트&apos;)는 사용자에게 별도의 회원가입 없이 서비스를 제공하고 있으며,
            서비스 이용 과정에서 자동으로 생성되는 정보(IP 주소, 쿠키, 방문 기록 등) 외에 개인정보를 수집하지 않습니다.
            수집된 자동 생성 정보는 사이트 이용 통계 분석과 서비스 개선을 위해서만 사용됩니다.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-700 bg-slate-800/70 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">2. 쿠키(Cookie) 및 제3자 광고 고지</h2>
          <p className="mb-4">
            본 사이트는 사용자에게 최적화된 서비스를 제공하고 맞춤형 광고를 게재하기 위해 쿠키(Cookie)를 사용할 수 있습니다.
            쿠키는 웹사이트를 운영하는 데 이용되는 서버가 사용자의 브라우저에 보내는 작은 텍스트 파일입니다.
          </p>
          <ul className="list-inside list-disc space-y-2 text-slate-200">
            <li>
              <strong>Google AdSense 활용:</strong> Google을 포함한 제3자 제공업체는 이전 방문 기록을 바탕으로 광고를 게재할 수 있습니다.
            </li>
            <li>
              <strong>맞춤형 광고:</strong> Google과 파트너 업체는 본 사이트 및 인터넷상의 다른 사이트 방문 기록을 토대로 맞춤형 광고를 제공할 수 있습니다.
            </li>
            <li>
              <strong>수집 거부 방법:</strong> 사용자는{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline"
              >
                Google 광고 설정
              </a>
              에서 맞춤형 광고를 해제하거나 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">3. 제3자 제공 및 위탁</h2>
          <p>
            사이트는 이용자의 개인정보를 별도로 제공하거나 위탁하지 않습니다. 다만 관련 법령에 따라 공공기관 또는 수사기관이 적법한 절차로 요청하는 경우에는 예외가 있을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">4. 이용자의 권리</h2>
          <p>
            이용자는 브라우저 설정을 통해 쿠키 저장을 허용하거나 차단할 수 있으며, 저장된 쿠키를 삭제할 수도 있습니다. 다만 쿠키 사용을 제한할 경우 일부 서비스 이용에 불편이 발생할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">5. 문의처</h2>
          <p>
            개인정보 보호 또는 데이터 관련 문의가 있으시면 아래 이메일로 연락해주세요.
          </p>
          <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-800/70 p-6">
            <p className="font-bold text-white">개인정보 문의</p>
            <p className="text-slate-200">
              이메일{" "}
              <a href="mailto:buzasun@naver.com" className="text-blue-300 hover:underline">
                buzasun@naver.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </DarkOceanShell>
  );
}
