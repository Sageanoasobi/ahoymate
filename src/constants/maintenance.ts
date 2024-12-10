export const MAINTENANCE_CATEGORIES = [
  'Engine',
  'Hull',
  'Electrical',
  'Sails',
  'Routine Maintenance',
  'Other'
] as const;

export const MAINTENANCE_FREQUENCIES = [
  'Weekly',
  'Monthly',
  'Quarterly',
  'Annually'
] as const;

export type MaintenanceCategory = typeof MAINTENANCE_CATEGORIES[number];
export type MaintenanceFrequency = typeof MAINTENANCE_FREQUENCIES[number];