-- SQL script to fix company names from '39 Monkeys' to '36 Monkeys'

-- Update events table where company array contains 'OSAIK "39 Monkeys"'
UPDATE events 
SET company = array_replace(company, 'OSAIK "39 Monkeys"', 'OSAIK "36 Monkeys"')
WHERE 'OSAIK "39 Monkeys"' = ANY(company);

-- Update events table where company array contains Bulgarian version
UPDATE events 
SET company = array_replace(company, 'ОСАИК "39 Маймуни"', 'ОСАИК "36 Маймуни"')
WHERE 'ОСАИК "39 Маймуни"' = ANY(company);

-- Update events table where company array contains Macedonian version
UPDATE events 
SET company = array_replace(company, 'ОСАИК "39 Мајмуни"', 'ОСАИК "36 Мајмуни"')
WHERE 'ОСАИК "39 Мајмуни"' = ANY(company);

-- Update events table where company array contains Serbian version
UPDATE events 
SET company = array_replace(company, 'ОСАИК "39 Мајмуна"', 'ОСАИК "36 Мајмуна"')
WHERE 'ОСАИК "39 Мајмуна"' = ANY(company);

-- Check results
SELECT id, title, company, content_language 
FROM events 
WHERE company::text LIKE '%39%' OR company::text LIKE '%36%';