import db from './db.js'
import { getCategoriesByProjectId } from './categories.js';

const getAllProjects = async () => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.project_date,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_projects p
        INNER JOIN public.organizations o 
            ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.project_date,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_projects p
        INNER JOIN public.organizations o 
            ON p.organization_id = o.organization_id
        WHERE p.organization_id = $1
        ORDER BY p.project_date ASC;
    `;
      
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    const projects = result.rows;
    for (const project of projects) {
        project.categories = await getCategoriesByProjectId(project.project_id);
    }

    return projects;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.project_date,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_projects p
        JOIN public.organizations o 
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    const projects = result.rows;

    for (const project of projects) {
        project.categories = await getCategoriesByProjectId(project.project_id);
    }

    return projects;
}

const getProjectDetails = async (id) => {
    const query = `
        SELECT
        p.project_id,
        p.title,
        p.description,
        p.project_date,
        p.location,
        p.organization_id,
        o.name AS organization_name,
        o.logo_filename
        FROM service_projects p
        JOIN public.organizations o 
            ON p.organization_id = o.organization_id
        WHERE project_id = $1;
    `;

    // Parameterized query: By using this, instead of string concatenation, we can avoid passing
    // unescaped code instructions to the SQL query (SQL Injection). 
    const queryParams = [id];
    const result = await db.query(query, queryParams);

    // Return the first row of the result set, or null if no rows are found
    return result.rows.length > 0 ? result.rows[0] : null;
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.project_date,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_projects p
        INNER JOIN public.project_categories pc 
            ON p.project_id = pc.project_id
        INNER JOIN public.organizations o 
            ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date ASC;
    `;

    const result = await db.query(query, [categoryId]);
    const projects = result.rows;

    for (const project of projects) {
        project.categories = await getCategoriesByProjectId(project.project_id);
    }

    return projects;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId }