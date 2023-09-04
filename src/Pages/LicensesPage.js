import React from "react";
import "./LicensesPage.scss";
import credits from "../Assets/credits.json";

export default function LicensesPage() {
    return (
        <div className="LicensesPage FlexCenter">
            <h1>Licenses</h1>
            
            <h3>
                None of this would be possible without these
                assets being available, and being royalty free.
            </h3>
            
            { credits.credits.map((value, key) => (
                <div className="LicenseItem" key={key}>
					<h4>
						<a href={value}>
							{value}
						</a>
					</h4>
                </div>
            )) }
        </div>
    );
}