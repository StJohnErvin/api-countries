import React from 'react';

const Header = ({ theme, toggleTheme }) => {
    return (
        <header className="bg-white dark:bg-dark-blue shadow-md py-4 px-8 flex justify-between items-center">
            <h1 className="text-lg font-bold">Where in the world?</h1>
            <button
                onClick={toggleTheme}
                className="text-sm bg-gray-200 dark:bg-dark-blue py-2 px-4 rounded"
            >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    );
};

export default Header;
