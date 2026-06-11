-- =============================================
-- SECURITY FIX: Admin-Only RLS Policies
-- Substitui as políticas fracas "any authenticated user"
-- por políticas que verificam a tabela admin_users.
--
-- COMO USAR:
--   1. Execute este script no Supabase SQL Editor
--   2. Após executar, vá em Authentication > Users no painel Supabase
--   3. Copie o UUID do seu usuário admin
--   4. Execute: INSERT INTO admin_users (id) VALUES ('<seu-uuid>');
-- =============================================

-- 1. Criar tabela de admins (referencia auth.users do Supabase)
CREATE TABLE IF NOT EXISTS admin_users (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Ninguém pode ler/escrever na admin_users exceto via service_role
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- Sem políticas públicas = apenas service_role acessa (padrão do Supabase)

-- 2. Função helper para verificar se o usuário atual é admin
-- Usar SECURITY DEFINER + search_path fixo evita privilege escalation
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  );
$$;

-- 3. Remover políticas antigas (fracas)
DROP POLICY IF EXISTS "Authenticated users can manage clients"  ON clients;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can manage finance"  ON finance;
DROP POLICY IF EXISTS "Authenticated users can manage domains"  ON domains;

-- 4. Criar políticas novas — apenas admins verificados
CREATE POLICY "Admins can manage clients"
  ON clients FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can manage finance"
  ON finance FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can manage domains"
  ON domains FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- 5. Verificação: confirmar que as políticas foram criadas
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('clients', 'projects', 'finance', 'domains')
ORDER BY tablename, policyname;
