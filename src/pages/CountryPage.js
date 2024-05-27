import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CountryPage = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((response) => {
                console.log("Response Data:", response.data);
                setCountry(response.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching the country data", error);
            });
    }, [name]);

    if (!country) return <div>Loading...</div>;

    return (
        <div className="p-8 bg-very-light-gray dark:bg-dark-blue min-h-screen">
            <Link to="/" className="bg-white dark:bg-dark-blue text-dark-gray dark:text-white px-6 py-2 shadow-md rounded-md inline-block mb-8">← Back</Link>
            <div className="grid md:grid-cols-2 gap-8">
                {country.flags && country.flags.png && (
                    <img className="w-full h-auto" src={country.flags.png} alt={`${country.name.common} flag`} style={{ maxHeight: '850px', maxWidth: '700px' }} />
                )}
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">{country.name.common}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            {country.nativeName && (
                                <p className="mb-2"><span className="font-semibold">Native Name:</span> {country.nativeName}</p>
                            )}
                            {country.population && (
                                <p className="mb-2"><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                            )}
                            {country.region && (
                                <p className="mb-2"><span className="font-semibold">Region:</span> {country.region}</p>
                            )}
                            {country.subregion && (
                                <p className="mb-2"><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
                            )}
                            {country.capital && (
                                <p className="mb-2"><span className="font-semibold">Capital:</span> {country.capital}</p>
                            )}
                        </div>
                        <div>
                            {country.topLevelDomain ? (
                                <p className="mb-2"><span className="font-semibold">Top Level Domain:</span> {country.topLevelDomain}</p>
                            ) : (
                                <p className="mb-2"><span className="font-semibold">Top Level Domain:</span> N/A</p>
                            )}
                            {country.currencies && (
                                <p className="mb-2">
                                    <span className="font-semibold">Currencies:</span> {Object.values(country.currencies).map(currency => currency.name).join(', ')}
                                </p>
                            )}
                            {country.languages && (
                                <p className="mb-2">
                                    <span className="font-semibold">Languages:</span> {Object.values(country.languages).join(', ')}
                                </p>
                            )}
                        </div>
                    </div>
                    {country.borders && (
                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Border Countries:</h3>
                            <div className="flex flex-wrap gap-2">
                                {country.borders.map(border => (
                                    <Link
                                        to={`/country/${border}`}
                                        key={border}
                                        className="bg-white dark:bg-dark-blue text-dark-gray dark:text-white px-4 py-2 shadow-md rounded-md"
                                    >
                                        {border}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountryPage;
