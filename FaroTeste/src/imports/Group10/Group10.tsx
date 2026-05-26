import svgPaths from "./svg-5vln1m7524";

function Group() {
  return (
    <div className="h-[281.67px] relative w-[170.416px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 170.416 281.67">
        <g id="Group">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p3ce33100} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p3a00100} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Pet4Layerstyle() {
  return (
    <div className="absolute contents h-[301.387px] left-[596px] top-0 w-[205.497px]" data-name="Pet 4_layerstyle">
      <div className="absolute flex h-[301.387px] items-center justify-center left-[596px] top-0 w-[205.497px]">
        <div className="flex-none rotate-[-7.45deg]">
          <Group />
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[541px] top-0">
      <div className="absolute h-[197.784px] left-[541px] top-[163px] w-[168.53px]" data-name="Subtract">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 168.53 197.784">
          <path clipRule="evenodd" d={svgPaths.p20ea5700} fill="var(--fill-0, white)" fillRule="evenodd" id="Subtract" />
        </svg>
      </div>
      <Pet4Layerstyle />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[120.021px] left-0 top-[80px] w-[319.222px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 319.222 120.021">
        <g id="Group">
          <path d={svgPaths.pb666180} fill="var(--fill-0, #FF8000)" id="Vector" />
          <g id="Vector_2">
            <path d={svgPaths.p17d5f560} fill="var(--fill-0, #FF8000)" />
            <path d={svgPaths.p19b2e380} fill="var(--fill-0, #FF8000)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Pet1Layerstyle() {
  return (
    <div className="absolute contents left-0 top-[80px]" data-name="Pet 1_layerstyle">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-[80px]">
      <Pet1Layerstyle />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-[80px]">
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-[80px]">
      <Group3 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute h-[255.7px] left-[83px] top-[97.24px] w-[155.051px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155.051 255.7">
        <g id="Group 3">
          <path d={svgPaths.p119bc700} fill="var(--fill-0, #FF8000)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[83px] top-[97.24px]">
      <Group10 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[83px] top-[97.24px]">
      <Group8 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-[80px]">
      <Group4 />
      <Group7 />
    </div>
  );
}

export default function Group9() {
  return (
    <div className="relative size-full">
      <Group6 />
      <div className="absolute flex h-[193.561px] items-center justify-center left-[225.35px] top-[161.98px] w-[188.5px]">
        <div className="flex-none rotate-[1.7deg]">
          <div className="h-[188.217px] relative w-[183px]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 183 188.217">
              <path clipRule="evenodd" d={svgPaths.p21c02a00} fill="var(--fill-0, white)" fillRule="evenodd" id="Subtract" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute h-[190.5px] left-[414px] top-[162px] w-[146.204px]" data-name="Subtract">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 146.204 190.5">
          <path clipRule="evenodd" d={svgPaths.p2ea41300} fill="var(--fill-0, white)" fillRule="evenodd" id="Subtract" />
        </svg>
      </div>
      <Group5 />
    </div>
  );
}