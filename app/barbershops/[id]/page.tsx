import { db } from "@/app/_lib/prisma";
import { BarberShopInfo } from "./_components/barbershop-info";
import { ServiceItem } from "./_components/service-item";

interface BarberShopDetailsPageProps {
  params?: any;
}

async function BarberShopDetailsPage({ params }: BarberShopDetailsPageProps) {
  if(!params.id) {

    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true
    }
  })

  if(!barbershop) {
    return null;
  }

  return (
    <div>
      <BarberShopInfo barbershop={barbershop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default BarberShopDetailsPage;