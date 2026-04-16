export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600">
            Built with clarity and purpose. {currentYear}.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:mpmendoza6@up.edu.ph"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/marcjoemill"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/marc-joemil-mendoza1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
