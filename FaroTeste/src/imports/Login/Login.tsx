import svgPaths from "./svg-z0o60vi5xp";
import imgTechgirls11 from "./8990c52b4b22bad115a57cae66e8de2ea5a82b2d.png";

function Time() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[22px] items-center justify-center min-w-px pt-[1.5px] relative" data-name="Time">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        9:41
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[13px] relative shrink-0 w-[27.328px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.328 13">
        <g id="Frame">
          <rect height="12" id="Border" opacity="0.35" rx="3.8" stroke="var(--stroke-0, black)" width="24" x="0.5" y="0.5" />
          <path d={svgPaths.p7a14d80} fill="var(--fill-0, black)" id="Cap" opacity="0.4" />
          <rect fill="var(--fill-0, black)" height="9" id="Capacity" rx="2.5" width="21" x="2" y="2" />
        </g>
      </svg>
    </div>
  );
}

function Levels() {
  return (
    <div className="flex-[1_0_0] h-[22px] min-w-px relative" data-name="Levels">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[7px] items-center justify-center pr-px pt-px relative size-full">
          <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-name="Cellular Connection">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2 12.2264">
              <path clipRule="evenodd" d={svgPaths.p1e09e400} fill="var(--fill-0, black)" fillRule="evenodd" id="Cellular Connection" />
            </svg>
          </div>
          <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-name="Wifi">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1417 12.3283">
              <path clipRule="evenodd" d={svgPaths.p18b35300} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
            </svg>
          </div>
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[62px] top-[758px]">
      <div className="absolute bg-[#ff8000] h-[47px] left-[62px] rounded-[11px] top-[758px] w-[306px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-[215px] text-[16px] text-center text-white top-[781.5px] w-[92px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Acessar</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[62px] top-[817px]">
      <div className="absolute bg-[#83401e] h-[47px] left-[62px] rounded-[11px] top-[817px] w-[306px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-[215px] text-[16px] text-center text-white top-[840.5px] w-[92px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Criar conta</p>
      </div>
    </div>
  );
}

function MdiPasswordOutline() {
  return (
    <div className="absolute left-[72px] size-[20px] top-[658px]" data-name="mdi:password-outline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="mdi:password-outline">
          <path d={svgPaths.p1585d800} fill="var(--fill-0, #B7B7B7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IcOutlineEmail() {
  return (
    <div className="absolute left-[72px] size-[20px] top-[581px]" data-name="ic:outline-email">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ic:outline-email">
          <path d={svgPaths.p1ba3b80} fill="var(--fill-0, #B7B7B7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-[#ff8000] relative size-full" data-name="Login">
      <div className="absolute bg-white h-[540px] left-0 rounded-[19px] top-[413px] w-[430px]" />
      <div className="absolute h-[321px] left-[36px] top-[88px] w-[357px]" data-name="Techgirls (1) 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[241.12%] left-0 max-w-none top-[-35.83%] w-full" src={imgTechgirls11} />
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[154px] items-center justify-center left-0 pb-[19px] pt-[21px] px-[24px] top-0 w-[430px]" data-name="Status bar - iPhone">
        <Time />
        <Levels />
      </div>
      <div className="absolute bg-white border border-[#c5c3c3] border-solid h-[47px] left-[62px] rounded-[8px] top-[567px] w-[306px]" />
      <div className="absolute bg-white border border-[#c5c3c3] border-solid h-[47px] left-[62px] rounded-[8px] top-[644px] w-[306px]" />
      <p className="[word-break:break-word] absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[normal] left-[62px] text-[#6c3703] text-[14px] top-[546px] w-[46px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Email
      </p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[normal] left-[214.5px] text-[#7d4106] text-[32px] text-center top-[458px] w-[293px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Seja bem vindo(a)!
      </p>
      <p className="[word-break:break-word] absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[normal] left-[62px] text-[#6c3703] text-[14px] top-[624px] w-[54px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Senha
      </p>
      <Group1 />
      <Group />
      <p className="[word-break:break-word] absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] left-[99px] text-[#c2c2c2] text-[12px] top-[661px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Digite sua senha
      </p>
      <p className="[word-break:break-word] absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] left-[99px] text-[#c2c2c2] text-[12px] top-[584px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Digite seu email
      </p>
      <p className="[word-break:break-word] absolute font-['SF_Pro:Light_Italic',sans-serif] font-[276.30999755859375] italic leading-[normal] left-[300px] text-[#ac5804] text-[10px] top-[695px] whitespace-nowrap" style={{ fontVariationSettings: "'YAXS' 400" }}>
        Esqueci senha
      </p>
      <MdiPasswordOutline />
      <IcOutlineEmail />
      <div className="absolute h-0 left-[299px] top-[708px] w-[68px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68 1">
            <line id="Line 4" stroke="var(--stroke-0, #A45302)" strokeLinecap="round" x1="0.5" x2="67.5" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}