export interface Performance {
  id: string;
  title: string;
  company: string;
  director: string;
  cast: string[];
  date: string;
  time: string;
  venue: string;
  imageUrl: string;
  posterUrl?: string;
  genre: string;
  language: string;
  duration: string;
  synopsis: string;
}

export const performances: Performance[] = [
  {
    id: "1",
    title: "Without blood",
    company: "Plovdiv Drama Theater and Drama Theater - Veles, North Macedonia",
    director: "Diana Dobreva",
    cast: [
      "Margita Gosheva",
      "Vasil Zafirchev",
      "Konstantin Elenkov",
      "Patricia Pundeva",
      "Katrin Gacheva",
      "Isidor Yovanoski",
      "Filip Hristovski",
      "Krasimir Vasilev",
      "Georgi Vachev",
      "Keti Borisovska",
      "Simeon Aleksiev",
      "Elena Kabasakalova",
      "Katrin Gacheva",
      "Zlatko Sharkov",
      "Filip Vasilevski",
      "Elena Dimitrova",
    ],
    date: "18.09.2025", // Date not provided, leaving empty
    time: "19:00", // Time not provided, leaving empty
    venue: "Main Chamber", // Venue not provided, leaving empty
    imageUrl: "/bez_krv1.webp", // Performance image
    posterUrl: "/bez_krv.webp", // Poster image
    genre: "Drama", // Genre inferred from description
    language: "Macedonian", // Language not explicitly provided
    duration: "110 min",
    synopsis:
      "Alessandro Barrico's literary masterpiece begins with vendetta and ends with retribution. A civil war engulfs three men in its labyrinth, a father, two children and a bloodthirsty Minotaur. In the years of smoldering peace, a beautiful woman stands before a seller of lottery tickets and to take the path between death and reckoning. “Is there an end to revenge, or is it a vicious circle in which we are doomed to spin?” this is the great question of the novel. In Diana Dobreva's performance, epic and poetry, speech and music, gesture and dance are like a keg of gunpowder and a lit match. The intensification of hatred between men and nations marks the spirit of the age in which we live. Man is increasingly alone on the \"heart of the earth.\" The joint performance of the Plovdiv Drama Theater and the Drama Theater - Veles, North Macedonia declares with the power of art that salvation lies in the path of reconciliation, in the refusal of blood. And only love closes wounds without repeating the pain. The production is part of the two-year international project \"Manifesto\" of the Drama Theater - Plovdiv and the National Theater \"Yordan Hadzhikonstantinov - Djinot\" - Veles, Republic of North Macedonia. The project is done with the support of the Ministries of Culture of the two countries, the Bulgarian Cultural and Information Center Skopje, as well as the Plovdiv 2019 Foundation under an open invitation \"Festivals and major events\".",
  },
];