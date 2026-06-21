"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Store, Users, Shield, Plus, Building, MapPin, Phone, User as UserIcon, Briefcase } from "lucide-react";
import { addBranch } from "./actions";

export function SettingsClient({ branches, staff }: { branches: any[], staff: any[] }) {
  const [activeTab, setActiveTab] = useState("branches");
  
  // Add Branch Form State
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchPhone, setBranchPhone] = useState("");
  const [isSubmittingBranch, setIsSubmittingBranch] = useState(false);
  const [showAddBranch, setShowAddBranch] = useState(false);

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName) return;
    
    setIsSubmittingBranch(true);
    const result = await addBranch({ name: branchName, address: branchAddress, phone: branchPhone });
    
    if (result.error) {
      alert(result.error);
    } else {
      setBranchName("");
      setBranchAddress("");
      setBranchPhone("");
      setShowAddBranch(false);
    }
    setIsSubmittingBranch(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <button 
          onClick={() => setActiveTab("general")}
          className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'general' ? 'bg-[#252525] text-white shadow-sm' : 'text-[#A1A1AA] hover:bg-[#252525]/40 hover:text-white'}`}
        >
          <SettingsIcon className={`h-5 w-5 ${activeTab === 'general' ? 'text-[#D1E8D5]' : ''}`} /> General
        </button>
        <button 
          onClick={() => setActiveTab("branches")}
          className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'branches' ? 'bg-[#252525] text-white shadow-sm' : 'text-[#A1A1AA] hover:bg-[#252525]/40 hover:text-white'}`}
        >
          <Store className={`h-5 w-5 ${activeTab === 'branches' ? 'text-[#D1E8D5]' : ''}`} /> Branches
        </button>
        <button 
          onClick={() => setActiveTab("staff")}
          className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'staff' ? 'bg-[#252525] text-white shadow-sm' : 'text-[#A1A1AA] hover:bg-[#252525]/40 hover:text-white'}`}
        >
          <Users className={`h-5 w-5 ${activeTab === 'staff' ? 'text-[#D1E8D5]' : ''}`} /> Staff & Users
        </button>
        <button 
          onClick={() => setActiveTab("roles")}
          className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'roles' ? 'bg-[#252525] text-white shadow-sm' : 'text-[#A1A1AA] hover:bg-[#252525]/40 hover:text-white'}`}
        >
          <Shield className={`h-5 w-5 ${activeTab === 'roles' ? 'text-[#D1E8D5]' : ''}`} /> Roles & Permissions
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* Branches Tab */}
        {activeTab === 'branches' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Branch Management</h2>
                <p className="text-sm text-[#A1A1AA]">Manage physical store locations and warehouses.</p>
              </div>
              <button 
                onClick={() => setShowAddBranch(!showAddBranch)}
                className="bg-[#D1E8D5] text-[#1A1A1A] hover:bg-white transition-colors px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} /> Add Branch
              </button>
            </div>

            {/* Add Branch Form */}
            {showAddBranch && (
              <div className="bg-[#1A1A1A] border border-[#D1E8D5]/30 rounded-[24px] p-6 shadow-xl animate-in zoom-in-95">
                <h3 className="font-bold text-white mb-4">Create New Branch</h3>
                <form onSubmit={handleAddBranch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
                      <input 
                        type="text" required placeholder="Branch Name"
                        value={branchName} onChange={e => setBranchName(e.target.value)}
                        className="w-full bg-[#09090B] border border-[#252525] rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#D1E8D5] focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
                      <input 
                        type="text" placeholder="Phone Number"
                        value={branchPhone} onChange={e => setBranchPhone(e.target.value)}
                        className="w-full bg-[#09090B] border border-[#252525] rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#D1E8D5] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
                    <input 
                      type="text" placeholder="Full Address"
                      value={branchAddress} onChange={e => setBranchAddress(e.target.value)}
                      className="w-full bg-[#09090B] border border-[#252525] rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#D1E8D5] focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setShowAddBranch(false)} className="px-5 py-2.5 rounded-full font-bold text-white hover:bg-[#252525] transition-colors">Cancel</button>
                    <button type="submit" disabled={isSubmittingBranch} className="bg-[#D1E8D5] text-[#1A1A1A] px-5 py-2.5 rounded-full font-bold transition-colors hover:bg-white disabled:opacity-50">Save Branch</button>
                  </div>
                </form>
              </div>
            )}

            {/* Branch List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
              {branches.map((branch) => (
                <div key={branch.id} className="bg-[#1A1A1A] border border-[#252525] rounded-[24px] p-6 hover:border-[#333] transition-colors group relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-[#252525] flex items-center justify-center text-[#D1E8D5]">
                      <Store className="h-6 w-6" />
                    </div>
                    <span className="px-3 py-1 bg-[#D1E8D5]/10 text-[#D1E8D5] text-[10px] font-bold rounded-full border border-[#D1E8D5]/20 uppercase tracking-wider">
                      {branch.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-1">{branch.name}</h3>
                  <div className="space-y-1 mt-3 text-sm text-[#A1A1AA]">
                    <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {branch.address || 'No address specified'}</p>
                    <p className="flex items-center gap-2"><Phone className="h-3 w-3" /> {branch.phone || 'No phone specified'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === 'staff' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Staff Profiles</h2>
                <p className="text-sm text-[#A1A1AA]">Manage user access and roles across branches.</p>
              </div>
              <button className="bg-[#252525] text-white hover:bg-white hover:text-[#1A1A1A] transition-colors px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm">
                <Plus className="h-4 w-4" strokeWidth={2.5} /> Invite Staff
              </button>
            </div>

            <div className="bg-[#1A1A1A] border border-[#252525] rounded-[24px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#252525] bg-[#111113]">
                      <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Staff Member</th>
                      <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Role</th>
                      <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Branch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#252525]">
                    {staff.map((member) => (
                      <tr key={member.id} className="hover:bg-[#252525]/30 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#252525] flex items-center justify-center text-[#A1A1AA] font-bold">
                              <UserIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-white">{member.full_name}</p>
                              <p className="text-xs text-[#A1A1AA]">Joined {new Date(member.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#A5D8FF]/10 text-[#A5D8FF] border border-[#A5D8FF]/20 capitalize">
                            <Briefcase className="h-3 w-3" /> {member.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-5">
                          <p className="text-sm font-semibold text-[#A1A1AA]">
                            {member.branches?.name || 'All Branches (Super Admin)'}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* General / Roles Tabs Placeholder */}
        {(activeTab === 'general' || activeTab === 'roles') && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#1A1A1A] border border-[#252525] rounded-[32px] text-center p-8">
            <SettingsIcon className="h-12 w-12 text-[#333] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Configuration Pending</h3>
            <p className="text-sm text-[#A1A1AA]">These settings modules will be enabled in the upcoming Phase 5 rollout.</p>
          </div>
        )}

      </div>
    </div>
  );
}
