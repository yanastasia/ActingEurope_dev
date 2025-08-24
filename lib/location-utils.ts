// Utility functions for translating location names and theatre tags

// Map city names to translation keys
export const getCityTranslationKey = (cityName: string): string => {
  const cityMap: { [key: string]: string } = {
    'Kyustendil': 'kyustendil',
    'Sofia': 'sofia',
    'Skopje': 'skopje',
    'Niš': 'nis',
    'Bitola': 'bitola'
  };
  
  return cityMap[cityName] || cityName;
};

// Map country names to translation keys
export const getCountryTranslationKey = (countryName: string): string => {
  const countryMap: { [key: string]: string } = {
    'Bulgaria': 'bulgaria',
    'North Macedonia': 'northMacedonia',
    'Serbia': 'serbia'
  };
  
  return countryMap[countryName] || countryName;
};

// Get translated location string
export const getTranslatedLocation = (
  city: string, 
  country: string, 
  t: (key: string) => string
): string => {
  const cityKey = getCityTranslationKey(city);
  const countryKey = getCountryTranslationKey(country);
  
  const translatedCity = t(cityKey);
  const translatedCountry = t(countryKey);
  
  // If translation returns the same as the key (meaning no translation found), use original
  const finalCity = translatedCity === cityKey ? city : translatedCity;
  const finalCountry = translatedCountry === countryKey ? country : translatedCountry;
  
  return `${finalCity}, ${finalCountry}`;
};

// Map theatre tag names to translation keys
export const getTagTranslationKey = (tagName: string): string => {
  const tagMap: { [key: string]: string } = {
    'Regional Theatre': 'regionalTheatre',
    'Bulgarian Drama': 'bulgarianDrama',
    'Contemporary Works': 'contemporaryWorks',
    'Community Theatre': 'communityTheatre',
    'National Theatre': 'nationalTheatre',
    'Classical Drama': 'classicalDrama',
    'Bulgarian Heritage': 'bulgarianHeritage',
    'Historic Venue': 'historicVenue',
    'Macedonian Culture': 'macedonianCulture',
    'International Collaborations': 'internationalCollaborations',
    'Cultural Identity': 'culturalIdentity',
    'Serbian Theatre': 'serbianTheatre',
    'Contemporary Plays': 'contemporaryPlays',
    'Independent Theatre': 'independentTheatre',
    'Experimental': 'experimental',
    'Contemporary': 'contemporary',
    'Bulgarian Theatre': 'bulgarianTheatre',
    'Intimate Theatre': 'intimateTheatre',
    'Local Productions': 'localProductions'
  };
  
  return tagMap[tagName] || tagName.toLowerCase().replace(/\s+/g, '');
};

// Get translated tag string
export const getTranslatedTag = (
  tagName: string, 
  t: (key: string) => string
): string => {
  const tagKey = getTagTranslationKey(tagName);
  return t(tagKey);
};

// Get array of translated tags
export const getTranslatedTags = (
  tags: { tag_name: string }[], 
  t: (key: string) => string
): string[] => {
  return tags.map(tag => getTranslatedTag(tag.tag_name, t));
};