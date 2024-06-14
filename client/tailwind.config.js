/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins"],
                oswald: ["oswald"]
            }
        },
    },
    darkMode: 'selector',
    plugins: [
        require('@tailwindcss/line-clamp'),
        // ...
    ],
}

