-- ==============================================================================
-- SCHEMA POSTGRESQL SUPABASE POUR SITE CONSTRUCTION (EFFICIENS ENERGIA BTP)
-- Centralisation des Demandes de Devis, Prospects & Suivi de Chantiers
-- ==============================================================================

-- 1. Table des Demandes de Devis & Leads Entrants
CREATE TABLE IF NOT EXISTS public.construction_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  client_nom TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_telephone TEXT,
  type_travaux TEXT NOT NULL,
  surface_m2 NUMERIC(8,2),
  budget_estime NUMERIC(12,2),
  code_postal TEXT,
  ville TEXT,
  description TEXT,
  statut TEXT DEFAULT 'nouveau' NOT NULL, -- nouveau, contacte, devis_emis, accepte, cloture
  assigned_to UUID REFERENCES auth.users(id)
);

-- 2. Table des Chantiers en Cours
CREATE TABLE IF NOT EXISTS public.chantiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nom_projet TEXT NOT NULL,
  adresse TEXT,
  date_debut DATE,
  date_fin_prevue DATE,
  budget_total NUMERIC(12,2),
  progression_pct INTEGER DEFAULT 0 CHECK (progression_pct BETWEEN 0 AND 100),
  statut TEXT DEFAULT 'en_cours' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Activation de la Securite RLS
ALTER TABLE public.construction_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chantiers ENABLE ROW LEVEL SECURITY;

-- 4. Politiques RLS Construction
-- Soumission de devis ouverte a tout visiteur du site (anon)
DROP POLICY IF EXISTS "Tout visiteur peut deposer une demande de devis" ON public.construction_leads;
CREATE POLICY "Tout visiteur peut deposer une demande de devis"
  ON public.construction_leads FOR INSERT
  WITH CHECK (true);

-- Consultation et mise a jour reservees aux collaborateurs authentifies
DROP POLICY IF EXISTS "Collaborateurs peuvent consulter les leads" ON public.construction_leads;
CREATE POLICY "Collaborateurs peuvent consulter les leads"
  ON public.construction_leads FOR SELECT
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Collaborateurs peuvent mettre a jour les leads" ON public.construction_leads;
CREATE POLICY "Collaborateurs peuvent mettre a jour les leads"
  ON public.construction_leads FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Chantiers geres par l'equipe authentifiee
DROP POLICY IF EXISTS "Collaborateurs gerent leurs chantiers" ON public.chantiers;
CREATE POLICY "Collaborateurs gerent leurs chantiers"
  ON public.chantiers FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);