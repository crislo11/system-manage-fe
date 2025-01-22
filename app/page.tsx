import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        Sistema de Gestión
      </h1>
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link href="/personas">
              <span className="text-lg border-2 border-indigo-600 rounded-md p-2 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                Personas
              </span>
            </Link>
          </li>
          <li>
            <Link href="/empleados">
              <span className="text-lg border-2 rounded-md font-semibold border-indigo-600 p-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                Empleados
              </span>
            </Link>
          </li>
          <li>
            <Link href="/tramites">
              <span className="text-lg border-2 rounded-md font-semibold border-indigo-600 p-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                Trámites
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
