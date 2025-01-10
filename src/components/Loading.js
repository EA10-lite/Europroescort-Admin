import React from "react";
import { LuLoader2 } from "react-icons/lu";

const Loading = () => {
    return (
        <div className="h-[100px] flex items-center justify-center">
            <LuLoader2 className="animate-spin delay-150ms text-[44px]" />
        </div>
    )
}

export default Loading;