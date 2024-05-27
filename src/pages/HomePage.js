import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCard from '../components/CountryCard';

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
            });
    }, []);

    const filteredCountries = countries
        .filter(country => {
            const countryName = country.name.common.toLowerCase();
            const searchValue = search.toLowerCase();
            return countryName.includes(searchValue);
        })
        .filter(country => {
            return region ? country.region === region : true;
        });

    return (
        <div className="p-8 bg-very-light-gray dark:bg-very-dark-blue-bg min-h-screen">
            <div className="flex flex-col md:flex-row justify-between mb-8">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    className="w-full md:w-1/3 p-4 rounded shadow-md mb-4 md:mb-0 dark:bg-dark-blue dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="w-full md:w-1/4 p-4 rounded shadow-md dark:bg-dark-blue dark:text-white"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                >
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredCountries.map(country => (
                    <Link key={country.name.common} to={`/country/${country.name.common}`}>
                        <CountryCard country={country} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
