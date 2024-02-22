"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoAlert, IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

export default function Toast({ type, message, redirectUrl}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [headerText, setHeaderText] = useState("success");

  // Set header text based on type
  useState(() => {
    switch (type) {
      case "success":
        setHeaderText("Success");
        break;
      case "warning":
        setHeaderText("Warning");
        break;
      case "error":
        setHeaderText("Error");
        break;
      default:
        setHeaderText("Success");
    }
  }, [type]);

  // Close the modal after 5 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
      if(redirectUrl) {
        router.push(redirectUrl);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center rounded-[50px] flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col w-[450px] bg-white outline-none focus:outline-none">
                {/*header*/}

                <div className="flex flex-col mx-auto justify-between align-middle pt-3">
                  {type === "warning" ? (
                    <span className="self-center rounded-[50px] bg-[orange] bg-opacity-20 flex items-center justify-center mb-3">
                      <IoAlert size={"74px"} className="text-[orange]" />
                    </span>
                  ) : type === "success" ? (
                    <span className="self-center rounded-[50px] bg-[green] bg-opacity-20 flex items-center justify-center mb-3">
                      <IoCheckmarkSharp
                        size={"74px"}
                        className="text-[green]"
                      />
                    </span>
                  ) : (
                    <span className="self-center rounded-[50px] bg-[red] bg-opacity-20 flex items-center justify-center mb-3">
                      <IoCloseSharp size={"74px"} className="text-[red]" />
                    </span>
                  )}

                  <h3 className="text-[35px] text-center font-LoraBold pt-3">
                    {headerText}
                  </h3>
                </div>

                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>

                {/*body*/}
                <div className="relative pb-6 flex-auto">
                  <p className="my-2 text-blueGray-500 text-lg leading-relaxed text-center font-bold">
                    {/* Message content can be customized based on the type */}
                    {type === "success" && message}
                    {type === "warning" && message}
                    {type === "error" && message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
