## Summary

Completed:

-   Fixed anti-patterns and bugs to make the app functional as designed
-   Added key UI states to support frontend/backend API requests
-   Connected the frontend to the database

Next high priorities:

-   Add debounce to frontend API requests to reduce request volume (effort: XS)
-   Support search and DB queries for phone number and years of experience (effort: MD)
-   Fix UI bugs such as initial empty loading state (effort: XS)
-   Add pagination for scalability (effort: MD)
-   Redesign search to support filtering by specialty via dropdown (effort: MD)

Other considerations for scalbility and code quality:

-   Use react-query for frontend caching and async state
-   Optimize DB search using indexing on relevant columns
-   Improve search UX by introducing more structured filter inputs
-   Add API validation for more robust request handling
-   Set up unit tests for critical logic
-   Improve styling consistency and polish tailwind / shadcn

## Discovery Notes:

_RObservations from initial discovery session_

-   Fix FE errors
    -   fix general errors
    -   filter advocates list on the FE (should be BE)
    -   DOM minipulation
    -   TS errors and lack of typings
    -   Search
        -   button states (disabled, loading)
        -   Table
            -   UI states (loading, error handling, no results)
    -   UI
        -   no styles
    -   Subcomponents (One large base component)
-   BE API
    -   Move filtering to BE
    -   Fetch all advocates
    -   Fetch by serach term
    -   Uses mock data
-   DB
    -   Set up DB to use data
    -   Schema update? To optimize search design
-   Optimize (redesign search for scalability)
    -   debounce Search input to minimise queries (ref: https://medium.com/nerd-for-tech/debounce-your-search-react-input-optimization-fd270a8042b)
    -   Set up filters vs omni-search by generic string
        -   setup DB indexing for specific DB columns (L: requires research)
    -   pagination? Add a limit to the DB fetch, then add pagination to DB query, pass params from FE to handle pagination
    -   Similarity search using pg-vector https://orm.drizzle.team/docs/extensions/pg#pg_vector (larger research - I don't think similarity si what we want for optimal search)
    -   Drizzle full-text search (https://orm.drizzle.team/docs/guides/postgresql-full-text-search) - looks like a layer of column indexing, might be worth using or building indexing natively
