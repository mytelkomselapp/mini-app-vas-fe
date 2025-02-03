import BackgroundSholat from "../../../../../assets/bg/catatan-ibadah/bg-sholat.png";
import BackgroundSahur from "../../../../../assets/bg/catatan-ibadah/bg-sahur.png";
import BackgroundSedekah from "../../../../../assets/bg/catatan-ibadah/bg-sedekah-subuh.png";

export const StampPercentageDummy = [
  { percentage: 5 },
  { percentage: 10 },
  { percentage: 15 },
  { percentage: 20 },
  { percentage: 25 },
  { percentage: 30 },
  { percentage: 35 },
  { percentage: 40 },
  { percentage: 45 },
  { percentage: 50 },
  { percentage: 55 },
  { percentage: 60 },
  { percentage: 65 },
  { percentage: 70 },
  { percentage: 75 },
  { percentage: 80 },
  { percentage: 85 },
  { percentage: 90 },
  { percentage: 95 },
  { percentage: 100 },
  { percentage: 12 },
  { percentage: 18 },
  { percentage: 22 },
  { percentage: 28 },
  { percentage: 33 },
  { percentage: 38 },
  { percentage: 44 },
  { percentage: 48 },
  { percentage: 52 },
  { percentage: 58 },
  { percentage: 68 },
  { percentage: 78 },
  { percentage: 88 },
  { percentage: 98 },
];

export const DUMMY_CARD_TASK_IBADAH_LIST = {
  morning: [
    {
      id: 1,
      title: "Sholat Tahajud",
      imageUrl: BackgroundSholat,
      type: "morning",
    },
    {
      id: 2,
      title: "Sahur",
      imageUrl: BackgroundSahur,
      type: "morning",
    },
    {
      id: 3,
      title: "Sholat Subuh",
      imageUrl: BackgroundSholat,
      type: "morning",
    },
    {
      id: 4,
      title: "Sedekah Subuh",
      imageUrl: BackgroundSedekah,
      type: "morning",
    },
  ],
  afternoon: [
    {
      id: 5,
      title: "Sholat Dzuhur",
      imageUrl: BackgroundSholat,
      type: "afternoon",
    },
    {
      id: 6,
      title: "Sholat Asar",
      imageUrl: BackgroundSholat,
      type: "afternoon",
    },
    {
      id: 7,
      title: "Dzikir Petang",
      imageUrl: BackgroundSedekah,
      type: "afternoon",
    },
  ],
  night: [
    {
      id: 8,
      title: "Buka Puasa",
      imageUrl: BackgroundSahur,
      type: "night",
    },
    {
      id: 8,
      title: "Sholat Maghrib",
      imageUrl: BackgroundSholat,
      type: "night",
    },
    {
      id: 9,
      title: "Sholat Isya",
      imageUrl: BackgroundSholat,
      type: "night",
    },
    {
      id: 10,
      title: "Sholat Tarawih",
      imageUrl: BackgroundSholat,
      type: "night",
    },
  ],
};
