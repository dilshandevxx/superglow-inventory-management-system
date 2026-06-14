-- Phase 5 Schema: Suppliers, Finance (Expenses & Income)

-- 1. Suppliers
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  balance DECIMAL(10, 2) DEFAULT 0, -- Amount we owe them
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Finance / Expenses
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branches(id),
  type transaction_type NOT NULL,
  category VARCHAR(100) NOT NULL, -- Utility, Salary, Supplier Payment, Misc Income
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  reference_id UUID, -- Optional link to sale_id, transfer_id, or supplier_id
  recorded_by UUID REFERENCES user_profiles(id),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users" ON suppliers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable ALL access for authorized roles" ON suppliers FOR ALL TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'inventory_officer', 'accountant')
);

CREATE POLICY "Enable read access for authenticated users" ON transactions FOR SELECT TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'accountant')
);
CREATE POLICY "Enable ALL access for authorized roles" ON transactions FOR ALL TO authenticated USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('super_admin', 'branch_manager', 'accountant')
);
