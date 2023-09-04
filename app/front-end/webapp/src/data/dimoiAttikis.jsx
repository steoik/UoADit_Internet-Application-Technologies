const dimoiKentrikouTomeaAthinon = [
  "Αθήνα",
  "Βύρωνας",
  "Γαλάτσι",
  "Δάφνη-Υμηττός",
  "Ζωγράφου",
  "Ηλιούπολη",
  "Καισαριανή",
  "Νέα Φιλαδέλφεια - Νέα Χαλκηδόνα"
];

const dimoiNotiouTomeaAthinon = [
  "Άγιος Δημήτριος",
  "Άλιμος",
  "Γλυφάδα",
  "Ελληνικό-Αργυρούπολη",
  "Καλλιθέα",
  "Μοσχάτο-Ταύρος",
  "Νέα Σμύρνη",
  "Παλαιό Φάληρο"
];

const dimoiVoreiouTomeaAthinon = [
  "Αγία Παρασκευή",
  "Αμαρούσιος",
  "Βριλήσσια",
  "Ηράκλειο",
  "Κηφισιά",
  "Λυκόβρυση-Πεύκη",
  "Μεταμόρφωση",
  "Νέα Ιωνία",
  "Παπάγου-Χολαργός",
  "Πεντέλη",
  "Φιλοθέη-Ψυχικό",
  "Χαλάνδρι"
];

const dimoiDytikouTomeaAthinon = [
  "Αγία Βαρβάρα",
  "Αγίοι Ανάργυροι-Καματερό",
  "Αιγάλεω",
  "Ίλιον",
  "Περιστέρι",
  "Πετρούπολη",
  "Χαϊδάρι"
];

const dimoiPireos = [
  "Πειραιάς",
  "Νίκαια-Αγίος Ιωάννης Ρέντης",
  "Κορυδαλλός",
  "Κερατσίνι-Δραπετσώνα",
  "Περάμα"
];

const dimoiNisonAttikis = [
  "Αίγινα",
  "Αγκίστρι",
  "Κύθηρα",
  "Πόρος",
  "Σαλαμίνα",
  "Σπέτσες",
  "Τροιζηνία",
  "Ύδρα"
];

const dimoiDytikisAttikis = [
  "Ασπρόπυργος",
  "Ελευσίνα",
  "Μάνδρα-Ειδυλλία",
  "Μέγαρα",
  "Φυλή"
];

const dimoiAnatolikisAttikis = [
  "Αχαρνές-Θρακομακεδόνες",
  "Βάρη-Βούλα-Βουλιαγμένη",
  "Διόνυσος",
  "Κρωπία",
  "Λαύριο",
  "Μαραθώνας",
  "Μαρκόπουλο Μεσογαίας",
  "Παιανία",
  "Παλλήνη",
  "Ραφήνα-Πικερμίου",
  "Σαρωνικός",
  "Σπάτα-Αρτέμιδα",
  "Ωρωπός"
];

const dimoiAttikis = {
  'Κεντρικού Τομέα Αθηνών': dimoiKentrikouTomeaAthinon,
  'Νοτίου Τομέα Αθηνών': dimoiNotiouTomeaAthinon,
  'Βορείου Τομέα Αθηνών': dimoiVoreiouTomeaAthinon,
  'Δυτικού Τομέα Αθηνών': dimoiDytikouTomeaAthinon,
  'Πειραιώς': dimoiPireos,
  'Νήσων Αττικής': dimoiNisonAttikis,
  'Δυτικής Αττικής': dimoiDytikisAttikis,
  'Ανατολικής Αττικής': dimoiAnatolikisAttikis
};

function normalizeText (text) {
  const strippedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Normalize to Unicode Normalization Form C (NFC)
  const normalizedText = strippedText.normalize('NFC');
  // Convert to lowercase for case-insensitive search
  return normalizedText.toLowerCase();
}

export default function searchDimoi(text) {
  
  const normalizedText = normalizeText(text)
  console.log({normalizedText});
  const results = [];

  const districts = Object.keys(dimoiAttikis);      // Περιφερειακές Ενότητες
  districts.forEach(district => {
    // console.log(`Περιφερειακή Ενότητα: ${district}`);
    const municipalities = dimoiAttikis[district];  // Δήμοι
    // if (district.includes(normalizedText))
    //   results.push(`${district}`)
    municipalities.forEach(municipality => {
      // console.log(`Δήμος: ${municipality}`);
      if (normalizeText(municipality).includes(normalizedText))
        results.push(`${municipality}`)
    });
  });
  // console.log(results);
  return results.sort((a, b) => a.localeCompare(b, 'el'));
}