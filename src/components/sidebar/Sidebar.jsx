import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../common/Common";
// import useMediaQuery from "../hooks/UseMediaQuery";

function SideBar({ setOpen, open }) {
  //   const isDesktop = useMediaQuery("(min-width:640px)");
  const [selectedId, setSelectedId] = useState();
  const location = useLocation();

  useEffect(() => {
    setSelectedId(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div
        style={{
          borderRight: "1px solid  rgba(140, 140, 140, 0.30)",
        }}
        className={`bg-[#fff] text-[#111] relative ${
          open ? "w-[40%] sm:w-[10%]" : "w-[15%] sm:w-[8%] lg:w-[4%]"
        } transition-all ease-in-out duration-300 items-start flex flex-col   [&::-webkit-scrollbar]:hidden  text-[#787878]   overflow-x-auto   flex-shrink-0`}
      >
        <div className="flex items-center justify-start">
          <div
            style={{ background: "rgba(77, 88, 227, 0.10)" }}
            onClick={() => setOpen(!open)}
            className="p-2 m-2  rounded-[100%]   items-start justify-center flex "
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_160_724)">
                  <path
                    d="M20 17.5C20.3852 17.5002 20.7556 17.6486 21.0344 17.9144C21.3132 18.1802 21.479 18.5431 21.4975 18.9279C21.516 19.3127 21.3858 19.6898 21.1338 19.9812C20.8818 20.2726 20.5274 20.4558 20.144 20.493L20 20.5H4C3.61478 20.4998 3.24441 20.3514 2.96561 20.0856C2.68682 19.8198 2.52099 19.4569 2.50248 19.0721C2.48396 18.6873 2.61419 18.3102 2.86618 18.0188C3.11816 17.7274 3.47258 17.5442 3.856 17.507L4 17.5H20ZM20 10.5C20.3978 10.5 20.7794 10.658 21.0607 10.9393C21.342 11.2206 21.5 11.6022 21.5 12C21.5 12.3978 21.342 12.7794 21.0607 13.0607C20.7794 13.342 20.3978 13.5 20 13.5H4C3.60218 13.5 3.22064 13.342 2.93934 13.0607C2.65804 12.7794 2.5 12.3978 2.5 12C2.5 11.6022 2.65804 11.2206 2.93934 10.9393C3.22064 10.658 3.60218 10.5 4 10.5H20ZM20 3.5C20.3978 3.5 20.7794 3.65804 21.0607 3.93934C21.342 4.22064 21.5 4.60218 21.5 5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H4C3.60218 6.5 3.22064 6.34196 2.93934 6.06066C2.65804 5.77936 2.5 5.39782 2.5 5C2.5 4.60218 2.65804 4.22064 2.93934 3.93934C3.22064 3.65804 3.60218 3.5 4 3.5H20Z"
                    fill="#161616"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_160_724">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
          {open && <p className="font-[600]  text-[22px]">Mapup</p>}
        </div>

        <div className="mt-10 w-full">
          {sidebarLinks?.map((item) => (
            <Link
              to={`${item?.link}`}
              style={{
                borderRight: selectedId === item?.link && "3px solid #4D58E3",
                background:
                  selectedId === item?.link && "rgba(77, 88, 227, 0.10)",
              }}
              className={`w-full flex items-center gap-[16px]   mt-4 p-[10px]`}
            >
              {item?.icon}
              {open && (
                <Link to={`${item?.link}`} className="  text-[16px] font-[500]">
                  {item?.name}
                </Link>
              )}
            </Link>
          ))}
        </div>

        {/* <div
          style={{ background: "rgba(77, 88, 227, 0.10)" }}
          onClick={() => setOpen(!open)}
          className="absolute top-0 right-1 lg:right-2 p-3 lg:p-4 rounded-[100%]   items-start justify-center flex "
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_160_724)">
                <path
                  d="M20 17.5C20.3852 17.5002 20.7556 17.6486 21.0344 17.9144C21.3132 18.1802 21.479 18.5431 21.4975 18.9279C21.516 19.3127 21.3858 19.6898 21.1338 19.9812C20.8818 20.2726 20.5274 20.4558 20.144 20.493L20 20.5H4C3.61478 20.4998 3.24441 20.3514 2.96561 20.0856C2.68682 19.8198 2.52099 19.4569 2.50248 19.0721C2.48396 18.6873 2.61419 18.3102 2.86618 18.0188C3.11816 17.7274 3.47258 17.5442 3.856 17.507L4 17.5H20ZM20 10.5C20.3978 10.5 20.7794 10.658 21.0607 10.9393C21.342 11.2206 21.5 11.6022 21.5 12C21.5 12.3978 21.342 12.7794 21.0607 13.0607C20.7794 13.342 20.3978 13.5 20 13.5H4C3.60218 13.5 3.22064 13.342 2.93934 13.0607C2.65804 12.7794 2.5 12.3978 2.5 12C2.5 11.6022 2.65804 11.2206 2.93934 10.9393C3.22064 10.658 3.60218 10.5 4 10.5H20ZM20 3.5C20.3978 3.5 20.7794 3.65804 21.0607 3.93934C21.342 4.22064 21.5 4.60218 21.5 5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H4C3.60218 6.5 3.22064 6.34196 2.93934 6.06066C2.65804 5.77936 2.5 5.39782 2.5 5C2.5 4.60218 2.65804 4.22064 2.93934 3.93934C3.22064 3.65804 3.60218 3.5 4 3.5H20Z"
                  fill="#161616"
                />
              </g>
              <defs >
                <clipPath id="clip0_160_724">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </div> */}
      </div>
    </>
  );
}

export default SideBar;
