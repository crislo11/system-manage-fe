"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export interface Persona {
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
}

const Personas = () => {
  const [form, setForm] = useState({
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    email: "",
  });
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/personas", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Persona registrada");
      fetchPersonas();
      setForm({
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        email: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPersonas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/personas");
      setPersonas(response.data);
    } catch (error) {
      console.error("Error fetching personas:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-xl mt-6">Personas Registradas</h2>
      <div className="mt-4 flex flex-row gap-4 items-center flex-wrap">
        {personas.map((persona) => (
          <div key={persona.id} className="p-4 border border-gray-300 rounded">
            <p>
              <strong>Nombres:</strong> {persona.nombres}
            </p>
            <p>
              <strong>Apellidos:</strong> {persona.apellidos}
            </p>
            <p>
              <strong>Email:</strong> {persona.email}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Registrar Persona
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            name="tipoIdentificacion"
            placeholder="Tipo de Identificación"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="numeroIdentificacion"
            placeholder="Número de Identificación"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="nombres"
            placeholder="Nombres"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="apellidos"
            placeholder="Apellidos"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="direccion"
            placeholder="Dirección"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Registrar Persona
        </button>
      </form>
    </div>
  );
};

export default Personas;
