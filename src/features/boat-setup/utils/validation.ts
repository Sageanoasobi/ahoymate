interface BoatFormData {
  boatType: string;
  boatModel: string;
  engineModel: string;
  length: string;
  yearManufactured: string;
}

export function validateBoatDetails(data: BoatFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const currentYear = new Date().getFullYear();

  if (!data.boatType.trim()) {
    errors.boatType = 'Boat type is required';
  }

  if (!data.engineModel.trim()) {
    errors.engineModel = 'Engine model is required';
  }

  const length = Number(data.length);
  if (!length || length <= 0 || length > 200) {
    errors.length = 'Please enter a valid boat length between 1 and 200 feet';
  }

  const year = Number(data.yearManufactured);
  if (!year || year < 1900 || year > currentYear) {
    errors.yearManufactured = `Please enter a valid year between 1900 and ${currentYear}`;
  }

  return errors;
}