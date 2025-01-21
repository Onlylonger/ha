import { useState } from "react";
import { useNavigate } from "react-router-dom";

const list = [
  {
    img: "CPS",
    code: "CPS",
    children: [
      { img: "TKO", code: "TKO" },
      { img: "QEH", code: "QEH" },
    ],
  },
  {
    img: "APS",
    code: "APS",
    children: [
      { img: "TKO", code: "TKO" },
      { img: "QEH", code: "QEH" },
    ],
  },
  {
    img: "CRS",
    code: "CRS",
    children: [
      { img: "TKO", code: "TKO" },
      { img: "QEH", code: "QEH" },
    ],
  },
];

export const LabsList = () => {
  const [lab, setLab] = useState<undefined | string>();
  const navigate = useNavigate();

  const handleChangeHosp = (labCode: string, hospCode: string) => {
    navigate(`/${labCode}/${hospCode}`.toLowerCase());
  };

  return (
    <div className="mx-auto max-w-[1000px] pt-10 px-5">
      <div className="bg-gray-300 h-[100px]"></div>
      <p className="text-center">Welcome to L.... Logoff</p>

      <div className="mt-5 flex gap-5">
        {list.map((v) => {
          return (
            <div className="" key={v.code}>
              <div
                className="w-[100px] h-[100px] bg-slate-200 cursor-pointer"
                onClick={() => setLab(v.code)}
              >
                {v.code}
              </div>
              {lab === v.code && (
                <div className="flex gap-5 p-5">
                  {v.children.map((child) => (
                    <div
                      className="w-[60px] h-[60px] bg-slate-200 cursor-pointer"
                      key={child.code}
                      onClick={() => handleChangeHosp(v.code, child.code)}
                    >
                      {child.code}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
