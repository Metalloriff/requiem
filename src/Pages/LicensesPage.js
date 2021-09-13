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
            
            { Object.entries(credits).map(([key, value]) => (
                <div className="LicenseItem" key={key}>
                    <h2>{key}</h2>
                    
                    { value.audio && (
                        <h4>
                            <b>Audio</b> - <a href={value.audio.link}>
                                {value.audio.title}
                            </a>
                        </h4> 
                    ) }

                    <h4>
                        <b>Video</b> - <a href={value.video.link}>
                        {value.video.title}
                    </a>
                    </h4>
                </div>
            )) }
        </div>
    );
}