-- Phase 3b: Transfers Table Schema
CREATE TABLE inventory_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transfer_number VARCHAR(100) UNIQUE NOT NULL,
  product_id UUID REFERENCES products(id),
  from_branch_id UUID REFERENCES branches(id), -- Null if from main supplier directly
  to_branch_id UUID REFERENCES branches(id),
  quantity INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Approved, In-Transit, Completed, Rejected
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE inventory_transfers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable ALL access for authorized roles" ON inventory_transfers FOR ALL TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'inventory_officer')
);
