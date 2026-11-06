CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organizations (name, description, contact_email, logo_filename) VALUES
(
    'BrightFuture Builders', 
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
    'info@brightfuturebuilders.org', 
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers', 
    'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
    'contact@greenharvest.org', 
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers', 
    'A volunteer coordination group supporting local charities and service initiatives.', 
    'hello@unityserve.org', 
    'unityserve-logo.png'
);

SELECT * FROM organizations;

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id) 
        REFERENCES organizations (organization_id)
        ON DELETE CASCADE
);

INSERT INTO service_projects (organization_id, title, description, location, project_date) VALUES
-- 🏢 BrightFuture Builders (organization_id: 1)
(1, 'Community Park Bench Restoration', 'Building and repairing eco-friendly benches using recycled plastic materials for the local park.', 'Oakwood Community Park', '2027-02-15'),
(1, 'Library Accessibility Ramp Construction', 'Constructing a wheelchair-accessible wooden ramp to improve mobility access at the public library.', 'Downtown Public Library', '2027-03-10'),
(1, 'Eco-Friendly Community Center Painting', 'Applying non-toxic, sustainable paint to the exterior walls of the youth neighborhood center.', 'Eastside Youth Center', '2027-04-05'),
(1, 'Solar Panel Installation Workshop', 'Helping install a small solar array on a community shelter roof while educating youth on green energy.', 'Hope Shelter Home', '2027-05-12'),
(1, 'Sidewalk Safety Repairs', 'Fixing cracked pathways and installing pedestrian safety indicators near the local elementary school.', 'West Maple School Zone', '2027-06-20'),

-- 🚜 GreenHarvest Growers (organization_id: 2)
(2, 'Spring Seed Planting Day', 'Preparing the soil and planting organic vegetable seeds for the upcoming community spring harvest.', 'North End Urban Farm', '2027-03-22'),
(2, 'Rainwater Harvesting System Setup', 'Assembling and installing water collection barrels to establish a sustainable irrigation loop.', 'Community Rooftop Garden', '2027-04-18'),
(2, 'Composting and Soil Science Class', 'Teaching local families how to turn kitchen waste into nutrient-rich soil and setting up compost bins.', 'GreenHarvest Training Hub', '2027-05-02'),
(2, 'School Garden Bed Construction', 'Building raised wooden garden beds to help elementary students learn about urban farming.', 'Riverdale Primary School', '2027-05-28'),
(2, 'Pollinator Friendly Flower Planting', 'Planting native wild flowers to support local bee populations and improve crop pollination.', 'Sunnyvale Botanical Plot', '2027-06-14'), -- <-- Aquí faltaba la coma


(3, 'Senior Center Companion and Tech Day', 'Spending the afternoon reading with seniors and helping them set up video calls to connect with family.', 'Silver Linings Retirement Home', '2027-02-20'),
(3, 'Community Food Pantry Sorting', 'Organizing non-perishable food donations and packing grocery bags for low-income families.', 'UnityServe Logistics Warehouse', '2027-03-05'),
(3, 'After-School Homework Tutoring', 'Providing academic support in math and English to middle school students from underserved areas.', 'Beacon Neighborhood Hub', '2027-03-15'),
(3, 'Local Beach Clean-up Campaign', 'Gathering volunteers to remove plastic waste, glass, and debris from the shoreline after storm season.', 'South Bay Coastal Beach', '2027-04-25'),
(3, 'Charity Clothing Drive and Classification', 'Sorting through seasonal clothing donations to distribute them to local winter shelters.', 'Central Charity Depository', '2027-05-19');

SELECT * FROM service_projects;