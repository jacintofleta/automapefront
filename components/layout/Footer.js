/* This example requires Tailwind CSS v2.0+ */
const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
  ],
  social: [],
};

export default function Example() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className="text-base text-white hover:text-gray-100"
              >
                {item.name}
              </a>
            </div>
          ))}
          <div className="px-5 py-2">
            <span className="text-base text-white hover:text-gray-100">
              &copy; {new Date().getFullYear()} Automape
            </span>
          </div>
        </nav>
      </div>
    </footer>
  );
}
