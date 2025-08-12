"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
export type Language = "en" | "bg" | "mk" | "sr"

// Define the context type
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  en: {
    // Navigation
    home: "Home",
    program: "Program",
    participants: "Participants",
    tickets: "Tickets",
    news: "News",
    about: "About",
    contact: "Contact",
    signIn: "Sign In",
    signUp: "Sign Up",
    myProfile: "My Profile",
    myTickets: "My Tickets",
    favorites: "Favorites",
    adminPanel: "Admin Panel",
    logout: "Log out",

    // Home page
    heroTitle: "Acting Europe",
    heroSubtitle: "Theatre Without Borders",
    heroDescription: "An international festival celebrating cultural exchange and artistic collaboration",
    heroDate: "September 18-21, 2025 • Kyustendil, Bulgaria",
    viewProgram: "View Program",
    bookTickets: "Book Tickets",
    festivalStartsIn: "Festival Starts In",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    quickLinks: "Quick Links",
    latestNews: "Latest News",
    latestNewsDesc: "Stay updated with the latest festival announcements and stories",
    programDesc: "Explore the full schedule of performances, workshops and events",
    bookTicketsDesc: "Secure your seats for the most anticipated performances",
    featuredPerformance: "Featured Performance",
    featuredPerformanceDesc: "Don't miss today's highlight at the festival",
    festivalMoments: "Festival Moments",
    viewFullGallery: "View Full Gallery",
    ourPartners: "Our Partners",

    // Footer
    footerDescription:
      "Theatre Without Borders - International theatre festival celebrating cultural exchange and artistic collaboration.",
    quickLinksFooter: "Quick Links",
    contactFooter: "Contact",
    followUs: "Follow Us",
    subscribeNewsletter: "Subscribe to our newsletter for updates",
    allRightsReserved: "All rights reserved.",

    // Participants/Theatres
    participatingTheatres: "Participating Theatres",
    theatreHistory: "Theatre History",
    gallery: "Gallery",
    foundedIn: "Founded in",
    location: "Location",
    website: "Website",
    viewTheatre: "View Theatre",
    culturalExchange: "Cultural Exchange Through Theatre",
    culturalExchangeDesc:
      "Acting Europe brings together these distinguished theatres to create a unique platform for cultural dialogue and artistic collaboration. Each participating theatre contributes its unique perspective, creating a rich tapestry of Balkan theatrical traditions and contemporary innovations.",

    // Registration
    signupDisclaimer: "By signing up, you agree to receive promotional emails from Acting Europe.",

    // Venues
    mainStage: "Main Stage",
    chamberStage: "Chamber Stage",
    regularSeating: "Regular Seating",
    balconySeating: "Balcony Seating",
    mainSeating: "Main Seating",

    // Common
    bookTicket: "Book Ticket",
    details: "Details",
    readMore: "Read More",
    date: "Date",
    time: "Time",
    venue: "Venue",
    price: "Price",
    total: "Total",
    back: "Back",
    next: "Next",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",

    // Seat Selection
    selectSeats: "Select Seats",
    selectYourSeats: "Select Your Seats",
    selectedSeats: "Selected Seats",
    none: "None",
    stage: "STAGE",
    seat: "Seat",
    available: "Available",
    selected: "Selected",
    unavailable: "Unavailable",
    confirmSelection: "Confirm Selection",
    maxSeatsReached: "Maximum seats reached",
    maxSeatsReachedDesc: "You can select up to 5 seats per booking",
    noSeatsSelected: "No seats selected",
    pleaseSelectSeats: "Please select at least one seat to continue",

    // Booking
    availablePerformances: "Available Performances",
    perTicket: "per ticket",
    yourDetails: "Your Details",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    completeBooking: "Complete Booking",
    bookingConfirmed: "Booking Confirmed",
    bookingConfirmedDesc: "Your tickets have been booked successfully",
    bookingConfirmationEmail: "A confirmation email has been sent to your email address with your ticket details.",
    bookingDetails: "Booking Details",
    seats: "Seats",
    bookAnotherTicket: "Book Another Ticket",
    downloadTicket: "Download Ticket",
    noPerformancesYet: "No performances available yet",
    noPerformancesYetDesc: "Please check back later or contact the administrator for more information.",

    // Workshops
    workshops: "Workshops",
    workshopsComingSoon: "Workshops Coming Soon",
    workshopsComingSoonDesc: "Workshop registrations will be available soon. Please check back later.",

    // Forms
    missingInformation: "Missing Information",
    pleaseCompleteForm: "Please complete all required fields",

    // Admin
    addEvent: "Add Event",
    eventAddedSuccess: "Event added successfully",

    // Language
    language: "Language",
    english: "English",
    bulgarian: "Bulgarian",
    macedonian: "Macedonian",
    serbian: "Serbian",

    // News Article Page
    backToNews: "Back to News",
    articleNotFound: "Article Not Found",
    articleNotFoundDesc: "The requested article could not be found.",
    by: "By",
    lastUpdated: "Last updated",
    failedToLoadArticle: "Failed to load article",

    // Profile
    settings: "Settings",
    account: "Account",
    upcoming: "Upcoming",
    past: "Past",
    ticket: "Ticket",
    viewDetails: "View Details",
    noTicketsYet: "No tickets yet",
    noTicketsYetDesc: "You haven't booked any tickets for upcoming performances.",
    browseProgram: "Browse Program",
    favoritePerformances: "Favorite Performances",
    noFavoritesYet: "No favorites yet",
    noFavoritesYetDesc: "You haven't added any performances to your favorites.",
    accountSettings: "Account Settings",
    personalInformation: "Personal Information",
    updateAccountDetails: "Update your account details and preferences",
    fullName: "Full Name",
    preferences: "Preferences",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Receive updates about performances and events",
    calendarIntegration: "Calendar Integration",
    calendarIntegrationDesc: "Add booked performances to your calendar",
    saveChanges: "Save Changes",
    loggedOutSuccessfully: "Logged out successfully",
    loggedOutSuccessfullyDesc: "You have been logged out of your account",
    loadingProfile: "Loading your profile...",
    performances: "Performances",

    // Program page
    filterEvents: "Filter Events",
    selectDate: "Select Date",
    selectVenue: "Select Venue",
    selectType: "Select Type",
    allDates: "All Dates",
    allVenues: "All Venues",
    allTypes: "All Types",
    listView: "List View",
    calendarView: "Calendar View",
    addToCalendar: "Add to Calendar",
    noEventsYet: "No events have been added yet. Please check back later.",
    noEventsMatchFilter: "No events match your filter criteria. Please try different filters.",

    // Event types
    performance: "Performance",
    workshop: "Workshop",
    discussion: "Discussion",
    backToNews: "Back to News",

    // About page
    aboutUs: "About Us",
    aboutText: "Welcome to Acting Europe, your premier destination for theatrical events and performances across Europe.\nWe are dedicated to bringing you the best of European theatre, from classic plays to contemporary productions,\nshowcasing the rich cultural diversity and artistic talent of the continent.\n\nOur mission is to connect theatre enthusiasts with unforgettable experiences, providing comprehensive\ninformation on upcoming shows, venues, and ticketing. We believe in the power of live performance to inspire,\nEntertain, and provoke thought, and we strive to make it accessible to everyone.\n\nFounded by a team of passionate theatre lovers, Acting Europe is committed to supporting the arts community\nand promoting cultural exchange. Join us on a journey through the vibrant world of European theatre!",
    editAboutPage: "Edit About Page",
    saveChanges: "Save Changes",

    // Contact page
    contactUs: "Contact Us",
    contactDescription: "Have a question, suggestion, or just want to say hello? We'd love to hear from you!\nPlease fill out the form below or reach out to us using the contact information provided.",
    sendMessage: "Send us a Message",
    yourName: "Your Name",
    enterYourName: "Enter your name",
    yourEmail: "Your Email",
    enterYourEmail: "Enter your email address",
    subject: "Subject",
    enterSubject: "Enter subject",
    message: "Message",
    enterYourMessage: "Enter your message",
    sendMessageButton: "Send Message",
    ourInformation: "Our Information",
    address: "Address",
    phone: "Phone",
    businessHours: "Business Hours",
    businessHoursText: "Monday - Friday, 9:00 AM - 5:00 PM (CET)",
    followUsContact: "Follow Us",
  },
  bg: {
    // Navigation
    home: "Начало",
    program: "Програма",
    participants: "Участници",
    tickets: "Билети",
    news: "Новини",
    about: "За нас",
    contact: "Контакти",
    signIn: "Вход",
    signUp: "Регистрация",
    myProfile: "Моят профил",
    myTickets: "Моите билети",
    favorites: "Любими",
    adminPanel: "Админ панел",
    logout: "Изход",

    // Home page
    heroTitle: "Актинг Европа",
    heroSubtitle: "Театър без граници",
    heroDescription: "Международен фестивал, празнуващ културния обмен и артистичното сътрудничество",
    heroDate: "18-21 септември 2025 • Кюстендил, България",
    viewProgram: "Виж програмата",
    bookTickets: "Резервирай билети",
    festivalStartsIn: "Фестивалът започва след",
    days: "Дни",
    hours: "Часа",
    minutes: "Минути",
    seconds: "Секунди",
    quickLinks: "Бързи връзки",
    latestNews: "Последни новини",
    latestNewsDesc: "Бъдете в крак с последните обявления и истории от фестивала",
    programDesc: "Разгледайте пълната програма с представления, работилници и събития",
    bookTicketsDesc: "Осигурете си места за най-очакваните представления",
    featuredPerformance: "Препоръчано представление",
    featuredPerformanceDesc: "Не пропускайте днешния акцент на фестивала",
    festivalMoments: "Моменти от фестивала",
    viewFullGallery: "Виж пълната галерия",
    ourPartners: "Нашите партньори",

    // Footer
    footerDescription:
      "Театър без граници - Международен театрален фестивал, празнуващ културния обмен и артистичното сътрудничество.",
    quickLinksFooter: "Бързи връзки",
    contactFooter: "Контакти",
    followUs: "Последвайте ни",
    subscribeNewsletter: "Абонирайте се за нашия бюлетин за актуализации",
    allRightsReserved: "Всички права запазени.",

    // Participants/Theatres
    participatingTheatres: "Участващи театри",
    theatreHistory: "История на театъра",
    gallery: "Галерия",
    foundedIn: "Основан през",
    location: "Местоположение",
    website: "Уебсайт",
    viewTheatre: "Виж театъра",
    culturalExchange: "Културен обмен чрез театър",
    culturalExchangeDesc:
      "Актинг Европа обединява тези изтъкнати театри, за да създаде уникална платформа за културен диалог и артистично сътрудничество. Всеки участващ театър допринася със своята уникална перспектива, създавайки богата тъкан от балкански театрални традиции и съвременни иновации.",

    // Registration
    marketingConsent: "Искам да получавам напомняния за представления и промоции",

    // Venues
    mainStage: "Главна сцена",
    chamberStage: "Камерна сцена",
    regularSeating: "Обикновени места",
    balconySeating: "Балконски места",
    mainSeating: "Основни места",

    // Common
    bookTicket: "Резервирай билет",
    details: "Детайли",
    readMore: "Прочети още",
    date: "Дата",
    time: "Час",
    venue: "Място",
    price: "Цена",
    total: "Общо",
    back: "Назад",
    next: "Напред",
    confirm: "Потвърди",
    cancel: "Отказ",
    save: "Запази",
    delete: "Изтрий",
    edit: "Редактирай",

    // Seat Selection
    selectSeats: "Избери места",
    selectYourSeats: "Избери своите места",
    selectedSeats: "Избрани места",
    none: "Няма",
    stage: "СЦЕНА",
    seat: "Място",
    available: "Свободно",
    selected: "Избрано",
    unavailable: "Заето",
    confirmSelection: "Потвърди избора",
    maxSeatsReached: "Достигнат максимален брой места",
    maxSeatsReachedDesc: "Можете да изберете до 5 места на резервация",
    noSeatsSelected: "Няма избрани места",
    pleaseSelectSeats: "Моля, изберете поне едно място, за да продължите",

    // Booking
    availablePerformances: "Налични представления",
    perTicket: "на билет",
    yourDetails: "Вашите данни",
    firstName: "Име",
    lastName: "Фамилия",
    email: "Имейл",
    phone: "Телефон",
    optional: "по избор",
    completeBooking: "Завърши резервацията",
    bookingConfirmed: "Резервацията е потвърдена",
    bookingConfirmedDesc: "Вашите билети са резервирани успешно",
    bookingConfirmationEmail: "Имейл за потвърждение е изпратен на вашия имейл адрес с детайли за билетите.",
    bookingDetails: "Детайли на резервацията",
    seats: "Места",
    bookAnotherTicket: "Резервирай друг билет",
    downloadTicket: "Изтегли билет",
    noPerformancesYet: "Все още няма налични представления",
    noPerformancesYetDesc: "Моля, проверете по-късно или се свържете с администратора за повече информация.",

    // Workshops
    workshops: "Работилници",
    workshopsComingSoon: "Работилниците предстоят скоро",
    workshopsComingSoonDesc: "Регистрациите за работилници ще бъдат налични скоро. Моля, проверете по-късно.",

    // Forms
    missingInformation: "Липсваща информация",
    pleaseCompleteForm: "Моля, попълнете всички задължителни полета",

    // Admin
    addEvent: "Добави събитие",
    eventAddedSuccess: "Събитието е добавено успешно",

    // Language
    language: "Език",
    english: "Английски",
    bulgarian: "Български",
    macedonian: "Македонски",
    serbian: "Сръбски",

    // News Article Page
    backToNews: "Назад към новините",
    articleNotFound: "Статията не е намерена",
    articleNotFoundDesc: "Заявената статия не може да бъде намерена.",
    by: "От",
    lastUpdated: "Последно обновено",
    failedToLoadArticle: "Неуспешно зареждане на статията",

    // Profile
    settings: "Настройки",
    account: "Акаунт",
    upcoming: "Предстоящи",
    past: "Минали",
    ticket: "Билет",
    viewDetails: "Виж детайли",
    noTicketsYet: "Все още няма билети",
    noTicketsYetDesc: "Не сте резервирали билети за предстоящи представления.",
    browseProgram: "Разгледай програмата",
    favoritePerformances: "Любими представления",
    noFavoritesYet: "Все още няма любими",
    noFavoritesYetDesc: "Не сте добавили представления към любимите си.",
    accountSettings: "Настройки на акаунта",
    personalInformation: "Лична информация",
    updateAccountDetails: "Актуализирайте данните и предпочитанията на акаунта си",
    fullName: "Пълно име",
    preferences: "Предпочитания",
    emailNotifications: "Имейл известия",
    emailNotificationsDesc: "Получавайте актуализации за представления и събития",
    calendarIntegration: "Интеграция с календар",
    calendarIntegrationDesc: "Добавяйте резервирани представления към календара си",
    saveChanges: "Запази промените",
    loggedOutSuccessfully: "Успешно излизане",
    loggedOutSuccessfullyDesc: "Излязохте успешно от акаунта си",
    loadingProfile: "Зареждане на профила...",
    performances: "Представления",

    // Program page
    filterEvents: "Филтрирай събития",
    selectDate: "Избери дата",
    selectVenue: "Избери място",
    selectType: "Избери тип",
    allDates: "Всички дати",
    allVenues: "Всички места",
    allTypes: "Всички типове",
    listView: "Списъчен изглед",
    calendarView: "Календарен изглед",
    addToCalendar: "Добави в календар",
    noEventsYet: "Все още няма добавени събития. Моля, проверете по-късно.",
    noEventsMatchFilter: "Няма събития, отговарящи на критериите за филтриране. Моля, опитайте с различни филтри.",

    // Event types
    performance: "Представление",
    workshop: "Работилница",
    discussion: "Дискусия",
    backToNews: "Назад към новините",

    // About page
    aboutUs: "За нас",
    aboutText: "Добре дошли в Актинг Европа, вашата основна дестинация за театрални събития и представления в цяла Европа.\nНие сме посветени да ви донесем най-доброто от европейския театър, от класически драми до съвременни продукции,\nпоказвайки богатото културно разнообразие и артистичен талант на континента.\n\nНашата мисия е да свържем театралните ентусиасти с незабравими преживявания, предоставяйки изчерпателна\nинформация за предстоящи представления, места и билетиране. Ние вярваме в силата на живото представление да вдъхновява,\nзабавлява и предизвиква размисъл, и се стремим да го направим достъпно за всички.\n\nОснована от екип от страстни любители на театъра, Актинг Европа е посветена на подкрепата на артистичната общност\nи насърчаването на културния обмен. Присъединете се към нас в пътешествие през живия свят на европейския театър!",
    editAboutPage: "Редактирай страницата за нас",
    saveChanges: "Запази промените",

    // Contact page
    contactUs: "Свържете се с нас",
    contactDescription: "Имате въпрос, предложение или просто искате да поздравите? Бихме искали да чуем от вас!\nМоля, попълнете формуляра по-долу или се свържете с нас, използвайки контактната информация.",
    sendMessage: "Изпратете ни съобщение",
    yourName: "Вашето име",
    enterYourName: "Въведете вашето име",
    yourEmail: "Вашият имейл",
    enterYourEmail: "Въведете вашия имейл адрес",
    subject: "Тема",
    enterSubject: "Въведете тема",
    message: "Съобщение",
    enterYourMessage: "Въведете вашето съобщение",
    sendMessageButton: "Изпрати съобщение",
    ourInformation: "Наша информация",
    address: "Адрес",
    phone: "Телефон",
    businessHours: "Работно време",
    businessHoursText: "Понеделник - Петък, 9:00 - 17:00 (CET)",
    followUsContact: "Последвайте ни",
  },
  mk: {
    // Navigation
    home: "Дома",
    program: "Програма",
    participants: "Учесници",
    tickets: "Билети",
    news: "Вести",
    about: "За нас",
    contact: "Контакт",
    signIn: "Најава",
    signUp: "Регистрирај се",
    myProfile: "Мој профил",
    myTickets: "Мои билети",
    favorites: "Омилени",
    adminPanel: "Админ панел",
    logout: "Одјава",

    // Home page
    heroTitle: "Актинг Европа",
    heroSubtitle: "Театар без граници",
    heroDescription: "Меѓународен фестивал што ја слави културната размена и уметничката соработка",
    heroDate: "18-21 септември 2025 • Ќустендил, Бугарија",
    viewProgram: "Погледни програма",
    bookTickets: "Резервирај билети",
    festivalStartsIn: "Фестивалот започнува за",
    days: "Денови",
    hours: "Часови",
    minutes: "Минути",
    seconds: "Секунди",
    quickLinks: "Брзи врски",
    latestNews: "Последни вести",
    latestNewsDesc: "Останете во тек со најновите објави и приказни од фестивалот",
    programDesc: "Истражете ја целосната програма со претстави, работилници и настани",
    bookTicketsDesc: "Обезбедете си места за најочекуваните претстави",
    featuredPerformance: "Препорачана претстава",
    featuredPerformanceDesc: "Не го пропуштете денешниот акцент на фестивалот",
    festivalMoments: "Моменти од фестивалот",
    viewFullGallery: "Погледни ја целата галерија",
    ourPartners: "Нашите партнери",

    // Footer
    footerDescription:
      "Театар без граници - Меѓународен театарски фестивал што ја слави културната размена и уметничката соработка.",
    quickLinksFooter: "Брзи врски",
    contactFooter: "Контакт",
    followUs: "Следете не",
    subscribeNewsletter: "Претплатете се на нашиот билтен за ажурирања",
    allRightsReserved: "Сите права се задржани.",

    // Participants/Theatres
    participatingTheatres: "Учеснички театри",
    theatreHistory: "Историја на театарот",
    gallery: "Галерија",
    foundedIn: "Основан во",
    location: "Локација",
    website: "Веб-страна",
    viewTheatre: "Погледни театар",
    culturalExchange: "Културна размена преку театар",
    culturalExchangeDesc:
      "Актинг Европа ги обединува овие истакнати театри за да создаде единствена платформа за културен дијалог и уметничка соработка. Секој учеснички театар придонесува со својата единствена перспектива, создавајќи богата ткаенина од балкански театарски традиции и современи иновации.",

    // Registration
    marketingConsent: "Сакам да примам потсетувања за претстави и промоции",

    // Venues
    mainStage: "Главна сцена",
    chamberStage: "Камерна сцена",
    regularSeating: "Редовни седишта",
    balconySeating: "Балконски седишта",
    mainSeating: "Главни седишта",

    // Common
    bookTicket: "Резервирај билет",
    details: "Детали",
    readMore: "Прочитај повеќе",
    date: "Датум",
    time: "Време",
    venue: "Место",
    price: "Цена",
    total: "Вкупно",
    back: "Назад",
    next: "Следно",
    confirm: "Потврди",
    cancel: "Откажи",
    save: "Зачувај",
    delete: "Избриши",
    edit: "Измени",

    // Seat Selection
    selectSeats: "Избери седишта",
    selectYourSeats: "Избери ги твоите седишта",
    selectedSeats: "Избрани седишта",
    none: "Нема",
    stage: "СЦЕНА",
    seat: "Седиште",
    available: "Достапно",
    selected: "Избрано",
    unavailable: "Недостапно",
    confirmSelection: "Потврди избор",
    maxSeatsReached: "Достигнат максимален број седишта",
    maxSeatsReachedDesc: "Можете да изберете до 5 седишта по резервација",
    noSeatsSelected: "Нема избрани седишта",
    pleaseSelectSeats: "Ве молиме изберете најмалку едно седиште за да продолжите",

    // Booking
    availablePerformances: "Достапни претстави",
    perTicket: "по билет",
    yourDetails: "Вашите податоци",
    firstName: "Име",
    lastName: "Презиме",
    email: "Е-маил",
    phone: "Телефон",
    optional: "по избор",
    completeBooking: "Заврши резервација",
    bookingConfirmed: "Резервацијата е потврдена",
    bookingConfirmedDesc: "Вашите билети се успешно резервирани",
    bookingConfirmationEmail: "Е-маил за потврдување е испратен на вашата адреса со деталите за билетите.",
    bookingDetails: "Детали за резервацијата",
    performance: "Претстава",
    seats: "Седишта",
    bookAnotherTicket: "Резервирај друг билет",
    downloadTicket: "Преземи билет",
    noPerformancesYet: "Сè уште нема достапни претстави",
    noPerformancesYetDesc: "Ве молиме проверете подоцна или контактирајте го администраторот за повеќе информации.",

    // Workshops
    workshops: "Работилници",
    workshopsComingSoon: "Работилниците доаѓаат наскоро",
    workshopsComingSoonDesc: "Регистрациите за работилници ќе бидат достапни наскоро. Ве молиме проверете подоцна.",

    // Forms
    missingInformation: "Недостасуваат информации",
    pleaseCompleteForm: "Ве молиме пополнете ги сите задолжителни полиња",

    // Admin
    addEvent: "Додај настан",
    eventAddedSuccess: "Настанот е успешно додаден",

    // Language
    language: "Јазик",
    english: "Англиски",
    bulgarian: "Бугарски",
    macedonian: "Македонски",
    serbian: "Српски",

    // News Article Page
    backToNews: "Назад кон вестите",
    articleNotFound: "Статијата не е пронајдена",
    articleNotFoundDesc: "Побараната статија не може да биде пронајдена.",
    by: "Од",
    lastUpdated: "Последно ажурирано",
    failedToLoadArticle: "Неуспешно вчитување на статијата",

    // Profile
    settings: "Поставки",
    account: "Сметка",
    upcoming: "Претстојни",
    past: "Минати",
    ticket: "Билет",
    viewDetails: "Погледни детали",
    noTicketsYet: "Сè уште нема билети",
    noTicketsYetDesc: "Не сте резервирале билети за претстојни претстави.",
    browseProgram: "Прегледај програма",
    favoritePerformances: "Омилени претстави",
    noFavoritesYet: "Сè уште нема омилени",
    noFavoritesYetDesc: "Не сте додале претстави во вашите омилени.",
    accountSettings: "Поставки на сметката",
    personalInformation: "Лични информации",
    updateAccountDetails: "Ажурирајте ги податоците и преференците на вашата сметка",
    fullName: "Полно име",
    preferences: "Преференци",
    emailNotifications: "Е-маил известувања",
    emailNotificationsDesc: "Примајте ажурирања за претстави и настани",
    calendarIntegration: "Интеграција со календар",
    calendarIntegrationDesc: "Додавајте резервирани претстави во вашиот календар",
    saveChanges: "Зачувај промени",
    loggedOutSuccessfully: "Успешна одјава",
    loggedOutSuccessfullyDesc: "Успешно се одјавивте од вашата сметка",
    loadingProfile: "Се вчитува вашиот профил...",
    performances: "Претстави",

    // Program page
    filterEvents: "Филтрирај настани",
    selectDate: "Избери датум",
    selectVenue: "Избери место",
    selectType: "Избери тип",
    allDates: "Сите датуми",
    allVenues: "Сите места",
    allTypes: "Сите типови",
    listView: "Преглед на листа",
    calendarView: "Календарски преглед",
    addToCalendar: "Додади во календар",
    noEventsYet: "Сѐ уште нема додадени настани. Проверете подоцна.",
    noEventsMatchFilter: "Нема настани што одговараат на вашите критериуми за филтрирање. Пробајте различни филтри.",

    // Event types
    performance: "Претстава",
    workshop: "Работилница",
    discussion: "Дискусија",
    backToNews: "Назад кон вестите",

    // About page
    aboutUs: "За нас",
    aboutText: "Добредојдовте во Актинг Европа, вашата главна дестинација за театарски настани и претстави низ Европа.\nНие сме посветени да ви го донесеме најдоброто од европскиот театар, од класични драми до современи продукции,\nприкажувајќи го богатото културно разновидност и уметнички талент на континентот.\n\nНашата мисија е да ги поврземе театарските ентузијасти со незаборавни искуства, обезбедувајќи сеопфатни\nинформации за претстојните претстави, места и билетирање. Ние веруваме во моќта на живата претстава да инспирира,\nзабавува и предизвикува размислување, и се стремиме да ја направиме достапна за сите.\n\nОснована од тим на страсни љубители на театарот, Актинг Европа е посветена на поддршката на уметничката заедница\nи промовирањето на културната размена. Придружете ни се на патување низ живиот свет на европскиот театар!",
    editAboutPage: "Уреди страница за нас",
    saveChanges: "Зачувај промени",

    // Contact page
    contactUs: "Контактирајте не",
    contactDescription: "Имате прашање, предлог или само сакате да поздравите? Би сакале да слушнеме од вас!\nВе молиме пополнете го формуларот подолу или контактирајте не користејќи ги контакт информациите.",
    sendMessage: "Испратете ни порака",
    yourName: "Вашето име",
    enterYourName: "Внесете го вашето име",
    yourEmail: "Вашиот е-маил",
    enterYourEmail: "Внесете ја вашата е-маил адреса",
    subject: "Предмет",
    enterSubject: "Внесете предмет",
    message: "Порака",
    enterYourMessage: "Внесете ја вашата порака",
    sendMessageButton: "Испрати порака",
    ourInformation: "Наши информации",
    address: "Адреса",
    phone: "Телефон",
    businessHours: "Работно време",
    businessHoursText: "Понеделник - Петок, 9:00 - 17:00 (CET)",
    followUsContact: "Следете не",
  },
  sr: {
    // Navigation
    home: "Почетна",
    program: "Програм",
    participants: "Учесници",
    tickets: "Карте",
    news: "Вести",
    about: "О нама",
    contact: "Контакт",
    signIn: "Пријави се",
    signUp: "Региструј се",
    myProfile: "Мој профил",
    myTickets: "Моје карте",
    favorites: "Омиљени",
    adminPanel: "Админ панел",
    logout: "Одјави се",

    // Home page
    heroTitle: "Актинг Европа",
    heroSubtitle: "Позориште без граница",
    heroDescription: "Међународни фестивал који слави културну размену и уметничку сарадњу",
    heroDate: "18-21. септембар 2025. • Ћустендил, Бугарска",
    viewProgram: "Погледај програм",
    bookTickets: "Резервиши карте",
    festivalStartsIn: "Фестивал почиње за",
    days: "Дана",
    hours: "Сати",
    minutes: "Минута",
    seconds: "Секунди",
    quickLinks: "Брзе везе",
    latestNews: "Најновије вести",
    latestNewsDesc: "Останите у току са најновијим објавама и причама са фестивала",
    programDesc: "Истражите комплетан програм представа, радионица и догађаја",
    bookTicketsDesc: "Обезбедите своја места за најочекиваније представе",
    featuredPerformance: "Препоручена представа",
    featuredPerformanceDesc: "Не пропустите данашњи акценат фестивала",
    festivalMoments: "Моменти са фестивала",
    viewFullGallery: "Погледај комплетну галерију",
    ourPartners: "Наши партнери",

    // Footer
    footerDescription:
      "Позориште без граница - Међународни позоришни фестивал који слави културну размену и уметничку сарадњу.",
    quickLinksFooter: "Брзе везе",
    contactFooter: "Контакт",
    followUs: "Пратите нас",
    subscribeNewsletter: "Претплатите се на наш билтен за ажурирања",
    allRightsReserved: "Сва права задржана.",

    // Participants/Theatres
    participatingTheatres: "Позоришта учесници",
    theatreHistory: "Историја позоришта",
    gallery: "Галерија",
    foundedIn: "Основано",
    location: "Локација",
    website: "Веб сајт",
    viewTheatre: "Погледај позориште",
    culturalExchange: "Културна размена кроз позориште",
    culturalExchangeDesc:
      "Актинг Европа окупља ова угледна позоришта како би створила јединствену платформу за културни дијалог и уметничку сарадњу. Свако позориште учесник доприноси својом јединственом перспективом, стварајући богату слику балканских позоришних традиција и савремених иновација.",

    // Registration
    marketingConsent: "Желим да примам подсетнике о представама и промоцијама",

    // Venues
    mainStage: "Главна сцена",
    chamberStage: "Камерна сцена",
    regularSeating: "Редовна седишта",
    balconySeating: "Балконска седишта",
    mainSeating: "Главна седишта",

    // Common
    bookTicket: "Резервиши карту",
    details: "Детаљи",
    readMore: "Прочитај више",
    date: "Датум",
    time: "Време",
    venue: "Место",
    price: "Цена",
    total: "Укупно",
    back: "Назад",
    next: "Следеће",
    confirm: "Потврди",
    cancel: "Откажи",
    save: "Сачувај",
    delete: "Обриши",
    edit: "Измени",

    // Seat Selection
    selectSeats: "Изабери седишта",
    selectYourSeats: "Изабери своја седишта",
    selectedSeats: "Изабрана седишта",
    none: "Ниједно",
    stage: "СЦЕНА",
    seat: "Седиште",
    available: "Доступно",
    selected: "Изабрано",
    unavailable: "Недоступно",
    confirmSelection: "Потврди избор",
    maxSeatsReached: "Достигнут максималан број седишта",
    maxSeatsReachedDesc: "Можете изабрати до 5 седишта по резервацији",
    noSeatsSelected: "Нема изабраних седишта",
    pleaseSelectSeats: "Молимо изаберите најмање једно седиште да наставите",

    // Booking
    availablePerformances: "Доступне представе",
    perTicket: "по карти",
    yourDetails: "Ваши подаци",
    firstName: "Име",
    lastName: "Презиме",
    email: "Е-маил",
    phone: "Телефон",
    optional: "опционо",
    completeBooking: "Заврши резервацију",
    bookingConfirmed: "Резервација потврђена",
    bookingConfirmedDesc: "Ваше карте су успешно резервисане",
    bookingConfirmationEmail: "Е-маил за потврду је послат на вашу адресу са детаљима о картама.",
    bookingDetails: "Детаљи резервације",
    performance: "Представа",
    seats: "Седишта",
    bookAnotherTicket: "Резервиши другу карту",
    downloadTicket: "Преузми карту",
    noPerformancesYet: "Још увек нема доступних представа",
    noPerformancesYetDesc: "Молимо проверите касније или контактирајте администратора за више информација.",

    // Workshops
    workshops: "Радионице",
    workshopsComingSoon: "Радионице ускоро",
    workshopsComingSoonDesc: "Регистрације за радионице ће бити доступне ускоро. Молимо проверите касније.",

    // Forms
    missingInformation: "Недостајуће информације",
    pleaseCompleteForm: "Молимо попуните сва обавезна поља",

    // Admin
    addEvent: "Додај догађај",
    eventAddedSuccess: "Догађај је успешно додат",

    // Language
    language: "Језик",
    english: "Енглески",
    bulgarian: "Бугарски",
    macedonian: "Македонски",
    serbian: "Српски",

    // News Article Page
    backToNews: "Назад на вести",
    articleNotFound: "Чланак није пронађен",
    articleNotFoundDesc: "Тражени чланак није могао бити пронађен.",
    by: "Од",
    lastUpdated: "Последње ажурирано",
    failedToLoadArticle: "Неуспешно учитавање чланка",

    // Profile
    settings: "Подешавања",
    account: "Налог",
    upcoming: "Предстојеће",
    past: "Прошле",
    ticket: "Карта",
    viewDetails: "Погледај детаље",
    noTicketsYet: "Још увек нема карата",
    noTicketsYetDesc: "Нисте резервисали карте за предстојеће представе.",
    browseProgram: "Прегледај програм",
    favoritePerformances: "Омиљене представе",
    noFavoritesYet: "Још увек нема омиљених",
    noFavoritesYetDesc: "Нисте додали представе у своје омиљене.",
    accountSettings: "Подешавања налога",
    personalInformation: "Личне информације",
    updateAccountDetails: "Ажурирајте податке и преференце свог налога",
    fullName: "Пуно име",
    preferences: "Преференце",
    emailNotifications: "Е-маил обавештења",
    emailNotificationsDesc: "Примајте ажурирања о представама и догађајима",
    calendarIntegration: "Интеграција са календаром",
    calendarIntegrationDesc: "Додајте резервисане представе у свој календар",
    saveChanges: "Сачувај промене",
    loggedOutSuccessfully: "Успешна одјава",
    loggedOutSuccessfullyDesc: "Успешно сте се одјавили са свог налога",
    loadingProfile: "Учитавање вашег профила...",
    performances: "Представе",

    // Program page
    filterEvents: "Филтрирај догађаје",
    selectDate: "Изабери датум",
    selectVenue: "Изабери место",
    selectType: "Изабери тип",
    allDates: "Сви датуми",
    allVenues: "Сва места",
    allTypes: "Сви типови",
    listView: "Преглед листе",
    calendarView: "Календарски преглед",
    addToCalendar: "Додај у календар",
    noEventsYet: "Још увек нема додатих догађаја. Молимо проверите касније.",
    noEventsMatchFilter:
      "Нема догађаја који одговарају вашим критеријумима филтрирања. Покушајте са другачијим филтрима.",

    // Event types
    performance: "Представа",
    workshop: "Радионица",
    discussion: "Дискусија",
    backToNews: "Назад на вести",

    // About page
    aboutUs: "О нама",
    aboutText: "Добродошли у Актинг Европу, вашу главну дестинацију за позоришне догађаје и представе широм Европе.\nПосвећени смо томе да вам донесемо најбоље од европског позоришта, од класичних драма до савремених продукција,\nприказујући богато културно разноликост и уметнички талент континента.\n\nНаша мисија је да повежемо позоришне ентузијасте са незаборавним искуствима, пружајући свеобухватне\nинформације о предстојећим представама, местима и продаји карата. Верујемо у моћ живе представе да инспирише,\nзабави и изазове размишљање, и тежимо да је учинимо доступном свима.\n\nОснована од стране тима страсних љубитеља позоришта, Актинг Европа је посвећена подршци уметничке заједнице\nи промовисању културне размене. Придружите нам се на путовању кроз живахан свет европског позоришта!",
    editAboutPage: "Уреди страницу о нама",
    saveChanges: "Сачувај промене",

    // Contact page
    contactUs: "Контактирајте нас",
    contactDescription: "Имате питање, предлог или само желите да поздравите? Волели бисмо да чујемо од вас!\nМолимо попуните формулар испод или нас контактирајте користећи контакт информације.",
    sendMessage: "Пошаљите нам поруку",
    yourName: "Ваше име",
    enterYourName: "Унесите ваше име",
    yourEmail: "Ваш е-маил",
    enterYourEmail: "Унесите вашу е-маил адресу",
    subject: "Предмет",
    enterSubject: "Унесите предмет",
    message: "Порука",
    enterYourMessage: "Унесите вашу поруку",
    sendMessageButton: "Пошаљи поруку",
    ourInformation: "Наше информације",
    address: "Адреса",
    phone: "Телефон",
    businessHours: "Радно време",
    businessHoursText: "Понедељак - Петак, 9:00 - 17:00 (CET)",
    followUsContact: "Пратите нас",
  },
}

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("actingEurope_language") as Language
    if (savedLanguage && ["en", "bg", "mk", "sr"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("actingEurope_language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
