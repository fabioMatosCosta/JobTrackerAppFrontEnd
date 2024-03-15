export const colorTokens = {
    eggshell: "#F4F1DE",
    delftBlue: "#3D405B",
    burntSienna: "#E07A5F",
    cambridgeBlue: "#81B29A",
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
        mode: mode,
        ...(mode === "dark"
            ? {
                // palette values for dark mode
                primary: {
                    main: colorTokens.cambridgeBlue
                },
                secondary: {
                    main: colorTokens.burntSienna
                },
                background: {
                    default: colorTokens.delftBlue,
                },
                }
            : {
                // palette values for light mode
                primary: {
                    main: colorTokens.cambridgeBlue
                },
                secondary: {
                    main: colorTokens.burntSienna
                },
                background: {
                    default: colorTokens.eggshell,
                },
                }),
        },
        typography: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize: 40,
            },
            h2: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize: 32,
            },
            h3: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize: 24,
            },
            h4: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize: 20,
            },
            h5: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize: 16,
            },
            h6: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize: 14,
            },
        },
        };
    };