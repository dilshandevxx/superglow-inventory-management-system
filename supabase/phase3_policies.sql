-- RLS Policies for Phase 3 (Inventory & Products)

-- Allow authenticated users to SELECT from tables
CREATE POLICY "Enable read access for all authenticated users" ON categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable read access for all authenticated users" ON brands FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable read access for all authenticated users" ON products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable read access for all authenticated users" ON inventory FOR SELECT TO authenticated USING (true);

-- Allow Insert/Update/Delete for Super Admin, Branch Manager, Inventory Officer
CREATE POLICY "Enable ALL access for authorized roles" ON categories FOR ALL TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'inventory_officer')
);

CREATE POLICY "Enable ALL access for authorized roles" ON brands FOR ALL TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'inventory_officer')
);

CREATE POLICY "Enable ALL access for authorized roles" ON products FOR ALL TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'inventory_officer')
);

CREATE POLICY "Enable ALL access for authorized roles" ON inventory FOR ALL TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'inventory_officer')
);
