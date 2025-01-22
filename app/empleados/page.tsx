"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Persona } from "app/personas/page";

export interface Empleado {
  id: string;
  dependencia: string;
  fechaIngreso: string;
  personaId: Persona;
}

const Empleados = () => {
  const [form, setForm] = useState({
    dependencia: "",
    fechaIngreso: "",
    personaId: "",
  });

  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/empleados", {
        ...form,
        persona: { id: form.personaId },
      });
      alert("Empleado registrado");
      fetchEmpleados();
      setForm({
        dependencia: "",
        fechaIngreso: "",
        personaId: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al registrar el empleado");
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/empleados");
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error fetching empleados:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-xl mt-6">Empleados</h2>
      <div className="mt-4 flex flex-row gap-4 items-center flex-wrap">
        {empleados.map((empleado) => (
          <div key={empleado.id} className="p-4 border border-gray-300 rounded">
            <p>
              <strong>Dependencia:</strong> {empleado.dependencia}
            </p>
            <p>
              <strong>Fecha de ingreso:</strong> {empleado.fechaIngreso}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Registrar Empleado
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            name="dependencia"
            placeholder="Dependencia"
            value={form.dependencia}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="fechaIngreso"
            type="date"
            placeholder="Fecha de Ingreso"
            value={form.fechaIngreso}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
          <input
            name="personaId"
            placeholder="ID de la Persona"
            value={form.personaId}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Registrar Empleado
        </button>
      </form>
    </div>
  );
};

export default Empleados;
