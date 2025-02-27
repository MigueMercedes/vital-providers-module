import { getAllProviders } from "@/lib/server/providers/actions";
import ProviderContainer from "../../components/providers/ProviderContainer";

export default async function ProvidersPage() {
  const { data: providers, resp } = await getAllProviders();

  if (resp.codigo !== 0) {
    throw new Error(resp.mensaje);
  }

  return <ProviderContainer providers={providers} />;
}
