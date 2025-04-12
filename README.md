# Fetch-frontend-take-home
FE Exercise

# Summary

Time Management

- I spent approximately 6 hours on this project.
- I reached out to my recruiter to clarify whether the goal was to implement all features or to focus on a smaller, more polished and robust set. Unfortunately, I didn’t receive a response in time to guide that decision.
- Rather than giving myself unlimited time, I chose to work within a defined window. I felt this would better reflect my ability to prioritize, plan, and deliver under realistic constraints. While I considered implementing every possible feature (using all available endpoints), I believed this could create an uneven comparison if other candidates had less time. My goal was to deliver a thoughtful, high-quality submission within a reasonable and self-imposed time limit.

Matching feature

- The **Match** functionality is accessible via a button integrated into the NavBar. This approach keeps the layout of both the **Search** and **Favorites** pages consistent and reusable.
- Although the button lives in the NavBar, proper checks are in place to handle edge cases. For example, if no dogs have been favorited, the user is shown a message prompting them to favorite dogs before attempting to match.

Favoriting feature

- Minimal banner-style notifications were added to improve the user experience around favoriting actions. While simple in design, they contribute to a more polished and responsive feel throughout the app.

Filters implemented

- Filters can be found in the sidebar. The filters can be applied to ***BOTH*** the `search` and `favorites` page! When navigating between these two pages, the filters will reset (this is intentional).
- The "`breeds`" and "`zipCodes`" filters use a reusable `ComboBox` component, which also displays selected values as a list to enhance user experience.
- The implemented filters align with all available parameters from the `*GET /dogs/search*` endpoint
- `breeds`
- `zipCodes`
- `ageMin`
- `ageMax`
- `Sort By`
- `Sort Direction`
- I chose not to implement the location-based filters from the location endpoint. Given the time constraints, I prioritized a complete and thoughtful implementation of the search filters instead. This decision reflects my ability to scope work appropriately, and also demonstrates that I had the technical capability to implement the location filters — I simply opted not to, in order to maintain quality and focus.

Reusability & Planning

- The project is structured by feature, allowing each feature to contain its own components, hooks, layouts, styles, and store logic (if needed). This significantly improves both **readability** and **reusability**.
    - For example: the `SearchLayout` component (located within the `search` feature folder) is a specialized wrapper around the more generic `MainPageLayout` component (located in the base layout folder, outside of features). This makes component relationships intuitive and easy to trace.

Styling Reusability

- This structure also supports clear and scalable styling organization. Styles that are shared across the app live in a central styling folder, while styles that are specific to a feature are scoped within that feature’s folder.
- This separation also improves the use and clarity of `twMerge` (*tailwind-merge*), since base styles and variants are localized appropriately. It helps keep class merging predictable and easier to reason about during development.
