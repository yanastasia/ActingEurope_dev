--
-- PostgreSQL database dump
--

\restrict js2eewhwkIf8i87MGcCZd6KchdrGqdSMXHTBgdsBdC1tV4mZ84uWgzZougehgMf

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'pending',
    'confirmed',
    'cancelled'
);


--
-- Name: EventType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."EventType" AS ENUM (
    'performance',
    'workshop',
    'discussion'
);


--
-- Name: SectionType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SectionType" AS ENUM (
    'regular',
    'balcony'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: about_pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.about_pages (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    mission text,
    vision text,
    history text,
    image_url character varying(500),
    content_language character varying(5) DEFAULT 'en'::character varying NOT NULL,
    translation_group character varying(100),
    is_published boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: about_pages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.about_pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: about_pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.about_pages_id_seq OWNED BY public.about_pages.id;


--
-- Name: booked_seats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.booked_seats (
    id integer NOT NULL,
    booking_id integer NOT NULL,
    seat_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: booked_seats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.booked_seats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: booked_seats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.booked_seats_id_seq OWNED BY public.booked_seats.id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    user_id integer NOT NULL,
    event_id integer NOT NULL,
    booking_reference character varying(50) NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    booking_status public."BookingStatus" DEFAULT 'pending'::public."BookingStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: contact_pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact_pages (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    address text,
    phone character varying(50),
    email character varying(255),
    office_hours text,
    map_embed text,
    content_language character varying(5) DEFAULT 'en'::character varying NOT NULL,
    translation_group character varying(100),
    is_published boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: contact_pages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contact_pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contact_pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contact_pages_id_seq OWNED BY public.contact_pages.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    theatre_id integer NOT NULL,
    venue_id integer,
    event_type public."EventType" NOT NULL,
    event_date date NOT NULL,
    event_time time(3) without time zone NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    image_url character varying(500),
    language character varying(50),
    genre character varying(100),
    is_featured boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    "cast" text[] DEFAULT ARRAY[]::text[],
    director character varying(255),
    duration character varying(100),
    poster_url character varying(500),
    subtitles character varying(255),
    synopsis text,
    company text[] DEFAULT ARRAY[]::text[],
    content_language character varying(5) DEFAULT 'en'::character varying NOT NULL,
    translation_group character varying(100)
);


--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: news_articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_articles (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    excerpt text,
    content text NOT NULL,
    category character varying(100),
    image_url character varying(500),
    author character varying(100),
    published_at timestamp(3) without time zone,
    is_published boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    content_language character varying(5) DEFAULT 'en'::character varying NOT NULL,
    translation_group character varying(100)
);


--
-- Name: news_articles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.news_articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: news_articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.news_articles_id_seq OWNED BY public.news_articles.id;


--
-- Name: seats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seats (
    id integer NOT NULL,
    venue_section_id integer NOT NULL,
    row_number integer NOT NULL,
    seat_number integer NOT NULL,
    is_available boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_accessible boolean DEFAULT false NOT NULL
);


--
-- Name: seats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: seats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.seats_id_seq OWNED BY public.seats.id;


--
-- Name: theatre_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.theatre_images (
    id integer NOT NULL,
    theatre_id integer NOT NULL,
    image_url character varying(500) NOT NULL,
    caption character varying(255),
    is_primary boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: theatre_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.theatre_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: theatre_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.theatre_images_id_seq OWNED BY public.theatre_images.id;


--
-- Name: theatre_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.theatre_tags (
    id integer NOT NULL,
    theatre_id integer NOT NULL,
    tag_name character varying(100) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: theatre_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.theatre_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: theatre_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.theatre_tags_id_seq OWNED BY public.theatre_tags.id;


--
-- Name: theatres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.theatres (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    city character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    description text,
    history text,
    website character varying(255),
    founded_year integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    content_language character varying(5) DEFAULT 'en'::character varying NOT NULL,
    translation_group character varying(100)
);


--
-- Name: theatres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.theatres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: theatres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.theatres_id_seq OWNED BY public.theatres.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    phone character varying(20),
    is_admin boolean DEFAULT false NOT NULL,
    email_notifications boolean DEFAULT true NOT NULL,
    marketing_preferences boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: venue_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venue_sections (
    id integer NOT NULL,
    venue_id integer NOT NULL,
    section_name character varying(50) NOT NULL,
    section_type public."SectionType" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: venue_sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.venue_sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: venue_sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.venue_sections_id_seq OWNED BY public.venue_sections.id;


--
-- Name: venues; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.venues (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    capacity integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    address character varying(255),
    city character varying(100),
    image_url character varying(500)
);


--
-- Name: venues_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.venues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: venues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.venues_id_seq OWNED BY public.venues.id;


--
-- Name: about_pages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.about_pages ALTER COLUMN id SET DEFAULT nextval('public.about_pages_id_seq'::regclass);


--
-- Name: booked_seats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booked_seats ALTER COLUMN id SET DEFAULT nextval('public.booked_seats_id_seq'::regclass);


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: contact_pages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_pages ALTER COLUMN id SET DEFAULT nextval('public.contact_pages_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: news_articles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_articles ALTER COLUMN id SET DEFAULT nextval('public.news_articles_id_seq'::regclass);


--
-- Name: seats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seats ALTER COLUMN id SET DEFAULT nextval('public.seats_id_seq'::regclass);


--
-- Name: theatre_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatre_images ALTER COLUMN id SET DEFAULT nextval('public.theatre_images_id_seq'::regclass);


--
-- Name: theatre_tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatre_tags ALTER COLUMN id SET DEFAULT nextval('public.theatre_tags_id_seq'::regclass);


--
-- Name: theatres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatres ALTER COLUMN id SET DEFAULT nextval('public.theatres_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: venue_sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_sections ALTER COLUMN id SET DEFAULT nextval('public.venue_sections_id_seq'::regclass);


--
-- Name: venues id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venues ALTER COLUMN id SET DEFAULT nextval('public.venues_id_seq'::regclass);


--
-- Data for Name: about_pages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.about_pages (id, title, content, mission, vision, history, image_url, content_language, translation_group, is_published, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: booked_seats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.booked_seats (id, booking_id, seat_id, created_at) FROM stdin;
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.bookings (id, user_id, event_id, booking_reference, total_amount, booking_status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: contact_pages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contact_pages (id, title, content, address, phone, email, office_hours, map_embed, content_language, translation_group, is_published, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.events (id, title, theatre_id, venue_id, event_type, event_date, event_time, description, price, image_url, language, genre, is_featured, created_at, updated_at, "cast", director, duration, poster_url, subtitles, synopsis, company, content_language, translation_group) FROM stdin;
42	Artists in waiting	67	28	performance	2025-09-19	19:30:00	"Waiting Artists" is a comedy that caricatures the lives of people in the world of theater. The action takes place in the summer of 1953. George and Charlotte Hay, failed Broadway stars, try to regain their former glory by playing in Buffalo, New York. The multi-layered characters of the characters and the constant dramatic twists skillfully written by the author Ken Ludwig guarantee laughter in the hall.	0.00	/a_in_wait1.jpg	Bulgarian	Comedy	f	2025-08-11 09:41:19.068	2025-08-11 09:41:19.068	{"Yordan Danchev","Tsvetelina Nikolova","Bilyana Lachezarova","Adriana Petrova","Lazar Panev","Kostadin Zhekov","Ivana Ivanova","Yavor Borisov (voice)"}	Presiyan Kuzov		/artists_in_waiting.jpg	English, Macedonian	"Waiting Artists" is a comedy that caricatures the lives of people in the world of theater. The action takes place in the summer of 1953. George and Charlotte Hay, failed Broadway stars, try to regain their former glory by playing in Buffalo, New York. The multi-layered characters of the characters and the constant dramatic twists skillfully written by the author Ken Ludwig guarantee laughter in the hall.	{"Drama Theatre \\"Krum Kyulyavkov\\""}	en	\N
38	No Man's Land	69	28	performance	2025-09-20	19:00:00	The script No Man's Land by Danis Tanović is about the war that took place in the 1990s within the borders of the former Yugoslavia. The reason is similar to that of all wars that have occurred - the aggressive persistence and imposition of a kind of cultural identity (including religious affiliation) that is mixed with territorial, political and economic claims. What is interesting in this case is that the warring parties - the Bosniaks and the Bosnian Serbs - are very close in every sense. Hence the impression that the irreconcilable differences between them are inessential, and the conflict is unsustainable. They are at war, even unable to determine exactly why and how it all began - they ask themselves, but do not find an answer. But they continue to kill each other... If this text still manages to build on something a little different from the already widely developed military theme, it consists in the emergence of the terrible and endless inertia of destruction.	0.00	/nizhija_zemja1.jpg	Macedonian	Drama	f	2025-08-11 09:41:17.12	2025-08-11 09:41:17.12	{"Saško Kocev","Toni Mihajlovski/Nikola Aceski","Aleksandar Mihajlovski","Gorast Cvetkovski","Aleksandar Mikić","Tome Stankovski","Aleksandar Gjorgieski","Borče Načev","Oliver Mitkovski","Kamka Tocinovski/Sofia Nasevska-Trifunovska","Nenad Anđelković","Nikola Stefanov/Tome Stankovski/Aleksandar Ivanovski","Stefan Spasov","Grigor Jovanovski/Alexander Ivanovski","Kristina Gieva","Filip Milenkoski","Marija Kondovska","Tome Stankovski","Aleksandar Ivanovski"}	Aleksandar Morfov	120 minutes	/nichija_zemja.jpg	English, Bulgarian	The script No Man's Land by Danis Tanović is about the war that took place in the 1990s within the borders of the former Yugoslavia. The reason is similar to that of all wars that have occurred - the aggressive persistence and imposition of a kind of cultural identity (including religious affiliation) that is mixed with territorial, political and economic claims. What is interesting in this case is that the warring parties - the Bosniaks and the Bosnian Serbs - are very close in every sense. Hence the impression that the irreconcilable differences between them are inessential, and the conflict is unsustainable. They are at war, even unable to determine exactly why and how it all began - they ask themselves, but do not find an answer. But they continue to kill each other... If this text still manages to build on something a little different from the already widely developed military theme, it consists in the emergence of the terrible and endless inertia of destruction.	{"Macedonian National Theatre"}	en	\N
39	Don Juan	70	28	performance	2025-09-18	19:00:00	A person's life journey and the marks they leave on others, their constant pursuit of self-improvement, give them the opportunity to rise freely and destroy all the delusions that time brings. This is my Don Juan – the one who can transcend himself and no longer be Don Juan.	0.00	/don_zhuan1.jpg	Serbian	Drama	f	2025-08-11 09:41:17.884	2025-08-11 09:41:17.884	{"Dejan Lilić","Dragiša Veljković","Maja Vukojević Cvetković","Andrija Mitić","Uroš Milojević","Katarina Mitić Pavlović","Katarina Arsić","Danilo Petrović","Marjan Todorović","Miloš Mitrović"}	Vasil Vasilev	120 minutes	/don_zhuan.jpg	English, Bulgarian	A person's life journey and the marks they leave on others, their constant pursuit of self-improvement, give them the opportunity to rise freely and destroy all the delusions that time brings. This is my Don Juan – the one who can transcend himself and no longer be Don Juan.	{"National Theatre in Niš"}	en	\N
40	Oh My God	68	29	performance	2025-09-21	16:00:00	A lonely man at a bar table turns to the other visitors. It turns out that the bar belongs to Judas and the man is Christ. Or so He claims. Why? What does He want to accomplish if it is really Him? The play "Oh My God" is a call for humanity and love in times when God's word is misused and instead of being a source of life, it is used to justify destruction. The team of the show invites you to a warm, sincere conversation about the deepest topic that seeks answers in the heart and mind of every person. A conversation with a smile and a tear, with irony and compassion.	0.00	/1bozhe_moj.jpg	Bulgarian	Monodrama	f	2025-08-11 09:41:18.26	2025-08-11 09:41:18.26	{"Hristo Mutafchiev"}	Stoyan Radev	90 minutes	/bozhe_moj.jpg	English, Macedonian	A lonely man at a bar table turns to the other visitors. It turns out that the bar belongs to Judas and the man is Christ. Or so He claims. Why? What does He want to accomplish if it is really Him? The play "Oh My God" is a call for humanity and love in times when God's word is misused and instead of being a source of life, it is used to justify destruction. The team of the show invites you to a warm, sincere conversation about the deepest topic that seeks answers in the heart and mind of every person. A conversation with a smile and a tear, with irony and compassion.	{"\\"Ivan Vazov\\" National Theatre"}	en	\N
41	Aivar or Lutenitsa	71	29	performance	2025-09-20	16:00:00	Denitsa is Bulgarian and Sofia is Macedonian. Two women competing on stage. Two women measure the similarities and differences between the two peoples and create their map of the Balkans with a lot of humor, music, self-irony and personal stories. The political disputes between two countries seen through the eyes of two women and their thoughts, dreams, problems, experiences and fantasies. Do common things divide us more than they unite us? Is the past really important for countries, and for women - the future?	0.00	/a_ili_lj1.jpg	Bulgarian and Macedonian	Comedy	f	2025-08-11 09:41:18.65	2025-08-11 09:41:18.65	{"Denitsa Darinova","Sofia Ristevska"}	Gergana Dimitrova		/a_ili_lj.png	English	Denitsa is Bulgarian and Sofia is Macedonian. Two women competing on stage. Two women measure the similarities and differences between the two peoples and create their map of the Balkans with a lot of humor, music, self-irony and personal stories. The political disputes between two countries seen through the eyes of two women and their thoughts, dreams, problems, experiences and fantasies. Do common things divide us more than they unite us? Is the past really important for countries, and for women - the future?	{"OSAIK \\"39 Monkeys\\"","Intimate Theatre Bitola"}	en	\N
43	In the Dark	68	28	performance	2025-09-21	19:00:00	"You think I'm tellin' you 'bout things I've seen, but no. All of these are just miracles, this is all just ignorance and if we could see 'em, they'd transform into visions." With a jar of jam and an old suitcase Gichka the Cuckoo, the adopted daughter of the village priest, is alone in the belfry of the church. Her stories are unbelievably funny and offer a passage to a small village and its absurd, but lost world. Her stories are also sad as the trusting nature of a child is incapable of seeing through the veil of evil, even if it is staring it in the face. This is a tale of loneliness for those who are different, of frantic living on the margins of sanity and unconditional love. A life filled with memories and wonder. All of them were kept in a tiny tinder box.	0.00	/nevedenie1.jpg	Bulgarian	Monodrama	f	2025-08-11 09:41:20.114	2025-08-11 09:41:20.114	{"Albena Stavreva"}	Albena Stavreva	90 minutes	/nevedenie.jpg	English, Macedonian	"You think I'm tellin' you 'bout things I've seen, but no. All of these are just miracles, this is all just ignorance and if we could see 'em, they'd transform into visions." With a jar of jam and an old suitcase Gichka the Cuckoo, the adopted daughter of the village priest, is alone in the belfry of the church. Her stories are unbelievably funny and offer a passage to a small village and its absurd, but lost world. Her stories are also sad as the trusting nature of a child is incapable of seeing through the veil of evil, even if it is staring it in the face. This is a tale of loneliness for those who are different, of frantic living on the margins of sanity and unconditional love. A life filled with memories and wonder. All of them were kept in a tiny tinder box.	{"\\"Ivan Vazov\\" National Theatre"}	en	\N
\.


--
-- Data for Name: news_articles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news_articles (id, title, excerpt, content, category, image_url, author, published_at, is_published, created_at, updated_at, content_language, translation_group) FROM stdin;
1	test	skskkskksks	skskkskksks	test	idk	Admin	\N	f	2025-08-11 11:06:37.673	2025-08-11 11:06:37.673	en	\N
2	test	\N	kskskkskskksks	idk	/uploads/1754911681797_1.png	Admin	\N	f	2025-08-11 11:28:02.081	2025-08-11 11:28:02.081	en	news_1754911682078_6v27zfqkz
3	test	\N	kskskkskskksks	idk	/uploads/1754911681797_1.png	Admin	\N	f	2025-08-11 11:28:03.219	2025-08-11 11:28:03.219	bg	news_1754911682078_6v27zfqkz
4	test	\N	kskskkskskksks	idk	/uploads/1754911681797_1.png	Admin	\N	f	2025-08-11 11:28:03.668	2025-08-11 11:28:03.668	mk	news_1754911682078_6v27zfqkz
5	test	\N	kskskkskskksks	idk	/uploads/1754911681797_1.png	Admin	\N	f	2025-08-11 11:28:04.184	2025-08-11 11:28:04.184	sr	news_1754911682078_6v27zfqkz
6	test	\N	kkskskk	tess	/uploads/1754912094990_1.png	Admin	\N	t	2025-08-11 11:34:55.186	2025-08-11 11:34:55.186	en	news_1754912095182_ehp6w0401
7	test	ксксккскя	ксксккскя	tess	/uploads/1754912094990_1.png	Admin	2025-08-11 11:34:56.222	t	2025-08-11 11:34:56.222	2025-08-12 08:25:31.861	bg	news_1754912095182_ehp6w0401
8	test	тесттт	тесттт	tess	/uploads/1754912094990_1.png	Admin	2025-08-11 11:34:56.646	t	2025-08-11 11:34:56.646	2025-08-12 08:25:43.944	mk	news_1754912095182_ehp6w0401
9	test	ма појма немам	ма појма немам	tess	/uploads/1754912094990_1.png	Admin	2025-08-11 11:34:57.054	t	2025-08-11 11:34:57.054	2025-08-12 08:25:58.33	sr	news_1754912095182_ehp6w0401
\.


--
-- Data for Name: seats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.seats (id, venue_section_id, row_number, seat_number, is_available, created_at, is_accessible) FROM stdin;
10632	48	4	13	t	2025-08-11 09:51:34.872	f
10633	48	4	14	t	2025-08-11 09:51:35.229	f
10634	48	4	15	t	2025-08-11 09:51:35.584	f
10635	48	4	16	t	2025-08-11 09:51:35.933	f
10636	48	4	17	t	2025-08-11 09:51:36.288	f
10637	48	4	18	t	2025-08-11 09:51:36.65	f
10638	48	4	19	t	2025-08-11 09:51:37.02	f
10639	48	4	20	t	2025-08-11 09:51:37.378	f
10640	48	4	21	t	2025-08-11 09:51:37.728	f
10641	48	4	22	t	2025-08-11 09:51:38.086	f
10642	48	4	23	t	2025-08-11 09:51:38.44	f
10643	48	4	24	t	2025-08-11 09:51:38.792	f
10644	48	4	25	t	2025-08-11 09:51:39.163	f
10645	48	4	26	t	2025-08-11 09:51:39.519	f
10646	48	4	27	t	2025-08-11 09:51:39.873	f
10647	48	4	28	t	2025-08-11 09:51:40.225	f
10648	48	4	29	t	2025-08-11 09:51:40.576	t
10649	48	5	1	t	2025-08-11 09:51:40.933	f
10650	48	5	2	t	2025-08-11 09:51:41.295	f
10651	48	5	3	t	2025-08-11 09:51:41.677	f
10652	48	5	4	t	2025-08-11 09:51:42.029	f
10653	48	5	5	t	2025-08-11 09:51:42.406	f
10654	48	5	6	t	2025-08-11 09:51:42.77	f
10655	48	5	7	t	2025-08-11 09:51:43.122	f
10656	48	5	8	t	2025-08-11 09:51:43.479	f
10657	48	5	9	t	2025-08-11 09:51:43.842	f
10658	48	5	10	t	2025-08-11 09:51:44.195	f
10659	48	5	11	t	2025-08-11 09:51:44.545	f
10660	48	5	12	t	2025-08-11 09:51:45.28	f
10661	48	5	13	t	2025-08-11 09:51:45.638	f
10662	48	5	14	t	2025-08-11 09:51:45.989	f
10663	48	5	15	t	2025-08-11 09:51:46.345	f
10664	48	5	16	t	2025-08-11 09:51:46.7	f
10665	48	5	17	t	2025-08-11 09:51:47.053	f
10666	48	5	18	t	2025-08-11 09:51:47.405	f
10667	48	5	19	t	2025-08-11 09:51:47.758	f
10668	48	5	20	t	2025-08-11 09:51:48.109	f
10669	48	5	21	t	2025-08-11 09:51:48.462	f
10670	48	5	22	t	2025-08-11 09:51:48.813	f
10671	48	5	23	t	2025-08-11 09:51:49.176	f
10672	48	5	24	t	2025-08-11 09:51:49.535	f
10673	48	5	25	t	2025-08-11 09:51:49.89	f
10674	48	5	26	t	2025-08-11 09:51:50.246	f
10675	48	5	27	t	2025-08-11 09:51:50.609	f
10676	48	5	28	t	2025-08-11 09:51:50.963	f
10677	48	6	1	t	2025-08-11 09:51:51.315	t
10678	48	6	2	t	2025-08-11 09:51:51.679	f
10679	48	6	3	t	2025-08-11 09:51:52.039	f
10680	48	6	4	t	2025-08-11 09:51:52.413	f
10681	48	6	5	t	2025-08-11 09:51:52.796	f
10682	48	6	6	t	2025-08-11 09:51:53.164	f
10683	48	6	7	t	2025-08-11 09:51:53.516	f
10684	48	6	8	t	2025-08-11 09:51:53.882	f
10685	48	6	9	t	2025-08-11 09:51:54.255	f
10686	48	6	10	t	2025-08-11 09:51:54.608	f
10687	48	6	11	t	2025-08-11 09:51:54.96	f
10688	48	6	12	t	2025-08-11 09:51:55.31	f
10689	48	6	13	t	2025-08-11 09:51:55.664	f
10690	48	6	14	t	2025-08-11 09:51:56.014	f
10691	48	6	15	t	2025-08-11 09:51:56.365	f
10692	48	6	16	t	2025-08-11 09:51:56.724	f
10693	48	6	17	t	2025-08-11 09:51:57.181	f
10694	48	6	18	t	2025-08-11 09:51:57.552	f
10695	48	6	19	t	2025-08-11 09:51:57.906	f
10696	48	6	20	t	2025-08-11 09:51:58.261	f
10697	48	6	21	t	2025-08-11 09:51:58.618	f
10698	48	6	22	t	2025-08-11 09:51:59.035	f
10699	48	6	23	t	2025-08-11 09:51:59.397	f
10700	48	6	24	t	2025-08-11 09:51:59.842	f
10701	48	6	25	t	2025-08-11 09:52:00.202	f
10702	48	6	26	t	2025-08-11 09:52:01.053	f
10703	48	6	27	t	2025-08-11 09:52:01.409	f
10704	48	6	28	t	2025-08-11 09:52:01.794	f
10705	48	6	29	t	2025-08-11 09:52:02.158	f
10706	48	6	30	t	2025-08-11 09:52:02.509	f
10707	48	6	31	t	2025-08-11 09:52:02.864	t
10708	48	8	1	t	2025-08-11 09:52:03.219	t
10709	48	8	2	t	2025-08-11 09:52:03.571	t
10710	48	8	3	t	2025-08-11 09:52:03.925	f
10711	48	8	4	t	2025-08-11 09:52:04.281	f
10712	48	8	5	t	2025-08-11 09:52:04.639	f
10713	48	8	6	t	2025-08-11 09:52:04.996	f
10714	48	8	7	t	2025-08-11 09:52:05.352	f
10715	48	8	8	t	2025-08-11 09:52:05.702	f
10716	48	8	9	t	2025-08-11 09:52:06.089	f
10717	48	8	10	t	2025-08-11 09:52:06.486	f
10718	48	8	11	t	2025-08-11 09:52:06.907	f
10719	48	8	12	t	2025-08-11 09:52:07.317	f
10720	48	8	13	t	2025-08-11 09:52:07.68	f
10721	48	8	14	t	2025-08-11 09:52:08.137	f
10722	48	8	15	t	2025-08-11 09:52:08.51	f
10723	48	8	16	t	2025-08-11 09:52:09.168	f
10724	48	8	17	t	2025-08-11 09:52:09.532	f
10725	48	8	18	t	2025-08-11 09:52:09.891	f
10726	48	8	19	t	2025-08-11 09:52:10.249	f
10727	48	8	20	t	2025-08-11 09:52:10.667	f
10728	48	8	21	t	2025-08-11 09:52:11.035	f
10729	48	8	22	t	2025-08-11 09:52:11.393	f
10730	48	8	23	t	2025-08-11 09:52:11.752	f
10731	48	8	24	t	2025-08-11 09:52:12.115	f
10732	48	8	25	t	2025-08-11 09:52:12.481	f
10733	48	8	26	t	2025-08-11 09:52:12.894	f
10734	48	8	27	t	2025-08-11 09:52:13.276	f
10735	48	8	28	t	2025-08-11 09:52:13.672	f
10736	48	8	29	t	2025-08-11 09:52:14.203	t
10737	48	8	30	t	2025-08-11 09:52:14.571	t
10738	48	9	1	t	2025-08-11 09:52:14.926	f
10739	48	9	2	t	2025-08-11 09:52:15.409	f
10740	48	9	3	t	2025-08-11 09:52:15.802	f
10741	48	9	4	t	2025-08-11 09:52:16.537	f
10742	48	9	5	t	2025-08-11 09:52:16.91	f
10743	48	9	6	t	2025-08-11 09:52:17.271	f
10744	48	9	7	t	2025-08-11 09:52:17.663	f
10745	48	9	8	t	2025-08-11 09:52:18.031	f
10746	48	9	9	t	2025-08-11 09:52:18.479	f
10747	48	9	10	t	2025-08-11 09:52:18.927	f
10748	48	9	11	t	2025-08-11 09:52:19.294	f
10749	48	9	12	t	2025-08-11 09:52:19.662	f
10750	48	9	13	t	2025-08-11 09:52:20.024	f
10751	48	9	14	t	2025-08-11 09:52:20.374	f
10752	48	9	15	t	2025-08-11 09:52:20.834	f
10753	48	9	16	t	2025-08-11 09:52:21.198	f
10754	48	9	17	t	2025-08-11 09:52:21.562	f
10755	48	9	18	t	2025-08-11 09:52:22.064	f
10756	48	9	19	t	2025-08-11 09:52:22.443	f
10757	48	9	20	t	2025-08-11 09:52:22.802	f
10758	48	9	21	t	2025-08-11 09:52:23.281	f
10759	48	9	22	t	2025-08-11 09:52:23.714	f
10760	48	9	23	t	2025-08-11 09:52:24.183	f
10761	48	9	24	t	2025-08-11 09:52:24.579	f
10762	48	9	25	t	2025-08-11 09:52:24.943	f
10763	48	9	26	t	2025-08-11 09:52:25.304	f
10764	48	9	27	t	2025-08-11 09:52:25.664	f
10765	48	9	28	t	2025-08-11 09:52:26.029	f
10766	48	9	29	t	2025-08-11 09:52:26.406	f
10767	48	9	30	t	2025-08-11 09:52:26.883	f
10768	48	9	31	t	2025-08-11 09:52:27.285	f
10769	48	9	32	t	2025-08-11 09:52:27.651	f
10770	48	9	33	t	2025-08-11 09:52:28.007	f
10771	48	10	1	t	2025-08-11 09:52:28.368	f
10772	48	10	2	t	2025-08-11 09:52:28.736	f
10773	48	10	3	t	2025-08-11 09:52:29.179	f
10774	48	10	4	t	2025-08-11 09:52:29.557	f
10775	48	10	5	t	2025-08-11 09:52:29.979	f
10776	48	10	6	t	2025-08-11 09:52:30.344	f
10777	48	10	7	t	2025-08-11 09:52:30.701	f
10778	48	10	8	t	2025-08-11 09:52:31.09	f
10779	48	10	9	t	2025-08-11 09:52:31.459	f
10780	48	10	10	t	2025-08-11 09:52:32.203	f
10781	48	10	11	t	2025-08-11 09:52:32.616	f
10782	48	10	12	t	2025-08-11 09:52:32.97	f
10783	48	10	13	t	2025-08-11 09:52:33.43	f
10784	48	10	14	t	2025-08-11 09:52:33.78	f
10785	48	10	15	t	2025-08-11 09:52:34.3	f
10786	48	10	16	t	2025-08-11 09:52:34.665	f
10787	48	10	17	t	2025-08-11 09:52:35.122	f
10788	48	10	18	t	2025-08-11 09:52:35.58	f
10789	48	10	19	t	2025-08-11 09:52:35.931	f
10790	48	10	20	t	2025-08-11 09:52:36.306	f
10791	48	10	21	t	2025-08-11 09:52:36.658	f
10792	48	10	22	t	2025-08-11 09:52:37.012	f
10793	48	10	23	t	2025-08-11 09:52:37.364	f
10794	48	10	24	t	2025-08-11 09:52:37.715	f
10795	48	10	25	t	2025-08-11 09:52:38.068	f
10796	48	10	26	t	2025-08-11 09:52:39.328	f
10797	48	10	27	t	2025-08-11 09:52:39.681	f
10798	48	10	28	t	2025-08-11 09:52:40.045	f
10799	48	10	29	t	2025-08-11 09:52:40.433	f
10800	48	10	30	t	2025-08-11 09:52:40.819	f
10801	48	10	31	t	2025-08-11 09:52:41.206	f
10802	48	10	32	t	2025-08-11 09:52:41.562	f
10803	48	10	33	t	2025-08-11 09:52:41.924	f
10804	48	11	1	t	2025-08-11 09:52:42.294	f
10805	48	11	2	t	2025-08-11 09:52:42.67	f
10806	48	11	3	t	2025-08-11 09:52:43.048	f
10807	48	11	4	t	2025-08-11 09:52:43.433	f
10808	48	11	5	t	2025-08-11 09:52:43.785	f
10809	48	11	6	t	2025-08-11 09:52:44.138	f
10810	48	11	7	t	2025-08-11 09:52:44.49	f
10811	48	11	8	t	2025-08-11 09:52:44.844	f
10812	48	11	9	t	2025-08-11 09:52:45.249	f
10813	48	11	10	t	2025-08-11 09:52:45.613	f
10814	48	11	11	t	2025-08-11 09:52:45.966	f
10815	48	11	12	t	2025-08-11 09:52:46.316	f
10816	48	11	13	t	2025-08-11 09:52:46.727	f
10817	48	11	14	t	2025-08-11 09:52:47.151	f
10818	48	11	15	t	2025-08-11 09:52:47.917	f
10819	48	11	16	t	2025-08-11 09:52:48.274	f
10820	48	11	17	t	2025-08-11 09:52:48.76	f
10821	48	11	18	t	2025-08-11 09:52:49.159	f
10822	48	11	19	t	2025-08-11 09:52:49.515	f
10823	48	11	20	t	2025-08-11 09:52:49.868	f
10824	48	11	21	t	2025-08-11 09:52:50.22	f
10825	48	11	22	t	2025-08-11 09:52:50.635	f
10826	48	11	23	t	2025-08-11 09:52:50.989	f
10827	48	11	24	t	2025-08-11 09:52:51.359	f
10828	48	11	25	t	2025-08-11 09:52:51.8	f
10829	48	11	26	t	2025-08-11 09:52:52.173	f
10830	48	11	27	t	2025-08-11 09:52:52.578	f
10831	48	11	28	t	2025-08-11 09:52:52.963	f
10832	48	11	29	t	2025-08-11 09:52:53.312	f
10833	48	11	30	t	2025-08-11 09:52:53.672	f
10834	48	11	31	t	2025-08-11 09:52:54.114	f
10835	48	11	32	t	2025-08-11 09:52:54.467	f
10836	48	11	33	t	2025-08-11 09:52:54.823	f
10837	48	12	1	t	2025-08-11 09:52:55.176	f
10838	48	12	2	t	2025-08-11 09:52:55.557	f
10839	48	12	3	t	2025-08-11 09:52:55.922	f
10840	48	12	4	t	2025-08-11 09:52:56.313	f
10841	48	12	5	t	2025-08-11 09:52:56.671	f
10842	48	12	6	t	2025-08-11 09:52:57.085	f
10843	48	12	7	t	2025-08-11 09:52:57.445	f
10844	48	12	8	t	2025-08-11 09:52:57.798	f
10845	48	12	9	t	2025-08-11 09:52:58.156	f
10846	48	12	10	t	2025-08-11 09:52:58.51	f
10847	48	12	11	t	2025-08-11 09:52:58.879	f
10848	48	12	12	t	2025-08-11 09:52:59.259	f
10849	48	12	13	t	2025-08-11 09:52:59.738	f
10850	48	12	14	t	2025-08-11 09:53:00.099	f
10851	48	12	15	t	2025-08-11 09:53:00.487	f
10852	48	12	16	t	2025-08-11 09:53:00.843	f
10853	48	12	17	t	2025-08-11 09:53:01.284	f
10854	48	12	18	t	2025-08-11 09:53:01.793	f
10855	48	12	19	t	2025-08-11 09:53:02.203	f
10856	48	12	20	t	2025-08-11 09:53:02.579	f
10857	48	12	21	t	2025-08-11 09:53:03.297	f
10858	48	12	22	t	2025-08-11 09:53:03.688	f
10859	48	12	23	t	2025-08-11 09:53:04.08	f
10860	48	12	24	t	2025-08-11 09:53:04.432	f
10861	48	12	25	t	2025-08-11 09:53:04.793	f
10862	48	12	26	t	2025-08-11 09:53:05.155	f
10863	48	12	27	t	2025-08-11 09:53:05.511	f
10864	48	12	28	t	2025-08-11 09:53:05.876	f
10865	48	12	29	t	2025-08-11 09:53:06.231	f
10866	48	12	30	t	2025-08-11 09:53:06.609	f
10867	48	12	31	t	2025-08-11 09:53:06.966	f
10868	48	12	32	t	2025-08-11 09:53:11.136	f
10869	48	12	33	t	2025-08-11 09:53:11.494	f
10870	48	13	1	t	2025-08-11 09:53:11.849	f
10871	48	13	2	t	2025-08-11 09:53:12.205	f
10872	48	13	3	t	2025-08-11 09:53:12.574	f
10873	48	13	4	t	2025-08-11 09:53:12.926	f
10874	48	13	5	t	2025-08-11 09:53:13.367	f
10875	48	13	6	t	2025-08-11 09:53:13.73	f
10876	48	13	7	t	2025-08-11 09:53:14.09	f
10877	48	13	8	t	2025-08-11 09:53:14.499	f
10878	48	13	9	t	2025-08-11 09:53:14.856	f
10879	48	13	10	t	2025-08-11 09:53:15.224	f
10880	48	13	11	t	2025-08-11 09:53:15.595	f
10881	48	13	12	t	2025-08-11 09:53:16.04	f
10882	48	13	13	t	2025-08-11 09:53:16.416	f
10883	48	13	14	t	2025-08-11 09:53:16.77	f
10884	48	13	15	t	2025-08-11 09:53:17.141	f
10885	48	13	16	t	2025-08-11 09:53:17.518	f
10886	48	13	17	t	2025-08-11 09:53:17.871	f
10887	48	13	18	t	2025-08-11 09:53:18.36	f
10888	48	13	19	t	2025-08-11 09:53:18.718	f
10889	48	13	20	t	2025-08-11 09:53:19.189	f
10890	48	13	21	t	2025-08-11 09:53:19.567	f
10891	48	13	22	t	2025-08-11 09:53:19.92	f
10892	48	13	23	t	2025-08-11 09:53:20.34	f
10893	48	13	24	t	2025-08-11 09:53:20.747	f
10894	48	13	25	t	2025-08-11 09:53:21.149	f
10895	48	13	26	t	2025-08-11 09:53:21.518	f
10896	48	13	27	t	2025-08-11 09:53:21.872	f
10897	48	13	28	t	2025-08-11 09:53:22.23	f
10898	48	13	29	t	2025-08-11 09:53:22.607	f
10899	48	13	30	t	2025-08-11 09:53:22.993	f
10900	48	13	31	t	2025-08-11 09:53:23.365	f
10901	48	13	32	t	2025-08-11 09:53:23.76	f
10902	48	14	1	t	2025-08-11 09:53:24.275	f
10903	48	14	2	t	2025-08-11 09:53:24.629	f
10904	48	14	3	t	2025-08-11 09:53:25.041	f
10905	48	14	4	t	2025-08-11 09:53:25.409	f
10906	48	14	5	t	2025-08-11 09:53:26.281	f
10907	48	14	6	t	2025-08-11 09:53:26.678	f
10908	48	14	7	t	2025-08-11 09:53:27.058	f
10909	48	14	8	t	2025-08-11 09:53:27.418	f
10910	48	14	9	t	2025-08-11 09:53:27.964	f
10911	48	14	10	t	2025-08-11 09:53:28.331	f
10912	48	14	11	t	2025-08-11 09:53:28.7	f
10913	48	14	12	t	2025-08-11 09:53:29.064	f
10914	48	14	13	t	2025-08-11 09:53:29.424	f
10915	48	14	14	t	2025-08-11 09:53:29.779	f
10916	48	14	15	t	2025-08-11 09:53:30.175	f
10917	48	14	16	t	2025-08-11 09:53:30.568	f
10918	48	14	17	t	2025-08-11 09:53:30.928	f
10919	48	14	18	t	2025-08-11 09:53:31.298	f
10920	48	14	19	t	2025-08-11 09:53:31.703	f
10921	48	14	20	t	2025-08-11 09:53:32.057	f
10922	48	14	21	t	2025-08-11 09:53:32.411	f
10923	48	14	22	t	2025-08-11 09:53:32.801	f
10924	48	14	23	t	2025-08-11 09:53:33.231	f
10925	48	14	24	t	2025-08-11 09:53:33.59	f
10926	48	14	25	t	2025-08-11 09:53:33.959	f
10927	48	14	26	t	2025-08-11 09:53:34.325	f
10928	48	14	27	t	2025-08-11 09:53:34.695	f
10929	48	14	28	t	2025-08-11 09:53:35.08	f
10930	48	14	29	t	2025-08-11 09:53:35.477	f
10931	48	14	30	t	2025-08-11 09:53:35.834	f
10932	48	14	31	t	2025-08-11 09:53:36.201	f
10933	48	15	1	t	2025-08-11 09:53:36.559	f
10934	48	15	2	t	2025-08-11 09:53:36.909	f
10935	48	15	3	t	2025-08-11 09:53:37.276	f
10936	48	15	4	t	2025-08-11 09:53:37.646	f
10937	48	15	5	t	2025-08-11 09:53:38.008	f
10938	48	15	6	t	2025-08-11 09:53:38.367	f
10939	48	15	7	t	2025-08-11 09:53:38.761	f
10940	48	15	8	t	2025-08-11 09:53:39.206	f
10941	48	15	9	t	2025-08-11 09:53:39.562	f
10942	48	15	10	t	2025-08-11 09:53:39.924	f
10943	48	15	11	t	2025-08-11 09:53:40.276	f
10944	48	15	12	t	2025-08-11 09:53:40.633	f
10945	48	15	13	t	2025-08-11 09:53:41.12	f
10946	48	15	14	t	2025-08-11 09:53:41.834	f
10947	48	15	15	t	2025-08-11 09:53:42.246	f
10948	48	15	16	t	2025-08-11 09:53:42.62	f
10949	48	15	17	t	2025-08-11 09:53:42.992	f
10950	48	15	18	t	2025-08-11 09:53:43.342	f
10951	48	15	19	t	2025-08-11 09:53:43.694	f
10952	48	15	20	t	2025-08-11 09:53:44.049	f
10953	48	15	21	t	2025-08-11 09:53:44.538	f
10954	48	15	22	t	2025-08-11 09:53:44.889	f
10955	48	15	23	t	2025-08-11 09:53:45.323	f
10956	48	15	24	t	2025-08-11 09:53:45.69	f
10957	48	15	25	t	2025-08-11 09:53:46.07	f
10958	48	15	26	t	2025-08-11 09:53:46.449	f
10959	48	15	27	t	2025-08-11 09:53:46.851	f
10960	48	15	28	t	2025-08-11 09:53:47.205	f
10961	48	15	29	t	2025-08-11 09:53:47.671	f
10962	48	15	30	t	2025-08-11 09:53:48.197	f
10963	48	16	1	t	2025-08-11 09:53:48.558	f
10964	48	16	2	t	2025-08-11 09:53:48.92	f
10965	48	16	3	t	2025-08-11 09:53:49.275	f
10966	48	16	4	t	2025-08-11 09:53:49.625	f
10967	48	16	5	t	2025-08-11 09:53:49.99	f
10968	48	16	6	t	2025-08-11 09:53:50.355	f
10969	48	16	7	t	2025-08-11 09:53:50.747	f
10970	48	16	8	t	2025-08-11 09:53:51.152	f
10971	48	16	9	t	2025-08-11 09:53:51.513	f
10972	48	16	10	t	2025-08-11 09:53:51.884	f
10973	48	16	11	t	2025-08-11 09:53:52.34	f
10974	48	16	12	t	2025-08-11 09:53:52.703	f
10975	48	16	13	t	2025-08-11 09:53:53.056	f
10976	48	16	14	t	2025-08-11 09:53:53.418	f
10977	48	16	15	t	2025-08-11 09:53:53.776	f
10978	48	16	16	t	2025-08-11 09:53:54.151	f
10979	48	16	17	t	2025-08-11 09:53:54.513	f
10980	48	16	18	t	2025-08-11 09:53:54.869	f
10981	48	16	19	t	2025-08-11 09:53:55.456	f
10982	48	16	20	t	2025-08-11 09:53:55.836	f
10983	48	16	21	t	2025-08-11 09:53:56.199	f
10984	48	16	22	t	2025-08-11 09:53:56.564	f
10985	48	16	23	t	2025-08-11 09:53:57.321	f
10986	48	16	24	t	2025-08-11 09:53:57.707	f
10544	48	1	1	t	2025-08-11 09:50:59.818	f
10545	48	1	2	t	2025-08-11 09:51:00.183	f
10546	48	1	3	t	2025-08-11 09:51:00.641	f
10547	48	1	4	t	2025-08-11 09:51:01.074	f
10548	48	1	5	t	2025-08-11 09:51:01.471	f
10550	48	1	6	t	2025-08-11 09:51:01.844	f
10551	48	1	7	t	2025-08-11 09:51:02.694	f
10552	48	1	8	t	2025-08-11 09:51:03.179	f
10553	48	1	9	t	2025-08-11 09:51:03.654	f
10554	48	1	10	t	2025-08-11 09:51:04.103	f
10555	48	1	11	t	2025-08-11 09:51:04.484	f
10556	48	1	12	t	2025-08-11 09:51:05.091	f
10557	48	1	13	t	2025-08-11 09:51:05.502	f
10558	48	1	14	t	2025-08-11 09:51:05.873	f
10559	48	1	15	t	2025-08-11 09:51:06.222	f
10560	48	1	16	t	2025-08-11 09:51:06.628	f
10561	48	1	17	t	2025-08-11 09:51:07.003	f
10562	48	1	18	t	2025-08-11 09:51:07.353	f
10563	48	1	19	t	2025-08-11 09:51:07.707	f
10564	48	1	20	t	2025-08-11 09:51:08.074	f
10565	48	1	21	t	2025-08-11 09:51:08.522	f
10566	48	1	22	t	2025-08-11 09:51:08.885	f
10567	48	2	1	t	2025-08-11 09:51:09.275	t
10568	48	2	2	t	2025-08-11 09:51:09.625	t
10569	48	2	3	t	2025-08-11 09:51:09.987	f
10570	48	2	4	t	2025-08-11 09:51:10.345	f
10571	48	2	5	t	2025-08-11 09:51:10.699	f
10572	48	2	6	t	2025-08-11 09:51:11.084	f
10573	48	2	7	t	2025-08-11 09:51:11.443	f
10574	48	2	8	t	2025-08-11 09:51:11.796	f
10575	48	2	9	t	2025-08-11 09:51:12.202	f
10576	48	2	10	t	2025-08-11 09:51:12.619	f
10577	48	2	11	t	2025-08-11 09:51:12.987	f
10578	48	2	12	t	2025-08-11 09:51:13.342	f
10579	48	2	13	t	2025-08-11 09:51:14.066	f
10580	48	2	14	t	2025-08-11 09:51:14.43	f
10581	48	2	15	t	2025-08-11 09:51:14.792	f
10582	48	2	16	t	2025-08-11 09:51:15.202	f
10583	48	2	17	t	2025-08-11 09:51:15.823	f
10584	48	2	18	t	2025-08-11 09:51:16.199	f
10585	48	2	19	t	2025-08-11 09:51:16.579	f
10586	48	2	20	t	2025-08-11 09:51:16.943	f
10587	48	2	21	t	2025-08-11 09:51:17.307	f
10588	48	2	22	t	2025-08-11 09:51:17.675	f
10589	48	2	23	t	2025-08-11 09:51:18.052	f
10590	48	2	24	t	2025-08-11 09:51:18.432	f
10591	48	2	25	t	2025-08-11 09:51:18.808	f
10592	48	2	26	t	2025-08-11 09:51:19.187	t
10593	48	2	27	t	2025-08-11 09:51:19.591	t
10594	48	3	1	t	2025-08-11 09:51:19.952	f
10595	48	3	2	t	2025-08-11 09:51:20.315	f
10596	48	3	3	t	2025-08-11 09:51:20.688	f
10597	48	3	4	t	2025-08-11 09:51:21.067	f
10598	48	3	5	t	2025-08-11 09:51:21.438	f
10599	48	3	6	t	2025-08-11 09:51:21.821	f
10600	48	3	7	t	2025-08-11 09:51:22.361	f
10601	48	3	8	t	2025-08-11 09:51:22.733	f
10602	48	3	9	t	2025-08-11 09:51:23.165	f
10603	48	3	10	t	2025-08-11 09:51:23.519	f
10604	48	3	11	t	2025-08-11 09:51:23.886	f
10605	48	3	12	t	2025-08-11 09:51:24.282	f
10606	48	3	13	t	2025-08-11 09:51:24.64	f
10987	48	16	25	t	2025-08-11 09:53:58.078	f
10988	48	16	26	t	2025-08-11 09:53:58.456	f
10989	48	17	1	t	2025-08-11 09:53:58.813	f
10990	48	17	2	t	2025-08-11 09:53:59.207	f
10991	48	17	3	t	2025-08-11 09:53:59.662	f
10992	48	17	4	t	2025-08-11 09:54:00.047	f
10993	48	17	5	t	2025-08-11 09:54:00.407	f
10994	48	17	6	t	2025-08-11 09:54:00.778	f
10995	48	17	7	t	2025-08-11 09:54:01.296	f
10996	48	17	8	t	2025-08-11 09:54:01.691	f
10997	48	17	9	t	2025-08-11 09:54:02.065	f
10998	48	17	10	t	2025-08-11 09:54:02.449	f
10999	48	17	11	t	2025-08-11 09:54:02.81	f
11000	48	17	12	t	2025-08-11 09:54:03.173	f
11001	48	17	13	t	2025-08-11 09:54:03.639	f
11002	48	17	14	t	2025-08-11 09:54:04.037	f
11003	48	17	15	t	2025-08-11 09:54:04.427	f
11004	48	17	16	t	2025-08-11 09:54:04.795	f
11005	48	17	17	t	2025-08-11 09:54:05.226	f
11006	48	17	18	t	2025-08-11 09:54:05.592	f
11007	48	17	19	t	2025-08-11 09:54:05.975	f
11008	48	17	20	t	2025-08-11 09:54:06.36	f
11009	48	17	21	t	2025-08-11 09:54:06.889	f
11010	48	17	22	t	2025-08-11 09:54:07.265	f
11011	48	17	23	t	2025-08-11 09:54:07.636	f
11012	48	17	24	t	2025-08-11 09:54:08.003	f
11013	48	17	25	t	2025-08-11 09:54:08.404	f
11014	48	17	26	t	2025-08-11 09:54:08.763	f
11015	49	1	1	t	2025-08-11 09:54:09.972	f
11016	49	1	2	t	2025-08-11 09:54:10.417	f
11017	49	1	3	t	2025-08-11 09:54:10.777	f
11018	49	1	4	t	2025-08-11 09:54:11.161	f
11019	49	1	5	t	2025-08-11 09:54:11.534	f
11020	49	1	6	t	2025-08-11 09:54:11.901	f
11021	49	1	7	t	2025-08-11 09:54:12.261	f
11022	49	1	8	t	2025-08-11 09:54:12.97	f
11023	49	1	9	t	2025-08-11 09:54:13.322	f
11024	49	1	10	t	2025-08-11 09:54:13.676	f
11025	49	1	11	t	2025-08-11 09:54:14.041	f
11026	49	1	12	t	2025-08-11 09:54:14.46	f
11027	49	1	13	t	2025-08-11 09:54:14.815	f
11028	49	1	14	t	2025-08-11 09:54:15.17	f
11029	49	1	15	t	2025-08-11 09:54:15.521	f
11030	49	2	1	t	2025-08-11 09:54:15.915	f
11031	49	2	2	t	2025-08-11 09:54:16.275	f
11032	49	2	3	t	2025-08-11 09:54:16.653	f
11033	49	2	4	t	2025-08-11 09:54:17.057	f
11034	49	2	5	t	2025-08-11 09:54:17.457	f
11035	49	2	6	t	2025-08-11 09:54:17.818	f
11036	49	2	7	t	2025-08-11 09:54:18.262	f
11037	49	2	8	t	2025-08-11 09:54:18.634	f
11038	49	2	9	t	2025-08-11 09:54:19.011	f
11039	49	2	10	t	2025-08-11 09:54:19.386	f
11040	49	2	11	t	2025-08-11 09:54:19.756	f
11041	49	2	12	t	2025-08-11 09:54:20.156	f
11042	49	2	13	t	2025-08-11 09:54:20.531	f
11043	49	2	14	t	2025-08-11 09:54:20.97	f
11044	49	2	15	t	2025-08-11 09:54:21.366	f
11045	49	3	1	t	2025-08-11 09:54:21.777	f
11046	49	3	2	t	2025-08-11 09:54:22.147	f
11047	49	3	3	t	2025-08-11 09:54:22.515	f
11048	49	3	4	t	2025-08-11 09:54:22.872	f
11049	49	3	5	t	2025-08-11 09:54:23.268	f
11050	49	3	6	t	2025-08-11 09:54:23.663	f
11051	49	3	7	t	2025-08-11 09:54:24.127	f
11052	49	3	8	t	2025-08-11 09:54:24.532	f
11053	49	3	9	t	2025-08-11 09:54:24.988	f
11054	49	3	10	t	2025-08-11 09:54:25.471	f
11055	49	3	11	t	2025-08-11 09:54:25.839	f
11056	49	3	12	t	2025-08-11 09:54:26.304	f
11057	49	3	13	t	2025-08-11 09:54:26.66	f
11058	49	3	14	t	2025-08-11 09:54:27.01	f
11059	49	3	15	t	2025-08-11 09:54:27.373	f
10020	46	1	1	t	2025-08-11 09:40:37.14	f
10021	46	1	2	f	2025-08-11 09:40:37.521	f
10022	46	1	3	t	2025-08-11 09:40:37.893	f
10023	46	1	4	f	2025-08-11 09:40:38.25	f
10024	46	1	5	t	2025-08-11 09:40:38.609	f
10025	46	1	6	f	2025-08-11 09:40:38.965	f
10026	46	1	7	f	2025-08-11 09:40:39.393	f
10027	46	1	8	t	2025-08-11 09:40:39.801	f
10028	46	1	9	t	2025-08-11 09:40:40.17	f
10029	46	1	10	t	2025-08-11 09:40:40.524	f
10030	46	1	11	t	2025-08-11 09:40:43.803	f
10031	46	1	12	t	2025-08-11 09:40:44.204	f
10032	46	2	1	t	2025-08-11 09:40:44.564	f
10033	46	2	2	t	2025-08-11 09:40:44.917	f
10034	46	2	3	t	2025-08-11 09:40:45.269	f
10035	46	2	4	t	2025-08-11 09:40:45.652	f
10036	46	2	5	t	2025-08-11 09:40:46.016	f
10037	46	2	6	t	2025-08-11 09:40:46.376	f
10038	46	2	7	t	2025-08-11 09:40:46.775	f
10039	46	2	8	t	2025-08-11 09:40:47.284	f
10040	46	2	9	t	2025-08-11 09:40:47.65	f
10041	46	2	10	t	2025-08-11 09:40:48.006	f
10042	46	2	11	t	2025-08-11 09:40:48.408	f
10043	46	2	12	t	2025-08-11 09:40:48.82	f
10044	46	2	13	t	2025-08-11 09:40:49.288	f
10045	46	3	1	t	2025-08-11 09:40:49.653	f
10046	46	3	2	t	2025-08-11 09:40:50.023	f
10047	46	3	3	t	2025-08-11 09:40:50.457	f
10048	46	3	4	t	2025-08-11 09:40:50.833	f
10049	46	3	5	t	2025-08-11 09:40:51.181	f
10050	46	3	6	t	2025-08-11 09:40:51.562	f
10051	46	3	7	t	2025-08-11 09:40:51.945	f
10052	46	3	8	t	2025-08-11 09:40:52.309	f
10053	46	3	9	t	2025-08-11 09:40:52.666	f
10054	46	3	10	t	2025-08-11 09:40:53.023	f
10055	46	3	11	t	2025-08-11 09:40:53.383	f
10056	46	3	12	t	2025-08-11 09:40:53.729	f
10057	46	3	13	t	2025-08-11 09:40:54.08	f
10058	46	3	14	t	2025-08-11 09:40:54.552	f
10059	46	4	1	t	2025-08-11 09:40:54.903	f
10060	46	4	2	t	2025-08-11 09:40:55.268	f
10061	46	4	3	t	2025-08-11 09:40:55.619	f
10062	46	4	4	t	2025-08-11 09:40:55.967	f
10063	46	4	5	t	2025-08-11 09:40:56.314	f
10064	46	4	6	t	2025-08-11 09:40:56.756	f
10065	46	4	7	t	2025-08-11 09:40:57.203	f
10066	46	4	8	t	2025-08-11 09:40:57.628	f
10067	46	4	9	t	2025-08-11 09:40:57.975	f
10068	46	4	10	t	2025-08-11 09:40:58.34	f
10069	46	4	11	t	2025-08-11 09:40:59.067	f
10070	46	4	12	t	2025-08-11 09:40:59.417	f
10071	46	4	13	t	2025-08-11 09:40:59.779	f
10072	46	5	1	t	2025-08-11 09:41:00.145	f
10073	46	5	2	t	2025-08-11 09:41:00.543	f
10074	46	5	3	t	2025-08-11 09:41:00.903	f
10075	46	5	4	t	2025-08-11 09:41:01.272	f
10076	46	5	5	t	2025-08-11 09:41:01.714	f
10077	46	5	6	t	2025-08-11 09:41:02.081	f
10078	46	5	7	t	2025-08-11 09:41:02.447	f
10079	46	5	8	t	2025-08-11 09:41:02.81	f
10080	46	5	9	t	2025-08-11 09:41:03.161	f
10081	46	5	10	t	2025-08-11 09:41:03.513	f
10082	46	5	11	t	2025-08-11 09:41:03.865	f
10083	46	5	12	t	2025-08-11 09:41:04.226	f
10084	46	5	13	t	2025-08-11 09:41:04.579	f
10085	46	6	1	t	2025-08-11 09:41:04.945	f
10086	46	6	2	t	2025-08-11 09:41:05.348	f
10087	46	6	3	t	2025-08-11 09:41:05.707	f
10088	46	6	4	t	2025-08-11 09:41:06.073	f
10089	46	6	5	t	2025-08-11 09:41:06.434	f
10090	46	6	6	t	2025-08-11 09:41:06.821	f
10091	46	6	7	t	2025-08-11 09:41:07.239	f
10092	46	6	8	t	2025-08-11 09:41:07.624	f
10093	46	6	9	t	2025-08-11 09:41:07.995	f
10094	46	6	10	t	2025-08-11 09:41:08.368	f
10095	46	6	11	t	2025-08-11 09:41:08.728	f
10096	46	6	12	t	2025-08-11 09:41:09.166	f
10097	46	6	13	t	2025-08-11 09:41:09.583	f
10098	46	7	1	f	2025-08-11 09:41:09.958	f
10099	46	7	2	t	2025-08-11 09:41:10.311	f
10100	46	7	3	t	2025-08-11 09:41:10.67	f
10101	46	7	4	t	2025-08-11 09:41:11.028	f
10102	46	7	5	t	2025-08-11 09:41:11.425	f
10103	46	7	6	t	2025-08-11 09:41:11.796	f
10104	46	7	7	t	2025-08-11 09:41:12.169	f
10105	46	7	8	f	2025-08-11 09:41:12.529	f
10106	46	7	9	f	2025-08-11 09:41:12.889	f
10107	46	8	1	t	2025-08-11 09:41:13.249	f
10108	46	8	2	t	2025-08-11 09:41:13.612	f
10109	46	8	3	t	2025-08-11 09:41:13.969	f
10110	46	8	4	t	2025-08-11 09:41:14.715	f
10111	46	8	5	t	2025-08-11 09:41:15.087	f
10112	46	8	6	t	2025-08-11 09:41:15.469	f
10113	46	8	7	t	2025-08-11 09:41:15.851	f
10114	46	8	8	t	2025-08-11 09:41:16.35	f
10115	46	8	9	t	2025-08-11 09:41:16.718	f
10607	48	3	14	t	2025-08-11 09:51:25.008	f
10608	48	3	15	t	2025-08-11 09:51:25.362	f
10609	48	3	16	t	2025-08-11 09:51:25.743	f
10610	48	3	17	t	2025-08-11 09:51:26.134	f
10611	48	3	18	t	2025-08-11 09:51:26.495	f
10612	48	3	19	t	2025-08-11 09:51:26.87	f
10613	48	3	20	t	2025-08-11 09:51:27.228	f
10614	48	3	21	t	2025-08-11 09:51:27.581	f
10615	48	3	22	t	2025-08-11 09:51:27.931	f
10616	48	3	23	t	2025-08-11 09:51:28.285	f
10617	48	3	24	t	2025-08-11 09:51:28.689	f
10618	48	3	25	t	2025-08-11 09:51:29.076	f
10619	48	3	26	t	2025-08-11 09:51:29.911	f
10620	48	4	1	t	2025-08-11 09:51:30.283	t
10621	48	4	2	t	2025-08-11 09:51:30.716	f
10622	48	4	3	t	2025-08-11 09:51:31.078	f
10623	48	4	4	t	2025-08-11 09:51:31.445	f
10624	48	4	5	t	2025-08-11 09:51:31.816	f
10625	48	4	6	t	2025-08-11 09:51:32.194	f
10626	48	4	7	t	2025-08-11 09:51:32.546	f
10627	48	4	8	t	2025-08-11 09:51:32.907	f
10628	48	4	9	t	2025-08-11 09:51:33.258	f
10629	48	4	10	t	2025-08-11 09:51:33.612	f
10630	48	4	11	t	2025-08-11 09:51:33.972	f
10631	48	4	12	t	2025-08-11 09:51:34.507	f
\.


--
-- Data for Name: theatre_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.theatre_images (id, theatre_id, image_url, caption, is_primary, created_at) FROM stdin;
155	67	/kyustendil.jpg	Theatre exterior	t	2025-08-11 09:35:51.416
156	67	/placeholder.svg?height=300&width=400&text=Theatre+Interior	Main auditorium	f	2025-08-11 09:35:52.194
157	67	/placeholder.svg?height=300&width=400&text=Stage+Performance	Recent performance	f	2025-08-11 09:35:52.58
158	68	/sofija.jpg	Theatre exterior	t	2025-08-11 09:35:55.167
159	68	/placeholder.svg?height=300&width=400&text=Grand+Hall	Grand auditorium	f	2025-08-11 09:35:55.54
160	68	/placeholder.svg?height=300&width=400&text=Classical+Performance	Classical drama performance	f	2025-08-11 09:35:56.262
161	69	/skopje.jpg	Theatre exterior	t	2025-08-11 09:35:58.609
162	69	/placeholder.svg?height=300&width=400&text=Cultural+Performance	Cultural performance	f	2025-08-11 09:35:58.975
163	70	/nish.jpg	Theatre exterior	t	2025-08-11 09:36:01.316
164	70	/placeholder.svg?height=300&width=400&text=Theatre+Interior+Niš	Theatre interior	f	2025-08-11 09:36:01.669
165	71	/36monkeys.jpg	Theatre space	t	2025-08-11 09:36:03.903
166	71	/placeholder.svg?height=300&width=400&text=Experimental+Performance	Experimental performance	f	2025-08-11 09:36:04.278
167	72	/bitolatheatre.jpg	Theatre exterior	t	2025-08-11 09:36:06.559
168	72	/placeholder.svg?height=300&width=400&text=Intimate+Performance+Space	Intimate performance space	f	2025-08-11 09:36:06.909
\.


--
-- Data for Name: theatre_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.theatre_tags (id, theatre_id, tag_name, created_at) FROM stdin;
265	67	Regional Theatre	2025-08-11 09:35:52.954
266	67	Bulgarian Drama	2025-08-11 09:35:53.713
267	67	Contemporary Works	2025-08-11 09:35:54.068
268	67	Community Theatre	2025-08-11 09:35:54.432
269	68	National Theatre	2025-08-11 09:35:56.693
270	68	Classical Drama	2025-08-11 09:35:57.063
271	68	Bulgarian Heritage	2025-08-11 09:35:57.426
272	68	Historic Venue	2025-08-11 09:35:57.795
273	69	National Theatre	2025-08-11 09:35:59.359
274	69	Macedonian Culture	2025-08-11 09:35:59.709
275	69	International Collaborations	2025-08-11 09:36:00.175
276	69	Cultural Identity	2025-08-11 09:36:00.558
277	70	Serbian Theatre	2025-08-11 09:36:02.03
278	70	Regional Theatre	2025-08-11 09:36:02.404
279	70	Classical Drama	2025-08-11 09:36:02.796
280	70	Contemporary Plays	2025-08-11 09:36:03.158
281	71	Independent Theatre	2025-08-11 09:36:04.629
282	71	Experimental	2025-08-11 09:36:04.99
283	71	Contemporary	2025-08-11 09:36:05.411
284	71	Bulgarian Theatre	2025-08-11 09:36:05.816
285	72	Intimate Theatre	2025-08-11 09:36:07.27
286	72	Macedonian Culture	2025-08-11 09:36:07.724
287	72	Local Productions	2025-08-11 09:36:08.091
288	72	Community Theatre	2025-08-11 09:36:08.454
\.


--
-- Data for Name: theatres; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.theatres (id, name, city, country, description, history, website, founded_year, created_at, updated_at, content_language, translation_group) FROM stdin;
67	Drama Theatre "Krum Kyulyavkov"	Kyustendil	Bulgaria	A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.	Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent. The theatre was named after Krum Kyulyavkov, a celebrated Bulgarian actor and director who significantly contributed to the development of Bulgarian theatre. Over the decades, it has maintained its reputation for artistic excellence and community engagement.	\N	1952	2025-08-11 09:35:50.618	2025-08-11 09:35:50.618	en	\N
68	"Ivan Vazov" National Theatre	Sofia	Bulgaria	Bulgaria's oldest and most prestigious theatre, serving as the national stage for dramatic arts.	Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria's national poet Ivan Vazov. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations. The theatre building itself is an architectural masterpiece and a symbol of Bulgarian cultural identity. Throughout its history, it has been home to the most celebrated Bulgarian actors and directors.	\N	1904	2025-08-11 09:35:54.792	2025-08-11 09:35:54.792	en	\N
69	Macedonian National Theatre	Skopje	North Macedonia	The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.	Established in 1947 as the premier theatre of North Macedonia, it has been instrumental in developing and preserving Macedonian theatrical traditions while embracing international collaborations. The theatre has been a symbol of Macedonian cultural identity and artistic achievement.	\N	1947	2025-08-11 09:35:58.157	2025-08-11 09:35:58.157	en	\N
70	National Theatre in Niš	Niš	Serbia	A prominent Serbian theatre known for its diverse repertoire and significant contribution to the cultural life of Niš.	Founded in 1887, the National Theatre in Niš has a rich history of theatrical excellence, presenting a wide range of plays from classical to contemporary. It has been a vital cultural institution for the city and the region, fostering artistic talent and engaging with the community.	\N	1887	2025-08-11 09:36:00.929	2025-08-11 09:36:00.929	en	\N
71	OSAIK "39 Monkeys"	Sofia	Bulgaria	An innovative independent theatre collective known for experimental and contemporary performances.	OSAIK '39 Monkeys' is a dynamic theatre group that has been pushing the boundaries of contemporary theatre in Sofia. Known for their creative approach to storytelling and experimental performances, they have gained recognition for bringing fresh perspectives to the Bulgarian theatre scene.	\N	2010	2025-08-11 09:36:03.509	2025-08-11 09:36:03.509	en	\N
72	Intimate Theatre Bitola	Bitola	North Macedonia	A cozy intimate theatre space dedicated to bringing audiences closer to the art of performance.	The Intimate Theater Bitola has been a cultural gem in the historic city of Bitola, providing an intimate setting for both local and international productions. The theatre focuses on creating meaningful connections between performers and audiences through its close-knit performance space.	\N	1995	2025-08-11 09:36:06.19	2025-08-11 09:36:06.19	en	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, password_hash, first_name, last_name, phone, is_admin, email_notifications, marketing_preferences, created_at, updated_at) FROM stdin;
33	admin@actingeurope.com	$2a$10$example.hash.for.admin.user	Admin	User	+1234567890	t	t	f	2025-08-11 09:35:48.734	2025-08-11 09:35:48.734
34	anastasia@actingeurope.eu	$2b$12$Ej3ti9MpuMgHRZgIxmwpCumP2QTZMcpzisMpvRw37W/x5SpROknvG	Anastasia	Admin	\N	t	t	f	2025-08-11 09:35:49.502	2025-08-11 09:35:49.502
35	toni@actingeurope.eu	$2b$12$Ej3ti9MpuMgHRZgIxmwpCumP2QTZMcpzisMpvRw37W/x5SpROknvG	Toni	Admin	\N	t	t	f	2025-08-11 09:35:50.253	2025-08-11 09:35:50.253
\.


--
-- Data for Name: venue_sections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venue_sections (id, venue_id, section_name, section_type, created_at) FROM stdin;
46	29	Main Seating	regular	2025-08-11 09:40:36.662
48	28	Regular Seating	regular	2025-08-11 09:50:59.458
49	28	Balcony Seating	balcony	2025-08-11 09:54:09.214
\.


--
-- Data for Name: venues; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.venues (id, name, description, capacity, created_at, address, city, image_url) FROM stdin;
29	Chamber Stage	Intimate performance space for smaller productions	150	2025-08-11 09:40:36.279	\N	\N	\N
28	Main Stage	Main performance venue with regular and balcony seating	500	2025-08-11 09:36:08.811			
\.


--
-- Name: about_pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_pages_id_seq', 1, false);


--
-- Name: booked_seats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.booked_seats_id_seq', 1, false);


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);


--
-- Name: contact_pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contact_pages_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.events_id_seq', 43, true);


--
-- Name: news_articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.news_articles_id_seq', 9, true);


--
-- Name: seats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.seats_id_seq', 11059, true);


--
-- Name: theatre_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.theatre_images_id_seq', 168, true);


--
-- Name: theatre_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.theatre_tags_id_seq', 288, true);


--
-- Name: theatres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.theatres_id_seq', 72, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 35, true);


--
-- Name: venue_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.venue_sections_id_seq', 49, true);


--
-- Name: venues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.venues_id_seq', 29, true);


--
-- Name: about_pages about_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.about_pages
    ADD CONSTRAINT about_pages_pkey PRIMARY KEY (id);


--
-- Name: booked_seats booked_seats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booked_seats
    ADD CONSTRAINT booked_seats_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: contact_pages contact_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_pages
    ADD CONSTRAINT contact_pages_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: news_articles news_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_articles
    ADD CONSTRAINT news_articles_pkey PRIMARY KEY (id);


--
-- Name: seats seats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_pkey PRIMARY KEY (id);


--
-- Name: theatre_images theatre_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatre_images
    ADD CONSTRAINT theatre_images_pkey PRIMARY KEY (id);


--
-- Name: theatre_tags theatre_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatre_tags
    ADD CONSTRAINT theatre_tags_pkey PRIMARY KEY (id);


--
-- Name: theatres theatres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatres
    ADD CONSTRAINT theatres_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: venue_sections venue_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_sections
    ADD CONSTRAINT venue_sections_pkey PRIMARY KEY (id);


--
-- Name: venues venues_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venues
    ADD CONSTRAINT venues_pkey PRIMARY KEY (id);


--
-- Name: booked_seats_booking_id_seat_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX booked_seats_booking_id_seat_id_key ON public.booked_seats USING btree (booking_id, seat_id);


--
-- Name: bookings_booking_reference_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX bookings_booking_reference_key ON public.bookings USING btree (booking_reference);


--
-- Name: seats_venue_section_id_row_number_seat_number_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX seats_venue_section_id_row_number_seat_number_key ON public.seats USING btree (venue_section_id, row_number, seat_number);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: booked_seats booked_seats_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booked_seats
    ADD CONSTRAINT booked_seats_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booked_seats booked_seats_seat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booked_seats
    ADD CONSTRAINT booked_seats_seat_id_fkey FOREIGN KEY (seat_id) REFERENCES public.seats(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bookings bookings_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: events events_theatre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_theatre_id_fkey FOREIGN KEY (theatre_id) REFERENCES public.theatres(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: events events_venue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_venue_id_fkey FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: seats seats_venue_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_venue_section_id_fkey FOREIGN KEY (venue_section_id) REFERENCES public.venue_sections(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: theatre_images theatre_images_theatre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatre_images
    ADD CONSTRAINT theatre_images_theatre_id_fkey FOREIGN KEY (theatre_id) REFERENCES public.theatres(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: theatre_tags theatre_tags_theatre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.theatre_tags
    ADD CONSTRAINT theatre_tags_theatre_id_fkey FOREIGN KEY (theatre_id) REFERENCES public.theatres(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: venue_sections venue_sections_venue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.venue_sections
    ADD CONSTRAINT venue_sections_venue_id_fkey FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO actingeurope_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO actingeurope_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO actingeurope_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO actingeurope_user;


--
-- PostgreSQL database dump complete
--

\unrestrict js2eewhwkIf8i87MGcCZd6KchdrGqdSMXHTBgdsBdC1tV4mZ84uWgzZougehgMf

