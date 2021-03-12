module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "consistent-return": [1, { treatUndefinedAsUnspecified: true }],
        "prefer-destructuring": [1, { object: true, array: false }],
        "no-underscore-dangle": [1, { allow: ["_id"] }],
        "import/prefer-default-export": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "react/display-name": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    }
};
