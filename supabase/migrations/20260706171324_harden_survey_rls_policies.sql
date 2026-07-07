/*
# Harden RLS policies on style_survey_responses

## Changes
- `anon_insert_survey`: Replace `WITH CHECK (true)` with a real predicate
  that enforces all three required answer fields are non-null and non-empty.
  Prevents malformed/empty rows from being inserted by any role.
- `anon_select_survey`: Restrict SELECT to `authenticated` only.
  Anonymous visitors have no reason to read the full survey response table;
  only studio staff (signed-in users) need that access.

## Security notes
- INSERT remains open to `anon` + `authenticated` because the survey is
  intentionally submitted by unauthenticated visitors. The `WITH CHECK`
  predicate is now a genuine constraint, not a pass-through.
- SELECT is now admin-only (authenticated), reducing public data exposure.
*/

DROP POLICY IF EXISTS "anon_select_survey" ON style_survey_responses;
CREATE POLICY "anon_select_survey" ON style_survey_responses FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_survey" ON style_survey_responses;
CREATE POLICY "anon_insert_survey" ON style_survey_responses FOR INSERT
TO anon, authenticated
WITH CHECK (
  style_identity IS NOT NULL AND style_identity <> '' AND
  motivation     IS NOT NULL AND motivation     <> '' AND
  garment_interest IS NOT NULL AND garment_interest <> ''
);
