-- Create donation status enum
CREATE TYPE public.donation_status AS ENUM ('pending', 'completed', 'failed');

-- Create causes table
CREATE TABLE public.causes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  goal INTEGER NOT NULL DEFAULT 0,
  raised INTEGER NOT NULL DEFAULT 0,
  supporters INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on causes
ALTER TABLE public.causes ENABLE ROW LEVEL SECURITY;

-- Everyone can read causes
CREATE POLICY "Causes are publicly readable"
  ON public.causes FOR SELECT
  USING (true);

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cause_slug TEXT NOT NULL REFERENCES public.causes(slug),
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  amount INTEGER NOT NULL,
  mpesa_checkout_id TEXT,
  mpesa_receipt TEXT,
  status public.donation_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Public can insert donations (no auth required for donors)
CREATE POLICY "Anyone can create donations"
  ON public.donations FOR INSERT
  WITH CHECK (true);

-- Public can read donations (for polling status)
CREATE POLICY "Anyone can read donations"
  ON public.donations FOR SELECT
  USING (true);

-- Create index for polling by checkout ID
CREATE INDEX idx_donations_checkout_id ON public.donations(mpesa_checkout_id);

-- Create index for cause aggregation
CREATE INDEX idx_donations_cause_slug ON public.donations(cause_slug);