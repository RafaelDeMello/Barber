import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteBarbershop() {
  const barbershop = await prisma.barbershop.findFirst({
    where: { name: "Barbearia Central" }
  });

  if (!barbershop) {
    console.log("Barbearia Central não encontrada!");
    return;
  }

  // Busca todos os serviços da barbearia
  const services = await prisma.barbershopService.findMany({
    where: { barbershopId: barbershop.id }
  });

  // Deleta todos os bookings vinculados aos serviços
  for (const service of services) {
    await prisma.booking.deleteMany({
      where: { serviceId: service.id }
    });
  }

  // Deleta todos os serviços vinculados à barbearia
  await prisma.barbershopService.deleteMany({
    where: { barbershopId: barbershop.id }
  });

  // Agora pode deletar a barbearia
  await prisma.barbershop.delete({
    where: { id: barbershop.id }
  });

  console.log("Barbearia Central, seus serviços e bookings foram deletados!");
  await prisma.$disconnect();
}

deleteBarbershop();