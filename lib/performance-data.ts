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
    date: "2025-09-18", // Date not provided, leaving empty
    time: "19:00", // Time not provided, leaving empty
    venue: "Main Chamber", // Venue not provided, leaving empty
    imageUrl: "/bez_krv1.webp", // Performance image
    posterUrl: "/bez_krv.webp", // Poster image
    genre: "Drama", // Genre inferred from description
    language: "Bulgarian and Macedonian", // Language not explicitly provided
    duration: "110 minutes",
    synopsis:
      "Alessandro Barrico's literary masterpiece begins with vendetta and ends with retribution. A civil war engulfs three men in its labyrinth, a father, two children and a bloodthirsty Minotaur. In the years of smoldering peace, a beautiful woman stands before a seller of lottery tickets and to take the path between death and reckoning. “Is there an end to revenge, or is it a vicious circle in which we are doomed to spin?” this is the great question of the novel. In Diana Dobreva's performance, epic and poetry, speech and music, gesture and dance are like a keg of gunpowder and a lit match. The intensification of hatred between men and nations marks the spirit of the age in which we live. Man is increasingly alone on the \"heart of the earth.\" The joint performance of the Plovdiv Drama Theater and the Drama Theater - Veles, North Macedonia declares with the power of art that salvation lies in the path of reconciliation, in the refusal of blood. And only love closes wounds without repeating the pain. The production is part of the two-year international project \"Manifesto\" of the Drama Theater - Plovdiv and the National Theater \"Yordan Hadzhikonstantinov - Djinot\" - Veles, Republic of North Macedonia. The project is done with the support of the Ministries of Culture of the two countries, the Bulgarian Cultural and Information Center Skopje, as well as the Plovdiv 2019 Foundation under an open invitation \"Festivals and major events\".",
  },
  {
    id: "2",
    title: "Fathers and forefathers",
    company: "National Theatre in Belgrade",
    director: "Veljko Mićunović",
    cast: [
      "Milutin Medaković Miloš Đorđević",
      "Stevan Medaković Nikola Rakočević",
      "Mihajlo Medaković Aleksandar Vučković",
      "Elizabeta Medaković Vanja Ejdus",
      "Rahela Blake Vanja Milačić",
      "Nanka Sena Đorović",
      "Jelena Iva Milanović",
      "Vidosav Prokić Nikola Ristanovski",
    ],
    date: "2025-09-19", // Date not provided
    time: "20:00", // Time not provided
    venue: "Main Chamber", // Venue not provided
    imageUrl: "/ocevi-i-oci-2_fmob.jpg", // Placeholder image
    posterUrl: "/ocevi_i_oci_plakat.jpg", // Placeholder image
    // TODO: Add actual image URLs for Fathers and forefathers when available
    genre: "Drama",
    language: "Serbian",
    duration: "120 minutes",
    synopsis:
      "Our fathers and forefathers - our spiritual, intellectual, ideological heritage - what we inevitably live with to this day. Or we are forced to live with. Making it impossible to move away from them, and for the sake of constant digging up and re-digging the past, fathers and forefathers live around us constantly - they remind, persecute, supervise and admonish us. From the shards of Stevan Medaković's memory, our torn beings, endangered intimacy, family discords and alienation are staring at us. There is also a fundamental misunderstanding of diversity, be it at the basic level regarding nationality or purely ideological. While, at the same time, our internal exiles, anguishing captivity and the feeling of guilt that we carry as a burden to this day become so obvious.",
  },
  {
    id: "3",
    title: "No Man's Land",
    company: "Macedonian National Theatre", // Company not provided, assuming National Theatre in Belgrade for now
    director: "Aleksandar Morfov",
    cast: [
      "Saško Kocev",
      "Toni Mihajlovski/Nikola Aceski",
      "Aleksandar Mihajlovski",
      "Gorast Cvetkovski",
      "Aleksandar Mikić",
      "Tome Stankovski/Slaviša Kajevski",
      "Aleksandar Gjorgieski",
      "Borče Načev",
      "Oliver Mitkovski",
      "Kamka Tocinovski/Sofia Nasevska-Trifunovska",
      "Nenad Anđelković",
      "Nikola Stefanov/Tome Stankovski/Aleksandar Ivanovski",
      "Stefan Spasov",
      "Grigor Jovanovski/Alexander Ivanovski",
      "Kristina Gieva",
      "Filip Milenkoski",
      "Marija Kondovska",
      "Tome Stankovski",
      "Aleksandar Ivanovski",
    ],
    date: "2025-09-20", // Date not provided
    time: "19:00", // Time not provided
    venue: "Main Chamber", // Venue not provided
    imageUrl: "/nizhija_zemja1.jpg", // Placeholder image
    posterUrl: "/nichija_zemja.jpg", // Placeholder image
    genre: "Drama", // Genre inferred from synopsis
    language: "Macedonian", // Language inferred from synopsis
    duration: "120 minutes",
    synopsis:
      "The script No Man's Land by Danis Tanović is about the war that took place in the 1990s within the borders of the former Yugoslavia. The reason is similar to that of all wars that have occurred - the aggressive persistence and imposition of a kind of cultural identity (including religious affiliation) that is mixed with territorial, political and economic claims. What is interesting in this case is that the warring parties - the Bosniaks and the Bosnian Serbs - are very close in every sense. Hence the impression that the irreconcilable differences between them are inessential, and the conflict is unsustainable. They are at war, even unable to determine exactly why and how it all began - they ask themselves, but do not find an answer. But they continue to kill each other... If this text still manages to build on something a little different from the already widely developed military theme, it consists in the emergence of the terrible and endless inertia of destruction.",
  },
  {
    id: "4",
    title: "Don Juan",
    company: "National Theatre in Nish", // Company not provided, assuming National Theatre in Belgrade for now
    director: "Vasil Vasilev",
    cast: [
      "Dejan Lilić",
      "Dragiša Veljković",
      "Maja Vukojević Cvetković",
      "Andrija Mitić",
      "Uroš Milojević",
      "Katarina Mitić Pavlović",
      "Katarina Arsić",
      "Danilo Petrović",
      "Marjan Todorović",
      "Miloš Mitrović",
    ],
    date: "2025-09-18", // Premiere date
    time: "21:00", // Time not provided
    venue: "Main Chamber", // Venue not provided
    imageUrl: "/don_zhuan1.jpg", // Placeholder image
    posterUrl: "/don_zhuan.jpg", // Placeholder image
    genre: "Drama", // Genre inferred from synopsis
    language: "English", // Language inferred from synopsis
    duration: "120 minutes",
    synopsis:
      "A person’s life journey and the marks they leave on others, their constant pursuit of self-improvement, give them the opportunity to rise freely and destroy all the delusions that time brings. This is my Don Juan – the one who can transcend himself and no longer be Don Juan.",
  },
  {
    id: "5",
    title: "Oh My God",
    company: "National Theatre Ivan Vazov", // Company not provided
    director: "Stoyan Radev",
    cast: [
      "Hristo Mutafchiev"
    ],
    date: "2025-09-20", // Date not provided
    time: "17:30", // Time not provided
    venue: "Main Chamber", // Venue not provided
    imageUrl: "/1bozhe_moj.jpg", // Placeholder image
    posterUrl: "/bozhe_moj.jpg", // Placeholder image
    genre: "Monodrama", // Genre inferred from description
    language: "Bulgarian", // Language not provided, assuming Bulgarian
    duration: "90 minutes", // Duration not provided
    synopsis:
      "A lonely man at a bar table turns to the other visitors. It turns out that the bar belongs to Judas and the man is Christ. Or so He claims. Why? What does He want to accomplish if it is really Him? The play \"Oh My God\" is a call for humanity and love in times when God's word is misused and instead of being a source of life, it is used to justify destruction. The team of the show invites you to a warm, sincere conversation about the deepest topic that seeks answers in the heart and mind of every person. A conversation with a smile and a tear, with irony and compassion.",
  },
  {
    id: "6",
    title: "In the Dark",
    company: "National Theatre Ivan Vazov", // Company not provided
    director: "Albena Stavreva",
    cast: ["Albena Stavreva"], // Cast not explicitly provided
    date: "2025-09-21", // Date not provided
    time: "18:30", // Time not provided
    venue: "Main Chamber", // Venue not provided
    imageUrl: "/nevedenie1.jpg", // Placeholder image
    posterUrl: "/nevedenie.jpg", // Placeholder image
    genre: "Monodrama", // Genre inferred from synopsis
    language: "Bulgarian", // Language not provided, assuming Bulgarian
    duration: "90 minutes", // Duration not provided
    synopsis:
      "\"You think I’m tellin’ you ‘bout things I’ve seen, but no. All of these are just miracles, this is all just ignorance and if we could see ‘em, they’d transform into visions.\" With a jar of jam and an old suitcase Gichka the Cuckoo, the adopted daughter of the village priest, is alone in the belfry of the church. Her stories are unbelievably funny and offer a passage to a small village and its absurd, but lost world. Her stories are also sad as the trusting nature of a child is incapable of seeing through the veil of evil, even if it is staring it in the face. This is a tale of loneliness for those who are different, of frantic living on the margins of sanity and unconditional love. A life filled with memories and wonder. All of them were kept in a tiny tinder box.",
  },
];