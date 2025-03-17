export interface FilterChipItemProps {
  index: number;
  title: string;
  slug: string;
}

export interface ClientWidthProps {
  id: number;
  width: number;
  clientWidth: number;
}

export interface FilterChipsProps {
  defaultActiveIndex?: number;
  filterList: FilterChipItemProps[];
  onClick?: (data: FilterChipItemProps) => void;
  className?: string;
}
