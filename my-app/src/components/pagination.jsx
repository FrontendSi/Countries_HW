import React from "react";

function Pagination({ countriesPerPage, totalCountries, paginate }) {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <div id ="pages"className="text-start ">Showing <b>{countriesPerPage}</b> out of <b>{totalCountries}</b> countries
                <ul className="pagination justify-content-center flex-row">
                    {pageNumbers.map( n => (
                        <li key={n} className="page-item">
                            <a onClick={() => paginate(n)}href="!#" className="page-link">{n}</a>
                         </li>) 
                    )}
                </ul> 
            </div> 
        </div>
    );

}
export default Pagination;
