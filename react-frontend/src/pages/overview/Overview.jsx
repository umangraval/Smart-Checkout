import React from 'react'
import './overview.scss'

export default function Overview() {
    return (
        <div className="Overview App-content">
            <div className="row">
                <div className="cell">Analytics</div>
                <div className="cell">Transactions</div>
                <div className="cell">Products</div>
            </div>
            <div className="row">
                <div className="cell">Categories</div>
                <div className="cell">Profile</div>
            </div>
        </div>
    )
}
