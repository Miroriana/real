const generateRandomPassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};
const generateUserRandomPassword = () => {
  const passwords = [
    "UmunsiMwiza2023!Kabiri",
    "IgiheCyiza_Ubumwe&Ubwiyunge",
    "Gira_Umugambi_Kubaka",
    "InziraNziza!MubyeyiMukuru",
    "IgiheCyiza_Umugani_Umugabo",
    "IsabukuruNjiza_Ubwiyunge2022",
    "IcyumweruCyiza&Amahoro123!",
    "Urukundo_Nyirabukwe&Nyiraburindiro",
    "Inzira_Umugore2023!Imana",
    "UmwansiMwiza_ItuzeGutaha",
    "Umwana_UbuzimaBwiza&Mwiza2023",
    "Gutanga_Ubugingo@Icyiciro123",
    "IbyizaIbigufi_Umwanzuro2022",
    "IcyumweruCiza&UmurageKabiri",
    "Ubwiyunge_UmucoUmwiza2023",
    "Ibihumbi_Byiza_Ubwiyunge123",
    "Ubwiza_Umugabo!MwizaKubana",
    "Ibyiza_Byose_Umwiza123!",
    "Kubaka_UmwanaUmwe_Umugabo",
    "Umurage_UbuzimaBwiza2023!",
    "Umwiza_Umugore2023!Nyirabukwe",
    "InshutiNziza_UmwanaUwacu123",
    "Icyiciro_UmugoreUmugabo",
    "IgihuguCyiza!IshyambaUmwe",
    "UbuzimaBwiza_Ubwiyunge2023",
    "Amahoro_UbugingoBwiza2023",
    "Umwana_UmunsiMwiza2023&Kabiri",
    "Umugani_WacuUmugabo@2023",
    "Ishyamba_Ubwiza2023!Umutware",
    "IbyizaByose_Umugabo!Icyiciro",
    "Umurage_Umugabo@Nyirabukwe2022",
    "Gukunda&Gusabira_UmwanaUmwe",
    "Kubaka_UbuzimaBwiza&Mubyeyi",
    "Umugani_UmugaboUbugingo2023",
    "Ubwiza_UmugoreUmugabo2022!",
    "Inshuti_Nyirabukwe&Nyiraburindiro",
    "Umugore_Umugabo_Umwana2023!",
    "Gutanga_UbwizaMubyeyi&Mukuru",
    "Umwana_Umugabo!IcyumweruCyiza",
    "UbuzimaBwiza_UmwanaUmwe123!",
    "Ubwiza_UbuzimaBwiza2023&Umugore",
    "IgihuguCyiza_UbuzimaBwiza123",
    "UbugingoBwiza_UbuzimaBwiza2022",
    "Umugore_Umugabo!IbihumbiByiza",
    "Kubaka_Ubwiza_Umugore2023",
    "IbyizaIbihumbi!Ubwiza2023",
    "Umurage_Ubwiza2023!Umugabo",
    "Umugani_WacuUmugabo_Ubwiza123",
    "Umwana_Umugabo2023!Ubwiza",
    "Umugore_Umugabo_Umugani2023",
    "UbuzimaBwiza_Umwana!Mubyeyi",
    "Inshuti_Nyirabukwe&Umugore",
    "IcyumweruCyiza_Ubwiza2023!",
    "Umwana_Umugabo!KubakaUmugore",
    "Umugore_Umugabo_Ubwiza@2022",
    "Ibyiza_Byose_UmwanaUmwe2023",
    "Inzira_Umugore_Ubugingo123",
    "Ubwiza_Umugabo2022!Nyirabukwe",
    "Ubwiza_UbugingoBwiza123!Umugore",
    "Ishyamba_Umugore_Ubwiza2023",
    "Umurage_Ubwiza!IgihuguCyiza",
    "Umugore_Umugabo_Umwana123",
    "UbuzimaBwiza_Ubwiza2023@Umugabo",
    "Umwana_Umugabo!IbyizaByose",
    "Inshuti_Nyirabukwe_Ubugingo2022",
    "IcyumweruCyiza_UmugaboUmugore",
    "IbyizaIbihumbi_Umwana!Mubyeyi",
    "Ubwiza_UmugoreUmugabo123",
    "Umugore_Umugabo_Ubwiza123!",
    "Kubaka_UmugoreUmugabo_Umwana",
    "Umugore_Umugabo!Inshuti123",
    "UbuzimaBwiza_UmwanaUmwe!Mubyeyi",
    "Ubwiza_Umugabo2022!Umurage",
    "Inzira_UbuzimaBwiza2023@Umugore",
    "Umwana_Umugabo!Umurage2022",
    "Ishyamba_Ubwiza2022!UmwanaUmwe",
    "Ubwiza_Umugabo2023!Inshuti",
    "Umugore_Umugabo_Ubwiza@2022",
    "Umwana_Umugabo!IgihuguCyiza",
    "UbuzimaBwiza_UmugoreUmugabo2022",
    "Ubwiza_Umugabo2023!Nyirabukwe",
    "IbyizaIbihumbi_UmwanaUmwe123",
    "Umugore_Umugabo!Ibyiza_Byose",
    "Umugore_Umugabo_UmwanaUmwe@2023",
    "Ubwiza_Umugabo!Umurage123",
    "Ishyamba_Ubwiza_Ubugingo2023",
    "UbuzimaBwiza_UmwanaUmwe@Mubyeyi",
    "Ubwiza_UbuzimaBwiza123!Umugore",
    "Ishyamba_Umugore_UmwanaUmwe2023",
    "Umwana_Umugabo!UbuzimaBwiza2022",
    "Ubwiza_UbuzimaBwiza2023!Umugore",
    "IcyumweruCyiza_Umugabo_Umugore",
    "Inshuti_Nyirabukwe&UmugoreUmugabo",
    "IbyizaIbihumbi_UmwanaUmwe!Mubyeyi",
    "Umugore_Umugabo_Ubwiza123!Nyirabukwe",
    "Umugore_Umugabo_UmwanaUmwe2023!Ibyiza",
    "IcyumweruCyiza_UmwanaUmwe!UbuzimaBwiza",
    "Ubwiza_Umugabo!Umurage123",
    "Umugore_Umugabo_Ishyamba_UmwanaUmwe",
    "UbuzimaBwiza_Umwana!IbyizaIbihumbi",
    "Umugore_Umugabo_Ubwiza!Icyiciro",
    "Ubwiza_Umugabo!IgihuguCyiza2023",
    "IbyizaIbihumbi_UmugoreUmugabo123",
    "Inshuti_Nyirabukwe_UbugingoBwiza2023",
    "IcyumweruCyiza_Ubwiza2023!Umugabo",
    "Ubwiza_Umugabo!Inzira2022",
    "Umugore_Umugabo_UmwanaUmwe@Ishyamba",
    "Umugore_Umugabo_Ubwiza!IbyizaIbihumbi",
    "UbuzimaBwiza_UmwanaUmwe!Icyiciro",
    "Umwana_Umugabo2022!Ubwiza",
    "Ubwiza_UbuzimaBwiza!Umugabo2023",
    "Umugore_Umugabo_UmwanaUmwe!IbyizaIbihumbi",
    "Umwana_Umugabo_Ibyiza_Byose!Ishyamba",
    "Ubwiza_Umugabo2023!IcyumweruCyiza",
    "Inshuti_Nyirabukwe_UmwanaUmwe@Umugabo",
    "IbyizaIbihumbi_UbugingoBwiza!Umugore",
    "IcyumweruCyiza_Umugabo_UmwanaUmwe",
    "Umugore_Umugabo_UmwanaUmwe!Ubwiza2023",
    "Ubwiza_Umugabo!Inzira@Ishyamba",
    "Umugore_Umugabo_UmwanaUmwe@IbyizaIbihumbi",
    "Umugore_Umugabo2023!IcyumweruCyiza",
    "Umwana_Umugabo2022!UbuzimaBwiza",
    "UbuzimaBwiza_UmwanaUmwe@Ubwiza",
    "Inzira_Umugore_UmwanaUmwe2023!Ubwiza",
    "Ibyiza_Byose_UmwanaUmwe@IcyumweruCyiza",
    "Umwana_Umugabo2023!Ubwiza@IbyizaIbihumbi",
    "UbuzimaBwiza_UmugoreUmugabo2022!Inzira",
    "Ubwiza_UbuzimaBwiza2023!Umugabo@Nyirabukwe",
    "Umugore_Umugabo_UmwanaUmwe!IbyizaIbihumbi",
    "Ubwiza_Umugabo!Inzira2022@Ishyamba",
    "Umugore_Umugabo2023!IbyizaIbihumbi@Umwana",
    "Umugore_Umugabo!Ibyiza_Byose@Inshuti",
    "Ubwiza_Umugabo_UmwanaUmwe!Icyiciro2023",
    "UbuzimaBwiza_UmwanaUmwe!Ubwiza@Umugabo",
    "Umwana_Umugabo!Inzira2023@Ubwiza",
    "IbyizaIbihumbi_UmugoreUmugabo!Umurage",
    "Umugore_Umugabo_UmwanaUmwe@IbyizaIbihumbi",
    "Ubwiza_Umugabo!Ibyiza_Byose@Umugore",
    "Umugore_Umugabo!Ubwiza2023@Nyirabukwe",
    "Umwana_Umugabo2022!UbuzimaBwiza@Inzira",
    "IbyizaIbihumbi_UbugingoBwiza2023@Umugore",
    "IcyumweruCyiza_Umugabo_UmwanaUmwe@IbyizaIbihumbi",
    "Umugore_Umugabo!Ubwiza@Ibyiza_Byose",
    "UbuzimaBwiza_UmugoreUmugabo2022!Inzira@Umugabo",
    "Ubwiza_Umugabo_UmwanaUmwe@Icyiciro2023",
    "Umwana_Umugabo!Inzira2022@UbuzimaBwiza",
    "UbuzimaBwiza_UmwanaUmwe!Ubwiza@Umugabo",
    "Inshuti_Nyirabukwe_UmwanaUmwe@Umugabo",
    "IbyizaIbihumbi_UmugoreUmugabo!Umurage@Ubwiza",
    "IcyumweruCyiza_UbuzimaBwiza2023!Umugabo@IbyizaIbihumbi",
    "Ibyiza_Byose_UmwanaUmwe@IcyumweruCyiza",
    "IbyizaIbihumbi_UmwanaUmwe!UbuzimaBwiza@Inzira",
    "Umugore_Umugabo!Ibyiza_Byose@Umwana",
    "Umwana_Umugabo2023!Inzira2022@UbuzimaBwiza",
    "IcyumweruCyiza_Umugabo_UmwanaUmwe@IbyizaIbihumbi",
    "IbyizaIbihumbi_UmwanaUmwe@Ubwiza",
    "Umugore_Umugabo2023!IbyizaIbihumbi@Inzira",
    "Ibyiza_Byose_UmwanaUmwe@Umugabo",
    "Ubwiza_Umugabo!Inzira2022@Umugore",
    "Umugore_Umugabo!Ubwiza2023@Nyirabukwe",
    "Umwana_Umugabo2022!UbuzimaBwiza@Inzira",
    "IbyizaIbihumbi_UbugingoBwiza2023@Umugore",
    "IcyumweruCyiza_Umugabo_UmwanaUmwe@IbyizaIbihumbi",
    "Umugore_Umugabo!Ubwiza@Ibyiza_Byose",
  ];

  const randomPassword =
    passwords[Math.floor(Math.random() * passwords.length)];

  return randomPassword;
};

module.exports = { generateRandomPassword, generateUserRandomPassword };
