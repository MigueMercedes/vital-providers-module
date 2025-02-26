"use server";

import baseQuery from "@/lib/baseQuery";
import {
  Ars,
  Branch,
  IResponse,
  Procedure,
  ServiceProvider,
  Specialty,
} from "@/lib/types";

export const getAllProviders = async () => {
  return baseQuery<IResponse<ServiceProvider[]>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `providers`,
    method: "GET",
  });
};

export const getProviderById = async (id: string) => {
  return baseQuery<IResponse<ServiceProvider>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `providers/${id}`,
    method: "GET",
  });
};

export const updateProvider = async (provider: ServiceProvider) => {
  return baseQuery<IResponse<ServiceProvider>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `providers/${provider.id}`,
    method: "PUT",
    body: provider,
  });
};

export const getAllBranchesByProviderId = async (providerId: string) => {
  return baseQuery<IResponse<Branch[]>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `branches?providerId=${providerId}`,
    method: "GET",
  });
};

export const getAllArs = async () => {
  return baseQuery<IResponse<Ars[]>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `ars`,
    method: "GET",
  });
};

export const getAllSpecialties = async () => {
  return baseQuery<IResponse<Specialty[]>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `specialties`,
    method: "GET",
  });
};

export const getAllProcedures = async () => {
  return baseQuery<IResponse<Procedure[]>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `procedures`,
    method: "GET",
  });
};

export const getProviderDetails = async (providerId: string) => {
  const [providerRes, arsRes, specialtiesRes, proceduresRes] =
    await Promise.all([
      getProviderById(providerId),
      getAllArs(),
      getAllSpecialties(),
      getAllProcedures(),
    ]);

  if (!providerRes?.data) {
    throw new Error("No se encontró el prestador solicitado");
  }

  const provider = providerRes.data;
  const affiliatedArs = arsRes.data.filter((ars) =>
    provider.affiliatedArs.includes(ars.id)
  );
  const specialties = specialtiesRes.data.filter((spec) =>
    provider.specialties.includes(spec.id)
  );
  const procedures = proceduresRes.data.filter((proc) =>
    provider.procedures.includes(proc.id)
  );

  return {
    ...provider,
    affiliatedArs,
    specialties,
    procedures,
  };
};
