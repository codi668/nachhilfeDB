module.exports = {
    plugins: [
        require('flowbite/plugin'),
        require('@formkit/themes/tailwindcss')
    ],
    content: [
        "./node_modules/flowbite/**/*.js",
        "./formkit-theme.js"
    ]
}