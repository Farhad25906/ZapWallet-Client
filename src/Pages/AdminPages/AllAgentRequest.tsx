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
  CheckCircle,
  Trash2,
  Eye,
  Mail,
  Phone,
  User,
  CreditCard,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import ZapWalletLoader from "@/utils/ZapWalletLoader";
import type { Agent, PendingAgentsResponse } from "@/types";
import { ApprovalStatusValues } from "@/types/agent.types";
import { useApproveAgentMutation, usePendingAgentsQuery } from "@/redux/features/user/user.api";
import type { ApprovalStatus } from "@/types/user.type";

const AllAgentRequest = () => {
  const { data, isLoading } = usePendingAgentsQuery(undefined);
  const [approveAgent] = useApproveAgentMutation();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleApprove = async (agentId: string, agentName: string) => {
    try {
      // console.log(agentId, ApprovalStatusValues.APPROVED);
      const data = {
        agentId,
        approvalStatus: ApprovalStatusValues.APPROVED,
      };

      const res = await approveAgent(data).unwrap();
      console.log("Agent Updated successfully:", res);

      toast.success(`Agent ${agentName} approved successfully!`);
    } catch (error) {
      console.error("Failed to approve agent:", error);
      toast.error(`Failed to approve agent ${agentName}`);
    }
  };

  const handleReject = async (agentId: string, agentName: string) => {
    try {
      await approveAgent({
        agentId,
        approvalStatus: ApprovalStatusValues.REJECTED,
      }).unwrap();

      toast.success(`Agent ${agentName} rejected successfully!`);
    } catch (error) {
      console.error("Failed to reject agent:", error);
      toast.error(`Failed to reject agent ${agentName}`);
    }
  };

  const handleView = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsViewModalOpen(true);
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

  const getStatusBadgeVariant = (status: ApprovalStatus) => {
    switch (status) {
      case ApprovalStatusValues.PENDING:
        return "bg-yellow-500 hover:bg-yellow-600";
      case ApprovalStatusValues.APPROVED:
        return "bg-green-500 hover:bg-green-600";
      case ApprovalStatusValues.REJECTED:
        return "bg-red-500 hover:bg-red-600";
      case ApprovalStatusValues.SUSPENDED:
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (isLoading) return <ZapWalletLoader />;

  // Type-safe data handling
  const agents: Agent[] = (data as PendingAgentsResponse)?.data || [];

  return (
    <div className="p-6">
      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
          <CardTitle className="text-2xl font-black text-[#009689] flex items-center gap-2">
            <User className="w-6 h-6" />
            All Agents
          </CardTitle>
          <p className="text-slate-600 text-sm">
            Manage All Agents
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b-2 border-slate-200 hover:bg-slate-50">
                  <TableHead className="font-bold text-[#009689]">
                    Name
                  </TableHead>
                  <TableHead className="font-bold text-[#009689]">
                    Email
                  </TableHead>
                  <TableHead className="font-bold text-[#009689]">
                    Phone
                  </TableHead>
                  <TableHead className="font-bold text-[#009689]">
                    Status
                  </TableHead>
                  <TableHead className="text-center font-bold text-[#009689]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-500"
                    >
                      No pending agent requests
                    </TableCell>
                  </TableRow>
                ) : (
                  agents.map((agent: Agent) => (
                    <TableRow
                      key={agent._id}
                      className="border-b border-slate-100 hover:bg-[#009689]/5 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2 font-semibold">
                          <div className="w-8 h-8 rounded-full bg-[#009689] text-white flex items-center justify-center font-bold text-sm">
                            {agent.name.charAt(0).toUpperCase()}
                          </div>
                          {agent.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4 text-[#009689]" />
                          {agent.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4 text-[#009689]" />
                          {agent.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusBadgeVariant(
                            agent.agentInfo.approvalStatus
                          )} text-white font-semibold`}
                        >
                          {agent.agentInfo.approvalStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(agent._id, agent.name)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(agent)}
                            className="border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(agent._id, agent.name)}
                            className="bg-red-600 text-white hover:bg-[#009689] hover:text-white"
                          >
                            <Trash2 className="w-4 h-4 " />
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#009689] flex items-center gap-2">
              <User className="w-6 h-6" />
              Agent Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the agent application
            </DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-6 py-4">
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-[#009689]/5 to-[#ffd8af]/5 p-6 rounded-xl border-2 border-[#009689]/20">
                <h3 className="text-lg font-bold text-[#009689] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Full Name
                    </label>
                    <p className="text-base font-bold text-slate-900">
                      {selectedAgent.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Email
                    </label>
                    <p className="text-base font-medium text-slate-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#009689]" />
                      {selectedAgent.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Phone
                    </label>
                    <p className="text-base font-medium text-slate-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#009689]" />
                      {selectedAgent.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      National ID (NID)
                    </label>
                    <p className="text-base font-bold text-slate-900">
                      {selectedAgent.nid}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agent Information */}
              <div className="bg-gradient-to-br from-[#ffd8af]/10 to-[#009689]/5 p-6 rounded-xl border-2 border-[#ffd8af]/50">
                <h3 className="text-lg font-bold text-[#009689] mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Agent Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      TIN ID
                    </label>
                    <p className="text-base font-bold text-slate-900">
                      {selectedAgent.agentInfo.tinId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Approval Status
                    </label>
                    <div className="mt-1">
                      <Badge
                        className={`${getStatusBadgeVariant(
                          selectedAgent.agentInfo.approvalStatus
                        )} text-white font-bold`}
                      >
                        {selectedAgent.agentInfo.approvalStatus}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Commission Rate
                    </label>
                    <p className="text-base font-bold text-[#009689]">
                      {selectedAgent.agentInfo.commissionRate}%
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Total Commission
                    </label>
                    <p className="text-base font-bold text-[#009689]">
                      ৳{selectedAgent.agentInfo.totalCommission}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Date */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-[#009689]" />
                <span className="font-semibold">Registered on:</span>
                <span>{formatDate(selectedAgent.createdAt)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    handleApprove(selectedAgent._id, selectedAgent.name);
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Agent
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleReject(selectedAgent._id, selectedAgent.name);
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 font-bold"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllAgentRequest;
