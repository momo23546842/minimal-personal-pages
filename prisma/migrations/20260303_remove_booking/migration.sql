-- Migration: remove Booking and AvailableHours tables
-- Created: 2026-03-03

DROP TABLE IF EXISTS "Booking" CASCADE;
DROP TABLE IF EXISTS "AvailableHours" CASCADE;
