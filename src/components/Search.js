import React from "react";

import { MdSearch } from "react-icons/md";

const Search = ({ name, value, setValue, placeholder}) => {
    return (
        <div className="search">
            <div className="flex items-center gap-2 w-full border bg-gray border-grey px-[16px] rounded-[8px]">
                <div className="flex items-center justify-center">
                    <MdSearch className="text-lg text-white" />
                </div>

                <div className="search-input grow">
                    <input 
                        type="text"
                        name={name}
                        value={value}
                        onChange={(e)=> setValue(e.target.value)}
                        className="w-full py-3 text-sm font-[500] text-white outline-[none] border-[none] bg-[transparent]"
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;