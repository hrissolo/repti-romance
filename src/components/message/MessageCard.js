import React from "react"
import {Link} from "react-router-dom"

export const ReptileCard = ({ reptile }) => (
    <section className="reptile">
        <h3 className="reptile__name">
            <Link to={`/reptiles/detail/${reptile.id}`}>
                { reptile.username }
            </Link>
        </h3>
        <div className="reptile__species">{ reptile.species }</div>
    </section>
)