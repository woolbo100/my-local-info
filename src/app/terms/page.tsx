import React from "react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `이용약관 | ${siteConfig.name}`,
  description: `${siteConfig.name} 사이트의 이용약관입니다.`,
};

export default function TermsPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <header className="mb-16">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          이용약관
        </h1>
        <p className="text-slate-500 text-sm">최종 수정일: 2026년 4월 2일</p>
      </header>

      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제1조 (목적)</h2>
          <p>
            '${siteConfig.name}'(이하 '사이트')가 제공하는 제반 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제2조 (공공데이터의 활용)</h2>
          <p>
            사이트는 대한민국 정부의 공공데이터포털(data.go.kr)에서 공개하는 공공데이터를 기반으로 정보를 수집하여 가공·제공하고 있습니다. 사이트에서 제공하는 모든 정보의 권한은 원칙적으로 해당 공공기관 및 원작자에게 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제3조 (서비스 이용 및 책임의 한계)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>사이트는 이용자에게 양질의 정보를 제공하기 위해 노력하지만, 정보의 정확성, 완전성, 신뢰성 또는 특정 목적에 대한 적합성을 보장하지 않습니다.</li>
            <li>사이트에서 제공하는 정보는 데이터 제공 시점에 따라 실제와 차이가 있을 수 있으며, 정보의 이용으로 인해 발생하는 모든 손해에 대해 사이트 운영자는 책임을 지지 않습니다.</li>
            <li>중요한 일정이나 신청이 필요한 경우 반드시 글 하단에 명시된 원문 링크(공식 홈페이지)를 통해 정확한 내용을 재확인하시기 바랍니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제4조 (콘텐츠 저작권)</h2>
          <p>
            사이트에서 가공하여 제공하는 텍스트, 이미지, 로고 등의 콘텐츠에 대한 지식재산권은 사이트 및 관련 권리자에게 있습니다. 이용자는 사이트의 사전 서면 승인 없이 서비스 내의 정보를 상업적인 목적으로 복제, 배포, 전시하거나 제3자에게 이용하게 해서는 안 됩니다.
          </p>
        </section>

        <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">제5조 (면책 조항)</h2>
          <p className="text-sm">
            운영자는 천재지변, 전시, 정전, 서비스 설비의 장애 또는 통신망의 장애 등 불가항력적인 상황으로 인해 서비스를 제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다. 또한, 운영자는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제6조 (문의 및 관련 메일)</h2>
          <p>
            서비스 이용 약관에 대한 문의 및 데이터 관련 요청 사항은 아래 이메일로 연락 주시기 바랍니다.
          </p>
          <p className="mt-4 font-bold text-slate-900">
            이메일: <a href="mailto:buzasun@naver.com" className="text-blue-600 hover:underline">buzasun@naver.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
