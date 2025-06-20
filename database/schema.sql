-- Acting Europe Festival Database Schema

-- Users table for authentication and user management
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT FALSE,
    email_notifications BOOLEAN DEFAULT TRUE,
    marketing_preferences BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Theatres table for participating theatres
CREATE TABLE theatres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    description TEXT,
    history TEXT,
    website VARCHAR(255),
    founded_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Theatre images for gallery
CREATE TABLE theatre_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    theatre_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (theatre_id) REFERENCES theatres(id) ON DELETE CASCADE
);

-- Theatre tags
CREATE TABLE theatre_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    theatre_id INT NOT NULL,
    tag_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (theatre_id) REFERENCES theatres(id) ON DELETE CASCADE
);

-- Venues table
CREATE TABLE venues (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Venue sections (Main Stage has regular and balcony sections)
CREATE TABLE venue_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venue_id INT NOT NULL,
    section_name VARCHAR(50) NOT NULL,
    section_type ENUM('regular', 'balcony') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Seat layout for each venue section
CREATE TABLE seats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venue_section_id INT NOT NULL,
    row_number INT NOT NULL,
    seat_number INT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_section_id) REFERENCES venue_sections(id) ON DELETE CASCADE,
    UNIQUE KEY unique_seat (venue_section_id, row_number, seat_number)
);

-- Events/Performances table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    theatre_id INT NOT NULL,
    venue_id INT NOT NULL,
    event_type ENUM('performance', 'workshop', 'discussion') NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    duration_minutes INT,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    language VARCHAR(50),
    genre VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (theatre_id) REFERENCES theatres(id),
    FOREIGN KEY (venue_id) REFERENCES venues(id)
);

-- Bookings table
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    booking_status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Booked seats
CREATE TABLE booked_seats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    seat_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE KEY unique_booked_seat (booking_id, seat_id)
);

-- News articles
CREATE TABLE news_articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    author VARCHAR(100),
    published_at TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial data for venues
INSERT INTO venues (name, description, capacity) VALUES 
('Main Stage', 'Main performance venue with regular and balcony seating', 500),
('Chamber Stage', 'Intimate performance space for smaller productions', 150);

-- Insert venue sections
INSERT INTO venue_sections (venue_id, section_name, section_type) VALUES 
(1, 'Regular Seating', 'regular'),
(1, 'Balcony Seating', 'balcony'),
(2, 'Main Seating', 'regular');

-- Insert seats for Main Stage Regular Section
-- Row 1: 22 seats
INSERT INTO seats (venue_section_id, row_number, seat_number) 
SELECT 1, 1, seat_num FROM (
    SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
    SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION 
    SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION 
    SELECT 21 UNION SELECT 22
) as seats;

-- Row 2: 27 seats
INSERT INTO seats (venue_section_id, row_number, seat_number) 
SELECT 1, 2, seat_num FROM (
    SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
    SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION 
    SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION 
    SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION 
    SELECT 26 UNION SELECT 27
) as seats;

-- Continue with all other rows for Main Stage Regular Section...
-- (Full implementation would include all 17 rows with correct seat counts)

-- Insert seats for Main Stage Balcony Section
-- Balcony rows 1-7 with alternating 30/29 seats

-- Insert seats for Chamber Stage
-- Row 1: 12 seats
INSERT INTO seats (venue_section_id, row_number, seat_number) 
SELECT 3, 1, seat_num FROM (
    SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
    SELECT 11 UNION SELECT 12
) as seats;

-- Row 2: 13 seats
INSERT INTO seats (venue_section_id, row_number, seat_number) 
SELECT 3, 2, seat_num FROM (
    SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
    SELECT 11 UNION SELECT 12 UNION SELECT 13
) as seats;

-- Row 3: 14 seats
INSERT INTO seats (venue_section_id, row_number, seat_number) 
SELECT 3, 3, seat_num FROM (
    SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
    SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
) as seats;

-- Rows 4, 5, 6: 13 seats each
INSERT INTO seats (venue_section_id, row_number, seat_number) 
SELECT 3, row_num, seat_num FROM (
    SELECT 4 as row_num UNION SELECT 5 UNION SELECT 6
) rows CROSS JOIN (
    SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
    SELECT 11 UNION SELECT 12 UNION SELECT 13
) seats;

-- Rows 7, 8: 9 seats each
INSERT INTO seats (venue_section_id, row_number, seat_number) 
SELECT 3, row_num, seat_num FROM (
    SELECT 7 as row_num UNION SELECT 8
) rows CROSS JOIN (
    SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
) seats;

-- Insert participating theatres
INSERT INTO theatres (name, city, country, description, history, founded_year) VALUES 
(
    'Drama Theatre "Krum Kyulyavkov"', 
    'Kyustendil', 
    'Bulgaria',
    'A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.',
    'Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent.',
    1952
),
(
    '"Ivan Vazov" National Theatre', 
    'Sofia', 
    'Bulgaria',
    'Bulgaria\'s oldest and most prestigious theatre, serving as the national stage for dramatic arts.',
    'Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria\'s national poet. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations.',
    1904
),
(
    '"N. O. Masalitinov" Plovdiv Drama Theatre', 
    'Plovdiv', 
    'Bulgaria',
    'One of Bulgaria\'s leading regional theatres, known for its diverse repertoire and artistic excellence.',
    'Named after the renowned Bulgarian actor Nikola Masalitinov, this theatre has been a cultural beacon in Plovdiv since its establishment, contributing significantly to Bulgarian theatrical heritage.',
    1881
),
(
    '"Jordan Hadzi Konstantinov - Dzinot" Drama Theatre', 
    'Veles', 
    'North Macedonia',
    'A distinguished theatre company from Veles, continuing the legacy of theatrical excellence in North Macedonia.',
    'Named after Jordan Hadzi Konstantinov - Dzinot, a prominent figure in Macedonian theatre, this institution has been a vital part of the cultural landscape in Veles since its founding.',
    1945
),
(
    'National Theatre', 
    'Belgrade', 
    'Serbia',
    'Serbia\'s premier theatrical institution, renowned for its classical and contemporary productions.',
    'Founded in the 19th century, the National Theatre of Belgrade has been the cornerstone of Serbian dramatic arts, hosting world-class productions and fostering theatrical innovation.',
    1868
),
(
    'Macedonian National Theatre', 
    'Skopje', 
    'North Macedonia',
    'The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.',
    'Established as the premier theatre of North Macedonia, it has been instrumental in developing and preserving Macedonian theatrical traditions while embracing international collaborations.',
    1947
);
