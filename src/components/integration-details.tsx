import Image from "next/image";
import type { Integration } from "@/features/integrations/types";

export function PlatformMetadata({ integration }: { integration: Integration }) {
  return (
    <div className="flex shrink-0 items-center gap-3 p-4 sm:gap-4 sm:p-5">
      <Image src={integration.image.src} alt={integration.image.alt} width={96} height={80} className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 bg-white object-contain sm:h-20 sm:w-24" />
      <dl className="grid min-w-0 flex-1 gap-2 text-sm [overflow-wrap:anywhere]">
        <div className="rounded-md border border-[#3165ff] px-3 py-2"><dt className="inline text-slate-500">Platform: </dt><dd className="inline font-medium text-slate-950">{integration.platform}</dd></div>
        <div className="rounded-md border border-[#3165ff] px-3 py-2"><dt className="inline text-slate-500">Category: </dt><dd className="inline font-medium text-slate-950">{integration.category}</dd></div>
      </dl>
    </div>
  );
}

export function IntegrationDescriptions({ integration }: { integration: Integration }) {
  return integration.integrations.map(item => (
    <div key={item.id} className="rounded-lg bg-[#f2f4f8] p-4 sm:p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#0739cf]">Integrations</p>
      <h3 className="text-xl font-semibold tracking-tight text-slate-950">{item.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 [overflow-wrap:anywhere]">{item.description}</p>
    </div>
  ));
}
