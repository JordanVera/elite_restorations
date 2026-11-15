import { site } from "@/lib/site";

export const commercialHubPath = "/commercial-storm-restoration";

export const propertyScopeEn = {
  eyebrow: "Houses, businesses, and apartments",
  title: "The same crew for a house, an apartment complex, or a storefront.",
  body: `Elite Restorations does emergency storm and water-damage work for homes, businesses, and apartment complexes across Greater Houston. Property managers, homeowner associations, and building owners can call ${site.phone.display} any time while the emergency is still going. The office at ${site.address.streetAddress} is open Monday through Saturday, 8:00 AM to 6:00 PM, for a visit you schedule.`,
  linkLabel: "Storm help for businesses and apartments",
};

export const propertyScopeEs = {
  eyebrow: "Casas, comercios y apartamentos",
  title: "La misma cuadrilla para una casa, un complejo o un local.",
  body: `Elite Restorations atiende emergencias por tormenta y por agua en casas, comercios y complejos de apartamentos en el área de Houston. Administradores, la asociación de propietarios y los dueños pueden llamar al ${site.phone.display} a cualquier hora si la emergencia sigue. La oficina en ${site.address.streetAddress} abre de lunes a sábado, de 8:00 AM a 6:00 PM, para una visita con cita.`,
  linkLabel: "Tormenta en comercios y apartamentos",
};

export function propertyScopeCopy(locale: "en" | "es") {
  return locale === "es" ? propertyScopeEs : propertyScopeEn;
}
