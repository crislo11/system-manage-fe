"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Persona } from "app/personas/page";
import { Empleado } from "app/empleados/page";

interface Tramite {
  id: number;
  numeroRadicacion: string;
  añoRadicacion: string;
  nombreTramite: string;
  descripcion: string;
  personaRadico: Persona;
  funcionarioRecibio: Empleado;
}

const Tramites = () => {
  const [form, setForm] = useState({
    numeroRadicacion: "",
    añoRadicacion: "",
    nombreTramite: "",
    descripcion: "",
    personaRadicoId: "",
    funcionarioRecibioId: "",
  });

  const [tramites, setTramites] = useState<Tramite[]>([]);

  useEffect(() => {
    fetchTramites();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/tramites", {
        ...form,
        personaRadico: { id: form.personaRadicoId },
        funcionarioRecibio: { id: form.funcionarioRecibioId },
      });
      alert("Trámite registrado");
      fetchTramites();
      setForm({
        numeroRadicacion: "",
        añoRadicacion: "",
        nombreTramite: "",
        descripcion: "",
        personaRadicoId: "",
        funcionarioRecibioId: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al registrar el trámite");
    }
  };

  const fetchTramites = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tramites");
      setTramites(response.data);
    } catch (error) {
      console.error("Error fetching empleados:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-xl mt-6">Trámites</h2>
      <div className="mt-4 flex flex-row gap-4 items-center flex-wrap">
        {tramites.map((tramite) => (
          <div key={tramite.id} className="p-4 border border-gray-300 rounded">
            <p>
              <strong>Número de Radicación:</strong> {tramite.numeroRadicacion}
            </p>
            <p>
              <strong>Año de Radicación:</strong> {tramite.añoRadicacion}
            </p>
            <p>
              <strong>Nombre del Trámite:</strong> {tramite.nombreTramite}
            </p>
            <p>
              <strong>Descripción:</strong> {tramite.descripcion}
            </p>
            <p>
              <strong>ID de la Persona que Radicó:</strong>
              {tramite?.personaRadico?.id}
            </p>
            <p>
              <strong>ID del Funcionario que Recibió:</strong>
              {tramite?.funcionarioRecibio?.id}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-6 shadow-md"
      >
        <div className="grid grid-cols-1 gap-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Registrar Trámite
          </h2>
          <input
            name="numeroRadicacion"
            placeholder="Número de Radicación"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="añoRadicacion"
            type="number"
            placeholder="Año de Radicación"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="nombreTramite"
            placeholder="Nombre del Trámite"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="personaRadicoId"
            placeholder="ID de la Persona que Radicó"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="funcionarioRecibioId"
            placeholder="ID del Funcionario que Recibió"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Registrar Trámite
        </button>
      </form>
    </div>
  );
};

export default Tramites;
