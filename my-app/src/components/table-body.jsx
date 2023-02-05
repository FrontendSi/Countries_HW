import React from "react";

function TableBody({ data }) {

    return (
        <tbody>
            {data.map(i => 
                <tr key={i.name}>
                    <td>{i.name}</td>
                    <td>{i.region}</td>
                    <td>{i.area === undefined ? "N/A" : i.area}</td>
                    <td>{i.independent === false? "no":"yes"}</td>              
                </tr>) 
            }
    </tbody>
    )
}

export default TableBody;