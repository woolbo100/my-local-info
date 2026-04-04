import React from "react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `이용약관 | ${siteConfig.name}`,
  description: `${siteConfig.name} 사이트의 이용약관입니다.`,
};

export default function TermsPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-100">
      <header className="mb-16">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          이용약관
        </h1>
        <p className="text-slate-300 text-sm">최종 수정일: 2026년 4월 2일</p>
      </header>

      <div className="space-y-10 text-slate-200 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">제1조 (목적)</h2>
          <p>
            본 약관은 &apos;부산시 생활 정보&apos;(이하 &apos;사이트&apos;)가 제공하는 제반 서비스의 이용 조건 및 절차,
            이용자와 사이트 운영자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">제2조 (공공데이터의 활용)</h2>
          <p>
            사이트는 대한민국 정부의 공공데이터포털(data.go.kr) 및 부산시 관련 공개 자료를 기반으로 정보를 수집, 가공, 제공하고 있습니다.
            사이트에서 제공하는 모든 정보의 원저작권 및 최종 권한은 해당 공공기관 또는 원저작자에게 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">제3조 (서비스 이용 및 책임의 한계)</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-200">
            <li>사이트는 이용자에게 양질의 정보를 제공하기 위해 노력하지만, 정보의 정확성, 완전성, 적시성을 절대적으로 보장하지는 않습니다.</li>
            <li>사이트에서 제공하는 정보는 데이터 제공 시점에 따라 실제와 차이가 있을 수 있으며, 이를 이용해 발생한 손해에 대해 운영자는 책임을 지지 않습니다.</li>
            <li>중요한 일정이나 신청이 필요한 경우 반드시 게시글 하단의 원문 링크 또는 공식 홈페이지를 통해 최종 내용을 다시 확인하시기 바랍니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">제4조 (콘텐츠의 저작권)</h2>
          <p>
            사이트에 게시된 텍스트, 이미지, 로고 및 기타 콘텐츠에 대한 권리는 사이트 또는 정당한 권리자에게 있습니다.
            이용자는 운영자의 사전 허가 없이 이를 상업적 목적으로 복제, 배포, 전송, 게시할 수 없습니다.
          </p>
        </section>

        <section className="bg-slate-800/90 p-8 rounded-3xl border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">제5조 (면책 조항)</h2>
          <p className="text-slate-200">
            천재지변, 시스템 장애, 통신망 문제 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 운영자는 책임을 지지 않습니다.
            또한 이용자의 귀책사유로 인한 서비스 이용 장애에 대해서도 운영자는 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">제6조 (문의)</h2>
          <p>
            서비스 이용약관 또는 데이터 관련 문의 사항은 아래 이메일로 연락해 주세요.
          </p>
          <p className="mt-4 font-bold text-white">
            이메일:{" "}
            <a href="mailto:buzasun@naver.com" className="text-blue-300 hover:underline">
              buzasun@naver.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
