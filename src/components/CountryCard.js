import React from 'react';

const CountryCard = ({ country }) => {
    return (
        <div className="bg-white dark:bg-dark-blue shadow-md rounded-md overflow-hidden h-full flex flex-col">
            <img
                src={country.flags.png}
                alt={`${country.name.common} Flag`}
                className="w-full h-64 object-cover"
                style={{ maxHeight: '100%', objectFit: 'cover' }}
            />
            <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{country.name.common}</h3>
                    <p><span className="font-semibold">Population:</span> {country.population ? country.population.toLocaleString() : 'N/A'}</p>
                    <p><span className="font-semibold">Region:</span> {country.region || 'N/A'}</p>
                    <p><span className="font-semibold">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;
