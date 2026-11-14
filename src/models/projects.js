import db from './db.js'

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
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
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

    return result.rows;
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

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails }