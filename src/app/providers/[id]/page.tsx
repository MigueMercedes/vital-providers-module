import ProviderDetail from "@/components/providers/ProviderDetail/index";
import {
  getAllInsurances,
  getAllProcedures,
  getAllSpecialties,
  getProviderById,
} from "@/lib/server/providers/actions";

export default async function ProviderPage({
  params,
}: {
  params: { id: string };
}) {
  const providerId = params.id;

  const [
    providerResponse,
    insurancesResponse,
    specialtiesResponse,
    proceduresResponse,
  ] = await Promise.all([
    getProviderById(providerId),
    getAllInsurances(),
    getAllSpecialties(),
    getAllProcedures(),
  ]);

  const provider = providerResponse.data;
  const insurances = insurancesResponse.data;
  const specialties = specialtiesResponse.data;
  const procedures = proceduresResponse.data;

  return (
    <ProviderDetail
      provider={provider}
      insurances={insurances}
      procedures={procedures}
      specialties={specialties}
    />
  );
}
