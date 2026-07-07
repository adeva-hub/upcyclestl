/*
# Create style_survey_responses table

## Purpose
Stores responses from the Upcycle STL style questionnaire survey.
No auth required — visitors can submit anonymously.

## New Tables
- `style_survey_responses`
  - `id` (uuid, primary key, auto-generated)
  - `style_identity` (text) — selected style personality option
  - `motivation` (text) — what draws them to upcycled fashion
  - `garment_interest` (text) — type of piece they're looking for
  - `name` (text, nullable) — optional contact name
  - `email` (text, nullable) — optional contact email
  - `created_at` (timestamptz) — submission timestamp

## Security
- RLS enabled on `style_survey_responses`.
- Public insert and select allowed to `anon` and `authenticated` roles.
  This is a brand survey — all submissions are intentionally readable to
  the studio (no user-owned private data) and writable by any visitor.
*/

CREATE TABLE IF NOT EXISTS style_survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  style_identity text NOT NULL,
  motivation text NOT NULL,
  garment_interest text NOT NULL,
  name text,
  email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE style_survey_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_survey" ON style_survey_responses;
CREATE POLICY "anon_select_survey" ON style_survey_responses FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_survey" ON style_survey_responses;
CREATE POLICY "anon_insert_survey" ON style_survey_responses FOR INSERT
TO anon, authenticated WITH CHECK (true);
