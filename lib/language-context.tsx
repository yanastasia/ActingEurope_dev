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
    participantsDescription: "Discover the talented theatres participating in Acting Europe 2025",
    participatingTheatres: "Participating Theatres",
    theatreName: "Theatre Name",
    theatreHistory: "Theatre History",
    gallery: "Gallery",
    founded: "Founded",
    foundedIn: "Founded in",
    location: "Location",
    website: "Website",
    viewTheatre: "View Theatre",
    more: "More",
    learnMore: "Learn More",
    visitWebsite: "Visit Website",
    history: "History",
    tags: "Tags",
    culturalExchange: "Cultural Exchange Through Theatre",
    culturalExchangeDesc:
      "Acting Europe brings together these distinguished theatres to create a unique platform for cultural dialogue and artistic collaboration. Each participating theatre contributes its unique perspective, creating a rich tapestry of Balkan theatrical traditions and contemporary innovations.",

    // Authentication
    welcomeBack: "Welcome Back",
    joinActingEurope: "Join Acting Europe",
    signInToAccount: "Sign in to access your Acting Europe account",
    enterCredentials: "Enter your credentials to access your account",
    registerToBook: "Register to book tickets and access exclusive content",
    createAccountToBook: "Create an account to book tickets and access exclusive content",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    showPassword: "Show password",
    hidePassword: "Hide password",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    bySigningIn: "By signing in, you agree to our",
    byCreatingAccount: "By creating an account, you agree to our",
    and: "and",
    verificationEmailSent: "Verification Email Sent",
    checkEmailToComplete: "Please check your email to complete your registration",
    verificationEmailSentTo: "We've sent a verification email to",
    clickVerificationLink: "Please click the verification link in the email to complete your registration. The link will expire in 24 hours.",
    returnToHome: "Return to Home",
    didntReceiveEmail: "Didn't receive the email?",
    resendVerificationEmail: "Resend verification email",
    sending: "Sending...",
    loggedInSuccessfully: "Logged in successfully",
    welcomeBackToActingEurope: "Welcome back to Acting Europe",
    asAdministrator: " as Administrator",
    verificationEmailResent: "Verification email resent",
    failedToResendEmail: "Failed to resend verification email. Please try again.",
    passwordsDoNotMatch: "Passwords do not match",
    signupFailed: "Signup failed",
    loginFailed: "Login failed",
    failedToSendVerificationEmail: "Failed to send verification email. Please try again.",
    somethingWentWrong: "Something went wrong",
    error: "Error",

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
    duration: "Duration",
    director: "Director",
    cast: "Cast",
    synopsis: "Synopsis",
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
    ticketsNotReleased: "Tickets are yet to be released",
    ticketsNotReleasedDesc: "Seat selection is temporarily disabled. Please check back later.",
    
    // Ticket Reservation Page
    ticketReservationTitle: "Ticket Reservations",
    ticketReservationSubtitle: "Tickets will be available soon",
    ticketAvailabilityTitle: "Tickets Coming Soon",
    ticketAvailabilityMessage: "Ticket reservation for Acting Europe 2025 will open at a later date. We're working hard to finalize all the details to bring you the best possible experience.",
    stayUpdatedTitle: "Stay Updated with Acting Europe",
    registerForUpdatesMessage: "Register for an account to stay updated with all Acting Europe news, events, and be the first to know when tickets become available!",
    registerNow: "Register Now",
    exploreWhileWaiting: "While you wait, explore what Acting Europe has to offer:",
    thankYou: "Thank You!",
    emailSubmittedMessage: "We've added your email to our notification list. You'll be among the first to know when tickets become available!",
    backToHome: "Back to Home",
    
    // Performance page specific
    bookYourTickets: "Book Your Tickets",
    subtitles: "Subtitles:",
    suitableForAges: "Suitable for ages 12+",
    addToCalendar: "Add to Calendar",
    needAssistance: "Need assistance?",
    contactBoxOffice: "Contact our box office at:",

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

    // Cities
    kyustendil: "Kyustendil",
    sofia: "Sofia",
    skopje: "Skopje",
    nis: "Niš",
    bitola: "Bitola",

    // Countries
    bulgaria: "Bulgaria",
    northMacedonia: "North Macedonia",
    serbia: "Serbia",

    // Theatre Tags
    regionalTheatre: "Regional Theatre",
    bulgarianDrama: "Bulgarian Drama",
    contemporaryWorks: "Contemporary Works",
    communityTheatre: "Community Theatre",
    nationalTheatre: "National Theatre",
    classicalDrama: "Classical Drama",
    bulgarianHeritage: "Bulgarian Heritage",
    historicVenue: "Historic Venue",
    macedonianCulture: "Macedonian Culture",
    internationalCollaborations: "International Collaborations",
    culturalIdentity: "Cultural Identity",
    serbianTheatre: "Serbian Theatre",
    contemporaryPlays: "Contemporary Plays",
    independentTheatre: "Independent Theatre",
    experimental: "Experimental",
    contemporary: "Contemporary",
    bulgarianTheatre: "Bulgarian Theatre",
    intimateTheatre: "Intimate Theatre",
    localProductions: "Local Productions",

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
    preferences: "Preferences",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Receive updates about performances and events",
    calendarIntegration: "Calendar Integration",
    calendarIntegrationDesc: "Add booked performances to your calendar",
    saveChanges: "Save Changes",
    loggedOutSuccessfully: "Logged out successfully",
    loggedOutSuccessfullyDesc: "You have been logged out of your account",
    loading: "Loading",
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
    noEventsYet: "No events have been added yet. Please check back later.",
    noEventsMatchFilter: "No events match your filter criteria. Please try different filters.",

    // Venue translations
    "Main Stage": "Main Stage",
    "Chamber Stage": "Chamber Stage",

    // Event types
    performance: "Performance",
    workshop: "Workshop",
    discussion: "Discussion",

    // About page
    aboutUs: "About Us",
    aboutText: "Welcome to Acting Europe, your premier destination for theatrical events and performances across Europe.\nWe are dedicated to bringing you the best of European theatre, from classic plays to contemporary productions,\nshowcasing the rich cultural diversity and artistic talent of the continent.\n\nOur mission is to connect theatre enthusiasts with unforgettable experiences, providing comprehensive\ninformation on upcoming shows, venues, and ticketing. We believe in the power of live performance to inspire,\nEntertain, and provoke thought, and we strive to make it accessible to everyone.\n\nFounded by a team of passionate theatre lovers, Acting Europe is committed to supporting the arts community\nand promoting cultural exchange. Join us on a journey through the vibrant world of European theatre!",
    editAboutPage: "Edit About Page",

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
    about: "Инфо",
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
    participantsDescription: "Открийте талантливите театри, участващи в Актинг Европа 2025",
    participatingTheatres: "Участващи театри",
    theatreName: "Име на театъра",
    theatreHistory: "История на театъра",
    gallery: "Галерия",
    founded: "Основан",
    foundedIn: "Основан през",
    location: "Местоположение",
    website: "Уебсайт",
    viewTheatre: "Виж театъра",
    more: "Повече",
    learnMore: "Научи повече",
    visitWebsite: "Посети уебсайта",
    history: "История",
    tags: "Етикети",
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
    duration: "Продължителност",
    director: "Режисьор",
    cast: "Актьорски състав",
    synopsis: "Синопсис",
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
    ticketsNotReleased: "Билетите все още не са пуснати",
    ticketsNotReleasedDesc: "Избирането на места е временно деактивирано. Моля, проверете по-късно.",
    
    // Ticket Reservation Page
    ticketReservationTitle: "Резервации за билети",
    ticketReservationSubtitle: "Билетите ще бъдат налични скоро",
    ticketAvailabilityTitle: "Билетите предстоят скоро",
    ticketAvailabilityMessage: "Резервацията на билети за Актинг Европа 2025 ще започне по-късно. Работим усилено, за да финализираме всички детайли и да ви предоставим най-доброто възможно преживяване.",
    stayUpdatedTitle: "Останете в крак с Актинг Европа",
    registerForUpdatesMessage: "Регистрирайте сe, за да останете в крак с всички новини, събития на Актинг Европа и да бъдете първите, които ще научат кога билетите стават налични!",
    registerNow: "Регистрирайте се сега",
    exploreWhileWaiting: "Докато чакате, разгледайте какво предлага Актинг Европа:",
    thankYou: "Благодарим ви!",
    emailSubmittedMessage: "Добавихме вашия имейл в нашия списък за уведомления. Ще бъдете сред първите, които ще научат кога билетите стават налични!",
    backToHome: "Обратно към началото",
    
    // Performance page specific
    bookYourTickets: "Резервирайте билетите си",
    subtitles: "Субтитри:",
    suitableForAges: "Подходящо за възраст 12+",
    addToCalendar: "Добави в календара",
    needAssistance: "Нуждаете се от помощ?",
    contactBoxOffice: "Свържете се с нашата каса на:",

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

    // Cities
    kyustendil: "Кюстендил",
    sofia: "София",
    skopje: "Скопие",
    nis: "Ниш",
    bitola: "Битоля",

    // Countries
    bulgaria: "България",
    northMacedonia: "Северна Македония",
    serbia: "Сърбия",

    // Theatre Tags
    regionalTheatre: "Регионален театър",
    bulgarianDrama: "Българска драма",
    contemporaryWorks: "Съвременни произведения",
    communityTheatre: "Общностен театър",
    nationalTheatre: "Национален театър",
    classicalDrama: "Класическа драма",
    bulgarianHeritage: "Българско наследство",
    historicVenue: "Историческо място",
    macedonianCulture: "Македонска култура",
    internationalCollaborations: "Международни сътрудничества",
    culturalIdentity: "Културна идентичност",
    serbianTheatre: "Сръбски театър",
    contemporaryPlays: "Съвременни пиеси",
    independentTheatre: "Независим театър",
    experimental: "Експериментален",
    contemporary: "Съвременен",
    bulgarianTheatre: "Български театър",
    intimateTheatre: "Интимен театър",
    localProductions: "Местни продукции",

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
    loggedOutSuccessfullyDesc: "Излязохте от акаунта си",
    loading: "Зареждане",
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
    noEventsYet: "Все още няма добавени събития. Моля, проверете по-късно.",
    noEventsMatchFilter: "Няма събития, отговарящи на критериите за филтриране. Моля, опитайте с различни филтри.",

    // Venue translations
    "Main Stage": "Главна Сцена",
    "Chamber Stage": "Камерна Сцена",

    // Event types
    performance: "Представление",
    workshop: "Работилница",
    discussion: "Дискусия",

    // About page
    aboutUs: "За нас",
    aboutText: "Добре дошли в Актинг Европа, вашата основна дестинация за театрални събития и представления в цяла Европа.\nНие сме посветени да ви донесем най-доброто от европейския театър, от класически драми до съвременни продукции,\nпоказвайки богатото културно разнообразие и артистичен талант на континента.\n\nНашата мисия е да свържем театралните ентусиасти с незабравими преживявания, предоставяйки изчерпателна\nинформация за предстоящи представления, места и билетиране. Ние вярваме в силата на живото представление да вдъхновява,\nзабавлява и предизвиква размисъл, и се стремим да го направим достъпно за всички.\n\nОснована от екип от страстни любители на театъра, Актинг Европа е посветена на подкрепата на артистичната общност\nи насърчаването на културния обмен. Присъединете се към нас в пътешествие през живия свят на европейския театър!",
    editAboutPage: "Редактирай страницата за нас",

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
    businessHours: "Работно време",
    businessHoursText: "Понеделник - Петък, 9:00 - 17:00 (CET)",
    followUsContact: "Последвайте ни",

    // Authentication
    welcomeBack: "Добре дошли отново",
    joinActingEurope: "Присъединете се към Актинг Европа",
    signInToAccount: "Влезте в акаунта си в Актинг Европа",
    enterCredentials: "Въведете данните си за достъп до акаунта",
    registerToBook: "Регистрирайте се, за да резервирате билети и да получите достъп до ексклузивно съдържание",
    createAccountToBook: "Създайте акаунт, за да резервирате билети и да получите достъп до ексклузивно съдържание",
    email: "Имейл",
    password: "Парола",
    confirmPassword: "Потвърдете паролата",
    createAccount: "Създай акаунт",
    signingIn: "Влизане...",
    creatingAccount: "Създаване на акаунт...",
    showPassword: "Покажи паролата",
    hidePassword: "Скрий паролата",
    dontHaveAccount: "Нямате акаунт?",
    alreadyHaveAccount: "Вече имате акаунт?",
    termsOfService: "Условия за ползване",
    privacyPolicy: "Политика за поверителност",
    bySigningIn: "С влизането се съгласявате с нашите",
    byCreatingAccount: "Със създаването на акаунт се съгласявате с нашите",
    and: "и",
    verificationEmailSent: "Имейл за потвърждение е изпратен",
    checkEmailToComplete: "Моля, проверете имейла си, за да завършите регистрацията",
    verificationEmailSentTo: "Изпратихме имейл за потвърждение до",
    clickVerificationLink: "Моля, кликнете върху връзката за потвърждение в имейла, за да завършите регистрацията. Връзката ще изтече след 24 часа.",
    returnToHome: "Върнете се към началото",
    didntReceiveEmail: "Не получихте имейла?",
    resendVerificationEmail: "Изпратете отново имейл за потвърждение",
    sending: "Изпращане...",
    loggedInSuccessfully: "Успешно влизане",
    welcomeBackToActingEurope: "Добре дошли отново в Актинг Европа",
    asAdministrator: " като администратор",
    verificationEmailResent: "Имейлът за потвърждение е изпратен отново",
    failedToResendEmail: "Неуспешно изпращане на имейл за потвърждение. Моля, опитайте отново.",
    passwordsDoNotMatch: "Паролите не съвпадат",
    signupFailed: "Регистрацията неуспешна",
    loginFailed: "Влизането неуспешно",
    failedToSendVerificationEmail: "Неуспешно изпращане на имейл за потвърждение. Моля, опитайте отново.",
    somethingWentWrong: "Нещо се обърка",
    error: "Грешка",

    // Registration
    signupDisclaimer: "Регистрирайки се, вие се съгласявате да получавате промоционални имейли от Актинг Европа.",
  },
  mk: {
    // Navigation
    home: "Почетна",
    program: "Програма",
    participants: "Учесници",
    tickets: "Билети",
    news: "Вести",
    about: "Инфо",
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
    participantsDescription: "Откријте ги талентираните театри што учествуваат во Актинг Европа 2025",
    participatingTheatres: "Учеснички театри",
    theatreName: "Име на театарот",
    theatreHistory: "Историја на театарот",
    gallery: "Галерија",
    founded: "Основан",
    foundedIn: "Основан во",
    location: "Локација",
    website: "Веб-страна",
    viewTheatre: "Погледни театар",
    more: "Повеќе",
    learnMore: "Научи повеќе",
    visitWebsite: "Посети веб-страна",
    history: "Историја",
    tags: "Ознаки",
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
    duration: "Времетраење",
    director: "Режисер",
    cast: "Актерски состав",
    synopsis: "Синопсис",
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
    seats: "Седишта",
    bookAnotherTicket: "Резервирај друг билет",
    downloadTicket: "Преземи билет",
    noPerformancesYet: "Сè уште нема достапни претстави",
    noPerformancesYetDesc: "Ве молиме проверете подоцна или контактирајте го администраторот за повеќе информации.",
    ticketsNotReleased: "Билетите сè уште не се пуштени",
    ticketsNotReleasedDesc: "Изборот на седишта е привремено деактивиран. Ве молиме проверете подоцна.",
    
    // Ticket Reservation Page
    ticketReservationTitle: "Резервации за билети",
    ticketReservationSubtitle: "Билетите ќе бидат достапни наскоро",
    ticketAvailabilityTitle: "Билетите доаѓаат наскоро",
    ticketAvailabilityMessage: "Резервацијата на билети за Актинг Европа 2025 ќе започне подоцна. Работиме напорно за да ги финализираме сите детали и да ви обезбедиме најдобро можно искуство.",
    stayUpdatedTitle: "Останете во тек со Актинг Европа",
    registerForUpdatesMessage: "Регистрирајте се за да останете во тек со сите вести, настани на Актинг Европа и да бидете први кои ќе дознаат кога билетите стануваат достапни!",
    registerNow: "Регистрирајте се сега",
    exploreWhileWaiting: "Додека чекате, истражете што нуди Актинг Европа:",
    thankYou: "Ви благодариме!",
    emailSubmittedMessage: "Го додадовме вашиот е-маил во нашата листа за известувања. Ќе бидете меѓу првите кои ќе дознаат кога билетите стануваат достапни!",
    backToHome: "Назад кон почетната",
    
    // Performance page specific
    bookYourTickets: "Резервирајте ги вашите билети",
    subtitles: "Титлови:",
    suitableForAges: "Погодно за возраст 12+",
    addToCalendar: "Додај во календар",
    needAssistance: "Ви треба помош?",
    contactBoxOffice: "Контактирајте ја нашата каса на:",

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

    // Cities
    kyustendil: "Ќустендил",
    sofia: "Софија",
    skopje: "Скопје",
    nis: "Ниш",
    bitola: "Битола",

    // Countries
    bulgaria: "Бугарија",
    northMacedonia: "Северна Македонија",
    serbia: "Србија",

    // Theatre Tags
    regionalTheatre: "Регионален театар",
    bulgarianDrama: "Бугарска драма",
    contemporaryWorks: "Современи дела",
    communityTheatre: "Заедничкиот театар",
    nationalTheatre: "Национален театар",
    classicalDrama: "Класична драма",
    bulgarianHeritage: "Бугарско наследство",
    historicVenue: "Историско место",
    macedonianCulture: "Македонска култура",
    internationalCollaborations: "Меѓународни соработки",
    culturalIdentity: "Културен идентитет",
    serbianTheatre: "Српски театар",
    contemporaryPlays: "Современи пиеси",
    independentTheatre: "Независен театар",
    experimental: "Експериментален",
    contemporary: "Современ",
    bulgarianTheatre: "Бугарски театар",
    intimateTheatre: "Интимен театар",
    localProductions: "Локални продукции",

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
    loggedOutSuccessfullyDesc: "Се одјавивте од вашата сметка",
    loading: "Се вчитува",
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
    noEventsYet: "Сѐ уште нема додадени настани. Проверете подоцна.",
    noEventsMatchFilter: "Нема настани што одговараат на вашите критериуми за филтрирање. Пробајте различни филтри.",

    // Venue translations
    "Main Stage": "Главна Сцена",
    "Chamber Stage": "Камерна Сцена",

    // Event types
    performance: "Претстава",
    workshop: "Работилница",
    discussion: "Дискусија",

    // About page
    aboutUs: "За нас",
    aboutText: "Добредојдовте во Актинг Европа, вашата главна дестинација за театарски настани и претстави низ Европа.\nНие сме посветени да ви го донесеме најдоброто од европскиот театар, од класични драми до современи продукции,\nприкажувајќи го богатото културно разновидност и уметнички талент на континентот.\n\nНашата мисија е да ги поврземе театарските ентузијасти со незаборавни искуства, обезбедувајќи сеопфатни\nинформации за претстојните претстави, места и билетирање. Ние веруваме во моќта на живата претстава да инспирира,\nзабавува и предизвикува размислување, и се стремиме да ја направиме достапна за сите.\n\nОснована од тим на страсни љубители на театарот, Актинг Европа е посветена на поддршката на уметничката заедница\nи промовирањето на културната размена. Придружете ни се на патување низ живиот свет на европскиот театар!",
    editAboutPage: "Уреди страница за нас",

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
    businessHours: "Работно време",
    businessHoursText: "Понеделник - Петок, 9:00 - 17:00 (CET)",
    followUsContact: "Следете не",

    // Authentication
    welcomeBack: "Добредојдовте назад",
    joinActingEurope: "Придружете се на Актинг Европа",
    signInToAccount: "Најавете се во вашата сметка на Актинг Европа",
    enterCredentials: "Внесете ги вашите податоци за пристап до сметката",
    registerToBook: "Регистрирајте се за да резервирате билети и да добиете пристап до ексклузивна содржина",
    createAccountToBook: "Создајте сметка за да резервирате билети и да добиете пристап до ексклузивна содржина",
    password: "Лозинка",
    confirmPassword: "Потврдете ја лозинката",
    createAccount: "Создај сметка",
    signingIn: "Се најавувам...",
    creatingAccount: "Се создава сметка...",
    showPassword: "Прикажи лозинка",
    hidePassword: "Сокриј лозинка",
    dontHaveAccount: "Немате сметка?",
    alreadyHaveAccount: "Веќе имате сметка?",
    termsOfService: "Услови за користење",
    privacyPolicy: "Политика за приватност",
    bySigningIn: "Со најавувањето се согласувате со нашите",
    byCreatingAccount: "Со создавањето сметка се согласувате со нашите",
    and: "и",
    verificationEmailSent: "Е-маил за потврда е испратен",
    checkEmailToComplete: "Ве молиме проверете го вашиот е-маил за да ја завршите регистрацијата",
    verificationEmailSentTo: "Испративме е-маил за потврда до",
    clickVerificationLink: "Ве молиме кликнете на врската за потврда во е-маилот за да ја завршите регистрацијата. Врската ќе истече за 24 часа.",
    returnToHome: "Вратете се на почетната",
    didntReceiveEmail: "Не го добивте е-маилот?",
    resendVerificationEmail: "Испратете повторно е-маил за потврда",
    sending: "Се испраќа...",
    loggedInSuccessfully: "Успешна најава",
    welcomeBackToActingEurope: "Добредојдовте назад во Актинг Европа",
    asAdministrator: " како администратор",
    verificationEmailResent: "Е-маилот за потврда е испратен повторно",
    failedToResendEmail: "Неуспешно испраќање на е-маил за потврда. Ве молиме обидете се повторно.",
    passwordsDoNotMatch: "Лозинките не се совпаѓаат",
    signupFailed: "Регистрацијата неуспешна",
    loginFailed: "Најавувањето неуспешно",
    failedToSendVerificationEmail: "Неуспешно испраќање на е-маил за потврда. Ве молиме обидете се повторно.",
    somethingWentWrong: "Нешто тргна наопаку",
    error: "Грешка",

    // Registration
    signupDisclaimer: "Со регистрирањето, се согласувате да примате промотивни е-маили од Актинг Европа.",
  },
  sr: {
    // Navigation
    home: "Почетна",
    program: "Програм",
    participants: "Учесници",
    tickets: "Карте",
    news: "Вести",
    about: "Инфо",
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
    participantsDescription: "Откријте талентована позоришта која учествују у Актинг Европа 2025",
    participatingTheatres: "Позоришта учесници",
    theatreName: "Име позоришта",
    theatreHistory: "Историја позоришта",
    gallery: "Галерија",
    founded: "Основано",
    foundedIn: "Основано",
    location: "Локација",
    website: "Веб сајт",
    viewTheatre: "Погледај позориште",
    more: "Више",
    learnMore: "Сазнај више",
    visitWebsite: "Посети веб сајт",
    history: "Историја",
    tags: "Ознаке",
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
    duration: "Трајање",
    director: "Режисер",
    cast: "Глумачка постава",
    synopsis: "Синопсис",
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
    seats: "Седишта",
    bookAnotherTicket: "Резервиши другу карту",
    downloadTicket: "Преузми карту",
    noPerformancesYet: "Још увек нема доступних представа",
    noPerformancesYetDesc: "Молимо проверите касније или контактирајте администратора за више информација.",
    ticketsNotReleased: "Карте још увек нису пуштене",
    ticketsNotReleasedDesc: "Избор седишта је привремено деактивиран. Молимо проверите касније.",
    
    // Ticket Reservation Page
    ticketReservationTitle: "Резервације карата",
    ticketReservationSubtitle: "Карте ће бити доступне ускоро",
    ticketAvailabilityTitle: "Карте ускоро",
    ticketAvailabilityMessage: "Резервација карата за Актинг Европа 2025 ће почети касније. Напорно радимо да финализујемо све детаље и пружимо вам најбоље могуће искуство.",
    stayUpdatedTitle: "Останите у току са Актинг Европом",
    registerForUpdatesMessage: "Региструјте се за налог да останете у току са свим вестима, догађајима Актинг Европе и будите први који ће сазнати када карте постану доступне!",
    registerNow: "Региструјте се сада",
    exploreWhileWaiting: "Док чекате, истражите шта Актинг Европа нуди:",
    thankYou: "Хвала вам!",
    emailSubmittedMessage: "Додали смо ваш имејл у нашу листу за обавештења. Бићете међу првима који ће сазнати када карте постану доступне!",
    backToHome: "Назад на почетну",
    
    // Performance page specific
    bookYourTickets: "Резервишите ваше карте",
    subtitles: "Титлови:",
    suitableForAges: "Погодно за узраст 12+",
    addToCalendar: "Додај у календар",
    needAssistance: "Треба вам помоћ?",
    contactBoxOffice: "Контактирајте нашу касу на:",

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

    // Cities
    kyustendil: "Ћустендил",
    sofia: "Софија",
    skopje: "Скопље",
    nis: "Ниш",
    bitola: "Битоља",

    // Countries
    bulgaria: "Бугарска",
    northMacedonia: "Северна Македонија",
    serbia: "Србија",

    // Theatre Tags
    regionalTheatre: "Регионални театар",
    bulgarianDrama: "Бугарска драма",
    contemporaryWorks: "Савремена дела",
    communityTheatre: "Заједнички театар",
    nationalTheatre: "Национални театар",
    classicalDrama: "Класична драма",
    bulgarianHeritage: "Бугарско наслеђе",
    historicVenue: "Историјско место",
    macedonianCulture: "Македонска култура",
    internationalCollaborations: "Међународне сарадње",
    culturalIdentity: "Културни идентитет",
    serbianTheatre: "Српски театар",
    contemporaryPlays: "Савремене представе",
    independentTheatre: "Независни театар",
    experimental: "Експериментални",
    contemporary: "Савремени",
    bulgarianTheatre: "Бугарски театар",
    intimateTheatre: "Интимни театар",
    localProductions: "Локалне продукције",

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
    preferences: "Преференце",
    emailNotifications: "Е-маил обавештења",
    emailNotificationsDesc: "Примајте ажурирања о представама и догађајима",
    calendarIntegration: "Интеграција са календаром",
    calendarIntegrationDesc: "Додајте резервисане представе у свој календар",
    saveChanges: "Сачувај промене",
    loggedOutSuccessfully: "Успешна одјава",
    loggedOutSuccessfullyDesc: "Одјавили сте се са свог налога",
    loading: "Учитавање",
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
    noEventsYet: "Још увек нема додатих догађаја. Молимо проверите касније.",
    noEventsMatchFilter:
      "Нема догађаја који одговарају вашим критеријумима филтрирања. Покушајте са другачијим филтрима.",

    // Venue translations
    "Main Stage": "Главна Сцена",
    "Chamber Stage": "Камерна Сцена",

    // Event types
    performance: "Представа",
    workshop: "Радионица",
    discussion: "Дискусија",

    // About page
    aboutUs: "О нама",
    aboutText: "Добродошли у Актинг Европу, вашу главну дестинацију за позоришне догађаје и представе широм Европе.\nПосвећени смо томе да вам донесемо најбоље од европског позоришта, од класичних драма до савремених продукција,\nприказујући богато културно разноликост и уметнички талент континента.\n\nНаша мисија је да повежемо позоришне ентузијасте са незаборавним искуствима, пружајући свеобухватне\nинформације о предстојећим представама, местима и продаји карата. Верујемо у моћ живе представе да инспирише,\nзабави и изазове размишљање, и тежимо да је учинимо доступном свима.\n\nОснована од стране тима страсних љубитеља позоришта, Актинг Европа је посвећена подршци уметничке заједнице\nи промовисању културне размене. Придружите нам се на путовању кроз живахан свет европског позоришта!",
    editAboutPage: "Уреди страницу о нама",

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
    businessHours: "Радно време",
    businessHoursText: "Понедељак - Петак, 9:00 - 17:00 (CET)",
    followUsContact: "Пратите нас",

    // Authentication
    welcomeBack: "Добродошли назад",
    joinActingEurope: "Придружите се Актинг Европи",
    signInToAccount: "Пријавите се у ваш налог на Актинг Европи",
    enterCredentials: "Унесите ваше податке за приступ налогу",
    registerToBook: "Региструјте се да резервишете карте и добијете приступ ексклузивном садржају",
    createAccountToBook: "Направите налог да резервишете карте и добијете приступ ексклузивном садржају",
    fullName: "Пуно име",
    password: "Лозинка",
    confirmPassword: "Потврдите лозинку",
    createAccount: "Направи налог",
    signingIn: "Пријављујем се...",
    creatingAccount: "Правим налог...",
    showPassword: "Прикажи лозинку",
    hidePassword: "Сакриј лозинку",
    dontHaveAccount: "Немате налог?",
    alreadyHaveAccount: "Већ имате налог?",
    termsOfService: "Услови коришћења",
    privacyPolicy: "Политика приватности",
    bySigningIn: "Пријављивањем се слажете са нашим",
    byCreatingAccount: "Прављењем налога се слажете са нашим",
    and: "и",
    verificationEmailSent: "Е-маил за потврду је послат",
    checkEmailToComplete: "Молимо проверите ваш е-маил да завршите регистрацију",
    verificationEmailSentTo: "Послали смо е-маил за потврду на",
    clickVerificationLink: "Молимо кликните на везу за потврду у е-маилу да завршите регистрацију. Веза ће истећи за 24 сата.",
    returnToHome: "Вратите се на почетну",
    didntReceiveEmail: "Нисте добили е-маил?",
    resendVerificationEmail: "Пошаљите поново е-маил за потврду",
    sending: "Шаљем...",
    loggedInSuccessfully: "Успешна prijava",
    welcomeBackToActingEurope: "Добродошли назад у Актинг Европу",
    asAdministrator: " као администратор",
    verificationEmailResent: "Е-маил за потврду је поново послат",
    failedToResendEmail: "Неуспешно слање е-маила за потврду. Молимо покушајте поново.",
    passwordsDoNotMatch: "Лозинке се не слажу",
    signupFailed: "Регистрација неуспешна",
    loginFailed: "Пријављивање неуспешно",
    failedToSendVerificationEmail: "Неуспешно слање е-маила за потврду. Молимо покушајте поново.",
    somethingWentWrong: "Нешто је пошло по зло",
    error: "Грешка",

    // Registration
    signupDisclaimer: "Регистровањем се слажете да примате промотивне имејлове од Актинг Европе.",
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

// Export translations object
export { translations }

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
