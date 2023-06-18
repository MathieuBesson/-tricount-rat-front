import { HttpMethod, Ressource } from "../types/helpers";

export const callApi = async (ressource: Ressource, method: HttpMethod, param?: string | null, body?: {}) => {
    try {
        // Requête API
        const res = await fetch(
            `http://localhost:3000/${ressource}/` + (param ? param : ""),
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }
        );
        // Retoure de la requête en json
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}