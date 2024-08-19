import React from "react";
import Link from "next/link";

const EscortCard = ({ escort }) => {
    return (
        <div className="">
            <Link href={`/escorts/${escort?.model_name}/${escort?.model_id}`}>
                <span> { escort?.model_name } </span>
            </Link>
        </div>
    )
}

export default EscortCard;