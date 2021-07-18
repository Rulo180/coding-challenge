module.exports = {
    moduleDirectories: ["node_modules", "bower_components", "shared"],
    moduleFileExtensions: ["js", "jsx"],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/config/jest/__mocks__/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
}