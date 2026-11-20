import type { ApartmentFacility, ApartmentFacilityIcon } from "@/lib/apartments";
import {
  Bath,
  BedDouble,
  BedSingle,
  Building2,
  ChefHat,
  GlassWater,
  Layers,
  Leaf,
  PanelsTopLeft,
  Trees,
  Wind,
  type LucideIcon,
} from "lucide-react";

const icons: Record<ApartmentFacilityIcon, LucideIcon> = {
  layers: Layers,
  building: Building2,
  wind: Wind,
  bed: BedSingle,
  beds: BedDouble,
  bath: Bath,
  chef: ChefHat,
  trees: Trees,
  panels: PanelsTopLeft,
  glass: GlassWater,
  leaf: Leaf,
};

export default function ApartmentFacilities({
  facilities,
}: {
  facilities: readonly ApartmentFacility[];
}) {
  return (
    <ul className="mt-8 grid sm:grid-cols-2">
      {facilities.map((facility) => {
        const Icon = icons[facility.icon];

        return (
          <li
            key={facility.id}
            className="flex items-center gap-3 border-t border-[#D7C5A7]/70 py-3.5 text-sm text-[#203C30]"
          >
            <Icon className="h-4 w-4 shrink-0 text-fiona-sage" aria-hidden="true" />
            {facility.label}
          </li>
        );
      })}
    </ul>
  );
}
