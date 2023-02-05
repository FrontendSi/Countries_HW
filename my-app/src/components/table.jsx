import React,{useState, useEffect} from "react";
import './table.css';

import TableHeader from "./table-header";
import TableBody from "./table-body";
import Pagination from "./pagination";

function Table() {

    const apiURL = "https://restcountries.com/v2/all?fields=name,region,area";

    const getDefaultVal = async () => {
        const response = await fetch(apiURL)
        .then((response) => response.json())
        .catch(err => console.log(err));
        setCountries(response)
    };
    
    useEffect(()=>{  
        getDefaultVal();
    },[]);
    
    const [countries, setCountries] = useState([])

    const sortAsc = () => {
        const sortedList = [...countries].sort((a, b) => a.name.localeCompare(b.name))
        setCountries(sortedList);
    };

    const sortDesc = () =>  {
        const sortedList = [...countries].sort((a, b) => b.name.localeCompare(a.name));
        setCountries(sortedList);
    };

    const columns = [
      {label: 'Country', property: 'name'},
      {label: 'Region', property: 'region'},
      {label: 'Area', property: 'area'},
      {label: 'Independent', property: 'independent'}
    ];

    const refresh = () => {
        getDefaultVal();
        setFilter("");
        setIsShown(false); 
    }

    const [filter, setFilter] =useState("");

    const filterByOption = (e) => {
        if(e.target.value === "smaller") {
            const areaLtu = [...countries].find(country => country.name ==="Lithuania").area;
            const fillteredSmall = countries.filter(c => c.area < areaLtu);   
            setCountries(fillteredSmall);
            setFilter(e.target.value);
        } else if(e.target.value ==="oceania") {
            const filteredOceania = countries.filter(region => region.region ==="Oceania")
            setCountries(filteredOceania);
            setFilter(e.target.value);
        } else{ 
            setFilter(e.target.value === "" );
            refresh();
        }  
    }
    
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);

    const indexOfLasCountry = currentPage * countriesPerPage;
    const indexOfFirstPost = indexOfLasCountry - countriesPerPage;
    const currentCountry = [...countries].slice(indexOfFirstPost,indexOfLasCountry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
         setIsShown(true);
      };

    return (
        <div className="container-fluid">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <h2 className="text-start" onClick= {refresh}><b>API Countries</b></h2>
                    </div>
                    <div className="row justify-content-between flex-column flex-md-row ">
                        <div className="col-6 text-start">
                             <button onClick={sortAsc} className="btn"><i className="material-icons">arrow_upward</i> <span>A-Z</span></button>
                            <button onClick={sortDesc} className="btn"><i className="material-icons">arrow_downward</i> <span>Z-A</span></button>
                        </div>
                        <div className="col-6">
                            <div className="row justify-content-end">
                            <div className="col-10 ">
                                <select id="inputState" className="form-control" value = {filter} onChange = {filterByOption} onClick={handleClick}>
                                    <option value="" >- Choose Filter -</option>
                                    <option value ="smaller" > Countries smaller than Lithuania by area </option>
                                    <option value ="oceania"> Oceania region countries </option>
                                </select>   
                            </div>
                            <div className="col-2">
                                {isShown && filter !== "" && <button onClick={refresh} className="btn btn-success"> X </button>}  
                            </div>
                            </div>      
                        </div>      
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <TableHeader columns={columns} />
                    <TableBody data={currentCountry}  />
                </table>   
                    <Pagination countriesPerPage= {countriesPerPage} totalCountries={countries.length} paginate={paginate} />  
            </div>
        </div>
    )
}

export default Table;