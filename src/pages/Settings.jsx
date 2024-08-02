import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { themeColors } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Settings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();

  return (
    <div className="fixed inset-0 bg-half-transparent z-50">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-full h-full md:w-3/4 md:h-3/4 lg:w-1/2 lg:h-1/2 bg-white dark:bg-[#484B52] rounded-xl overflow-auto shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <p className="font-semibold text-lg">Settings</p>
            <button
              type="button"
              onClick={() => setThemeSettings(false)}
              style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="p-4">
            <div className="border-t border-color pt-4">
              <p className="font-semibold text-xl">Theme Option</p>
              <div className="mt-4">
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  value="Light"
                  className="cursor-pointer"
                  onChange={setMode}
                  checked={currentMode === "Light"}
                />
                <label htmlFor="light" className="ml-2 text-md cursor-pointer">
                  Light
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  value="Dark"
                  onChange={setMode}
                  className="cursor-pointer"
                  checked={currentMode === "Dark"}
                />
                <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
                  Dark
                </label>
              </div>
            </div>
            <div className="border-t border-color pt-4 mt-4">
              <p className="font-semibold text-xl">Theme Colors</p>
              <div className="flex gap-3 flex-wrap mt-2">
                {themeColors.map((item, index) => (
                  <TooltipComponent
                    key={index}
                    content={item.name}
                    position="TopCenter"
                  >
                    <div className="relative cursor-pointer">
                      <button
                        type="button"
                        className="h-10 w-10 rounded-full cursor-pointer"
                        style={{ backgroundColor: item.color }}
                        onClick={() => setColor(item.color)}
                      >
                        <BsCheck
                          className={`text-2xl text-white ${
                            item.color === currentColor ? "block" : "hidden"
                          }`}
                        />
                      </button>
                    </div>
                  </TooltipComponent>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
