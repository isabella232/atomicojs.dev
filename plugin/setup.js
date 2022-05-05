function getRenderer() {
  return {
    name: "atomico",
    clientEntrypoint: "./plugin/client.js",
    serverEntrypoint: "./plugin/server.js",
    jsxImportSource: "atomico",
    jsxTransformOptions: async () => {
      const {
        default: { default: jsx },
      } = await import("@babel/plugin-transform-react-jsx");
      return {
        plugins: [jsx({}, { runtime: "automatic", importSource: "atomico" })],
      };
    },
  };
}

function getViteConfiguration() {
  return {
    // optimizeDeps: {
    //   include: ["atomico", "atomico/jsx-runtime"],
    //   exclude: ["./plugin/server.js"],
    // },
    ssr: {
      external: ["atomico/ssr.js"],
    },
  };
}

export default function () {
  return {
    name: "atomico",
    hooks: {
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        /**
         * @type {import("astro")}
         */
        addRenderer(getRenderer());
        updateConfig({
          vite: getViteConfiguration(),
        });
      },
    },
  };
}