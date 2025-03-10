"use server";

import baseQuery from "@/lib/baseQuery";
import {
  Insurance,
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

// Add new server action for creating a branch
export const createBranch = async (branch: Omit<Branch, "id">) => {
  return baseQuery<IResponse<Branch>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `branches`,
    method: "POST",
    body: branch,
  });
};

export const getAllInsurances = async () => {
  return baseQuery<IResponse<Insurance[]>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `insurances`,
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
  const [providerRes, insurancesRes, specialtiesRes, proceduresRes] =
    await Promise.all([
      getProviderById(providerId),
      getAllInsurances(),
      getAllSpecialties(),
      getAllProcedures(),
    ]);

  if (!providerRes?.data) {
    throw new Error("No se encontró el prestador solicitado");
  }

  const provider = providerRes.data;
  const affiliatedInsurances = insurancesRes.data.filter((insurance) =>
    provider.affiliatedInsurances.includes(insurance.id)
  );
  const specialties = specialtiesRes.data.filter((spec) =>
    provider.specialties.includes(spec.id)
  );
  const procedures = proceduresRes.data.filter((proc) =>
    provider.procedures.includes(proc.id)
  );

  return {
    ...provider,
    affiliatedInsurances,
    specialties,
    procedures,
  };
};

export const getProviderWithBranches = async (providerId: string) => {
  const [providerDetailsResult, branchesResult] = await Promise.all([
    getProviderDetails(providerId),
    getAllBranchesByProviderId(providerId),
  ]);

  return {
    provider: providerDetailsResult,
    branches: branchesResult.data || [],
  };
};

export const createProvider = async (provider: Omit<ServiceProvider, "id">) => {
  return baseQuery<IResponse<ServiceProvider>>({
    gateway: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    url: `providers`,
    method: "POST",
    body: provider,
  });
};
