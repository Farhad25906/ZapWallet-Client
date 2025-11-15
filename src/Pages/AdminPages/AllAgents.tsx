import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Eye,
  Mail,
  Phone,
  User,
  CreditCard,
  Calendar,
  Play,
  Pause,
  Ban,
} from "lucide-react";
import { toast } from "sonner";
import ZapWalletLoader from "@/utils/ZapWalletLoader";
import { IsActiveValues, type Agent, type IsActive } from "@/types";

import {
  useAllAgentsQuery,
  useChangeActivityStatusMutation,
} from "@/redux/features/user/user.api";
import type { ApprovalStatus } from "@/types/user.type";

const AllAgents = () => {
  const { data, isLoading } = useAllAgentsQuery(undefined);
  const [changeActivityStatus] = useChangeActivityStatusMutation();

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleView = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsViewModalOpen(true);
  };

  const handleChangeStatus = async (id: string, newStatus: IsActive) => {
    try {
      const data = {
        id,
        isActive: newStatus,
      };
      console.log(data);

      const res = await changeActivityStatus(data).unwrap();
      console.log("User Updated successfully:", res);
      toast.success(`User status changed to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to change user status");
      console.error("Error changing user status:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserActiveVariant = (status: IsActive) => {
    switch (status) {
      case IsActiveValues.ACTIVE:
        return "bg-green-500 hover:bg-green-600";
      case IsActiveValues.INACTIVE:
        return "bg-yellow-500 hover:bg-yellow-600";
      case IsActiveValues.SUSPENDED:
        return "bg-red-500 hover:bg-red-600";
      case IsActiveValues.BLOCKED:
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getStatusBadgeVariant = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      case "suspended":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) return <ZapWalletLoader />;

  const agents: Agent[] = data?.data || [];

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-black text-[#009689] flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            All Agents
          </CardTitle>
          <p className="text-slate-600 text-xs sm:text-sm">
            Manage all agent accounts and their status
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b-2 border-slate-200 hover:bg-slate-50">
                  <TableHead className="font-bold text-[#009689] text-xs sm:text-sm">
                    Name
                  </TableHead>
                  <TableHead className="font-bold text-[#009689] text-xs sm:text-sm hidden lg:table-cell">
                    Email
                  </TableHead>
                  <TableHead className="font-bold text-[#009689] text-xs sm:text-sm hidden md:table-cell">
                    Phone
                  </TableHead>
                  <TableHead className="font-bold text-[#009689] text-xs sm:text-sm hidden sm:table-cell">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-[#009689] text-xs sm:text-sm">
                    IsActive
                  </TableHead>
                  <TableHead className="text-center font-bold text-[#009689] text-xs sm:text-sm">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-slate-500 text-sm"
                    >
                      No agents found
                    </TableCell>
                  </TableRow>
                ) : (
                  agents.map((agent: Agent) => (
                    <TableRow
                      key={agent._id}
                      className="border-b border-slate-100 hover:bg-[#009689]/5 transition-colors"
                    >
                      <TableCell className="py-3 sm:py-4">
                        <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#009689] text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                            {agent.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="truncate max-w-[80px] sm:max-w-none">{agent.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell py-3 sm:py-4">
                        <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689] flex-shrink-0" />
                          <span className="truncate max-w-[150px]">{agent.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell py-3 sm:py-4">
                        <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689] flex-shrink-0" />
                          {agent.phone}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell py-3 sm:py-4">
                        <Badge
                          className={`${getStatusBadgeVariant(
                            agent.agentInfo.approvalStatus
                          )} text-white font-semibold text-xs`}
                        >
                          {agent.agentInfo.approvalStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 sm:py-4">
                        <Badge
                          className={`${getUserActiveVariant(
                            agent.isActive
                          )} text-white font-semibold text-xs`}
                        >
                          <span className="hidden sm:inline">{agent.isActive}</span>
                          <span className="sm:hidden">
                            {agent.isActive === IsActiveValues.ACTIVE ? "Active" :
                             agent.isActive === IsActiveValues.INACTIVE ? "Inactive" :
                             agent.isActive === IsActiveValues.BLOCKED ? "Block" : "Susp"}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 sm:py-4">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleChangeStatus(
                                agent._id,
                                IsActiveValues.ACTIVE
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white h-8 w-8 p-0"
                            title="Activate User"
                            disabled={agent.isActive === IsActiveValues.ACTIVE}
                          >
                            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleChangeStatus(
                                agent._id,
                                IsActiveValues.INACTIVE
                              )
                            }
                            className="bg-yellow-600 hover:bg-yellow-700 text-white h-8 w-8 p-0"
                            title="Deactivate User"
                            disabled={
                              agent.isActive === IsActiveValues.INACTIVE
                            }
                          >
                            <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleChangeStatus(
                                agent._id,
                                IsActiveValues.BLOCKED
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 p-0"
                            title="Block User"
                            disabled={agent.isActive === IsActiveValues.BLOCKED}
                          >
                            <Ban className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(agent)}
                            className="border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white h-8 w-8 p-0"
                            title="View Details"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Agent Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-black text-[#009689] flex items-center gap-2">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              Agent Details
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Complete information about the agent
            </DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-4 sm:space-y-6 py-4">
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-[#009689]/5 to-[#ffd8af]/5 p-4 sm:p-6 rounded-xl border-2 border-[#009689]/20">
                <h3 className="text-base sm:text-lg font-bold text-[#009689] mb-3 sm:mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-semibold text-slate-600 block">
                      Full Name
                    </label>
                    <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {selectedAgent.name}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-semibold text-slate-600 block">
                      Phone
                    </label>
                    <p className="text-sm sm:text-base font-medium text-slate-900 flex items-center gap-2 truncate">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689] flex-shrink-0" />
                      <span className="truncate">{selectedAgent.phone}</span>
                    </p>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-600 block">
                      Email
                    </label>
                    <p className="text-sm sm:text-base font-medium text-slate-900 flex items-center gap-2 truncate">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689] flex-shrink-0" />
                      <span className="truncate">{selectedAgent.email}</span>
                    </p>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-600 block">
                      National ID (NID)
                    </label>
                    <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {selectedAgent.nid}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agent Information */}
              <div className="bg-gradient-to-br from-[#ffd8af]/10 to-[#009689]/5 p-4 sm:p-6 rounded-xl border-2 border-[#ffd8af]/50">
                <h3 className="text-base sm:text-lg font-bold text-[#009689] mb-3 sm:mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  Agent Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-600">
                      TIN ID
                    </label>
                    <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {selectedAgent.agentInfo?.tinId || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-600">
                      Approval Status
                    </label>
                    <div className="mt-1">
                      <Badge
                        className={`${getStatusBadgeVariant(
                          selectedAgent.agentInfo.approvalStatus
                        )} text-white font-bold text-xs`}
                      >
                        {selectedAgent.agentInfo.approvalStatus}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-600">
                      Commission Rate
                    </label>
                    <p className="text-sm sm:text-base font-bold text-[#009689]">
                      {selectedAgent.agentInfo?.commissionRate || 0}%
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold text-slate-600">
                      Total Commission
                    </label>
                    <p className="text-sm sm:text-base font-bold text-[#009689]">
                      ৳{selectedAgent.agentInfo?.totalCommission || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Date */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                <span className="font-semibold">Registered on:</span>
                <span className="truncate">{formatDate(selectedAgent.createdAt)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                <Button
                  onClick={() => {
                    handleChangeStatus(
                      selectedAgent._id,
                      IsActiveValues.ACTIVE
                    );
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-sm"
                  disabled={selectedAgent.isActive === IsActiveValues.ACTIVE}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Activate
                </Button>
                <Button
                  onClick={() => {
                    handleChangeStatus(
                      selectedAgent._id,
                      IsActiveValues.INACTIVE
                    );
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-sm"
                  disabled={selectedAgent.isActive === IsActiveValues.INACTIVE}
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Deactivate
                </Button>
                <Button
                  onClick={() => {
                    handleChangeStatus(
                      selectedAgent._id,
                      IsActiveValues.BLOCKED
                    );
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-sm"
                  disabled={selectedAgent.isActive === IsActiveValues.BLOCKED}
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Block
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllAgents;