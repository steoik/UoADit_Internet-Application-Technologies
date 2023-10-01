export const translate_type_EN_GR = (type) => {
  switch (type) {
    case 'apartment':
      return 'Διαμέρισμα';
    case 'building':
      return 'Μονοκατοικία';
    case 'studio':
      return 'Στούντιο';
    case 'maisonette':
      return 'Μεζονέτα';
    default:
      return 'error';
  }
};

export const translate_type_GR_EN = (type) => {
  switch (type) {
    case 'Διαμέρισμα':
      return 'apartment';
    case 'Μονοκατοικία':
      return 'building';
    case 'Στούντιο':
      return 'studio';
    case 'Μεζονέτα':
      return 'maisonette';
    default:
      return 'error';
  }
};

export const translate_payment_EN_GR = (payment) => {
  switch (payment) {
    case 'month':
      return 'Μήνας';
    case 'night':
      return 'Διανυκτέρευση';
    default:
      return 'error';
  }
};

export const translate_payment_GR_EN = (payment) => {
  switch (payment) {
    case 'Μήνας':
      return 'month';
    case 'Διανυκτέρευση':
      return 'night';
    default:
      return 'error';
  }
};

export const translate_role_EN_GR = (role) => {
  if (role == 'tenant')
    return 'Ενοικιαστής'
  else if (role == 'host')
    return 'Οικοδεσπότης'
  else if (role == 'admin')
    return 'Διαχειριστής'
  else 
    return 'error'
}