# Creatorverse

Submitted by: Mitch
Time spent: X hours

## Summary
Creatorverse is a React + Vite single-page app that showcases inspiring digital creators. It connects directly to Supabase for real-time CRUD operations and seeds the database with example creators when empty. Each creator appears as a responsive card with shortcuts to view, edit, or delete their profile.

## Supabase Setup
1. Create a table named `creators` with columns `id` (int8, PK), `name` (text), `url` (text), `description` (text), and `imageURL` (text).
2. Copy your Supabase project URL and anon public API key.
3. Add them to the `.env` file:
   ```bash
   VITE_SUPABASE_URL=<your_supabase_url>
   VITE_SUPABASE_API_KEY=<your_supabase_api_key>
   ```
4. Restart the dev server after updating the `.env` file.

## Required Features
- [x] User can view all creators in a card-based grid on the home page.
- [x] User can add a new creator via a Supabase-backed form.
- [x] User can edit an existing creator and persist changes to Supabase.
- [x] User can delete a creator and see the list refresh without a reload.
- [x] User can view detailed information for a selected creator.
- [x] App seeds five example creators when the table is empty.

## Optional Enhancements
- [ ] Search and filter creators by platform or tags.
- [ ] Optimistic UI updates during create/update/delete actions.
- [ ] Dark mode theme toggle.

## Video Walkthrough
Embed your walkthrough GIF or link here once recorded.

## Development
- `npm install`
- `npm run dev`

## Notes
- Sample creator data uses royalty-free imagery via Unsplash.
- Environment variables must never be committed with real keys.

## License
```
Copyright 2025 Mitch

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
