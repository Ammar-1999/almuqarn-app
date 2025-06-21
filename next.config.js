const nextConfig = {
  output: "export",
  transpilePackages: [
    "@radix-ui",
    "vaul",
    "@radix-ui/react-alert-dialog",
    "@headlessui/react", 
    "@tremor/react", 
    "@tremor/react/", 
    "tailwind-merge/dist/", 
    "tailwind-merge/dist", 
  ],
};
module.exports = nextConfig;
