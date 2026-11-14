import { site } from "@/lib/site";

export const commercialHubPath = "/commercial-storm-restoration";

export const propertyScopeEn = {
  eyebrow: "Houses, commercial buildings, and apartments",
  title: "The same crew for a house, a complex, or a storefront.",
  body: `Elite Restorations does emergency storm and water damage work for homes, commercial buildings, and apartment complexes across Greater Houston. Property managers, HOAs, and building owners can call ${site.phone.display} any time for an active emergency. The office at ${site.address.streetAddress} is open Monday through Saturday, 8:00 AM to 6:00 PM for scheduled visits.`,
  linkLabel: "Commercial and multifamily storm restoration",
};

export const propertyScopeEs = {
  eyebrow: "Casas, comercios y apartamentos",
  title: "La misma cuadrilla para una casa, un complejo o un local.",
  body: `Elite Restorations atiende emergencias por tormenta y por agua en casas, edificios comerciales y complejos de apartamentos en el área de Houston. Administradores, HOA y dueños pueden llamar al ${site.phone.display} a cualquier hora si la emergencia sigue activa. La oficina en ${site.address.streetAddress} abre de lunes a sábado, de 8:00 AM a 6:00 PM, para visitas programadas.`,
  linkLabel: "Restauración comercial y multifamiliar por tormenta",
};

export function propertyScopeCopy(locale: "en" | "es") {
  return locale === "es" ? propertyScopeEs : propertyScopeEn;
}
