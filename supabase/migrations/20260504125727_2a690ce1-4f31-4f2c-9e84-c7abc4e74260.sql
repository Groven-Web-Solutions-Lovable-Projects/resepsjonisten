-- Tabell for demo-henvendelser fra forsidens kontaktskjema
CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT,                    -- 'pricing' | 'lost-calls' | 'contact'
  calculator_data JSONB,          -- snapshot fra kalkulator hvis tilgjengelig
  calculator_summary TEXT,        -- lesbar oppsummering av kalkulatoren
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Hvem som helst (anonym) kan opprette en henvendelse, med fornuftige lengdebegrensninger
CREATE POLICY "Anyone can submit a demo request"
ON public.demo_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(email) <= 255
  AND (company IS NULL OR length(company) <= 200)
  AND (phone IS NULL OR length(phone) <= 50)
  AND (message IS NULL OR length(message) <= 2000)
  AND (source IS NULL OR length(source) <= 50)
  AND (calculator_summary IS NULL OR length(calculator_summary) <= 2000)
  AND (user_agent IS NULL OR length(user_agent) <= 500)
);

-- Ingen SELECT/UPDATE/DELETE-policy = ingen kan lese/endre via klient.
-- Du kan hente dem via Lovable Cloud sin databasevisning.

CREATE INDEX idx_demo_requests_created_at ON public.demo_requests (created_at DESC);