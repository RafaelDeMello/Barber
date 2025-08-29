"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/_lib/auth";
import { db } from "@/_lib/prisma";
import { getServerSession } from "next-auth";

const getConfirmedBookings = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return []
    }
    return await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
}
 
export default getConfirmedBookings;