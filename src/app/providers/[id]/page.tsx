// Example usage in a page component
import ProviderDetail from "@/components/providers/ProviderDetail";
import {
  getProviderById,
  getAllArs,
  getAllSpecialties,
  getAllProcedures,
} from "@/lib/server/providers/actions";

export default async function ProviderPage({
  params,
}: {
  params: { id: string };
}) {
  const providerId = params.id;

  const [
    providerResponse,
    arsResponse,
    specialtiesResponse,
    proceduresResponse,
  ] = await Promise.all([
    getProviderById(providerId),
    getAllArs(),
    getAllSpecialties(),
    getAllProcedures(),
  ]);

  const provider = providerResponse.data;
  const ars = arsResponse.data;
  const specialties = specialtiesResponse.data;
  const procedures = proceduresResponse.data;

  return (
    <div>
      <h1>Detalle del Proveedor</h1>
      <ProviderDetail
        provider={provider}
        ars={ars}
        specialties={specialties}
        procedures={procedures}
        // onUpdate={() => {
        //   // You might want to refresh data or redirect
        // }}
      />
    </div>
  );
}
