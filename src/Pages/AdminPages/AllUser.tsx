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
  Calendar,
  Play,
  Pause,
  Ban,
} from "lucide-react";
import { toast } from "sonner";
import ZapWalletLoader from "@/utils/ZapWalletLoader";
import { IsActiveValues, type IsActive, type TRole } from "@/types";
import {
  useAllUsersQuery,
  useChangeActivityStatusMutation,
} from "@/redux/features/user/user.api";
import type { IUser } from "@/types/user.type";

const AllUser = () => {
  const { data, isLoading } = useAllUsersQuery(undefined);
  const [changeActivityStatus] = useChangeActivityStatusMutation();

  // console.log(data);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleView = (user: IUser) => {
    setSelectedUser(user);
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

  const getRoleBadgeVariant = (role: TRole) => {
    switch (role) {
      case "USER":
        return "bg-blue-500 hover:bg-blue-600";
      case "AGENT":
        return "bg-purple-500 hover:bg-purple-600";
      case "ADMIN":
        return "bg-orange-500 hover:bg-orange-600";
      case "SUPER_ADMIN":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (isLoading) return <ZapWalletLoader />;

  const users: IUser[] = data?.data || [];

  return (
    <div className="p-6">
      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
          <CardTitle className="text-2xl font-black text-[#009689] flex items-center gap-2">
            <User className="w-6 h-6" />
            All Users
          </CardTitle>
          <p className="text-slate-600 text-sm">Manage All Users</p>
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
                    Role
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
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-slate-500"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user: IUser) => (
                    <TableRow
                      key={user._id}
                      className="border-b border-slate-100 hover:bg-[#009689]/5 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2 font-semibold">
                          <div className="w-8 h-8 rounded-full bg-[#009689] text-white flex items-center justify-center font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4 text-[#009689]" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4 text-[#009689]" />
                          {user.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getRoleBadgeVariant(
                            user.role
                          )} text-white font-semibold`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getUserActiveVariant(
                            user.isActive
                          )} text-white font-semibold`}
                        >
                          {user.isActive}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleChangeStatus(
                                user._id,
                                IsActiveValues.ACTIVE
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white"
                            title="Activate User"
                            disabled={user.isActive === IsActiveValues.ACTIVE}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleChangeStatus(
                                user._id,
                                IsActiveValues.INACTIVE
                              )
                            }
                            className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            title="Deactivate User"
                            disabled={user.isActive === IsActiveValues.INACTIVE}
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleChangeStatus(
                                user._id,
                                IsActiveValues.BLOCKED
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white"
                            title="Block User"
                            disabled={user.isActive === IsActiveValues.BLOCKED}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(user)}
                            className="border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
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

      {/* View User Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#009689] flex items-center gap-2">
              <User className="w-6 h-6" />
              User Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the user
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
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
                      {selectedUser.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Email
                    </label>
                    <p className="text-base font-medium text-slate-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#009689]" />
                      {selectedUser.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Phone
                    </label>
                    <p className="text-base font-medium text-slate-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#009689]" />
                      {selectedUser.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      National ID (NID)
                    </label>
                    <p className="text-base font-bold text-slate-900">
                      {selectedUser.nid}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Role
                    </label>
                    <Badge
                      className={`${getRoleBadgeVariant(
                        selectedUser.role
                      )} text-white font-bold mt-1`}
                    >
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Status
                    </label>
                    <Badge
                      className={`${getUserActiveVariant(
                        selectedUser.isActive
                      )} text-white font-bold mt-1`}
                    >
                      {selectedUser.isActive}
                    </Badge>
                  </div>
                  {selectedUser.address && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Address
                      </label>
                      <p className="text-base font-medium text-slate-900">
                        {selectedUser.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Registration Date */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-[#009689]" />
                <span className="font-semibold">Registered on:</span>
                <span>{formatDate(selectedUser.createdAt)}</span>
              </div>

              {/* Status Management Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    handleChangeStatus(selectedUser._id, IsActiveValues.ACTIVE);
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                  disabled={selectedUser.isActive === IsActiveValues.ACTIVE}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Activate
                </Button>
                <Button
                  onClick={() => {
                    handleChangeStatus(
                      selectedUser._id,
                      IsActiveValues.INACTIVE
                    );
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold"
                  disabled={selectedUser.isActive === IsActiveValues.INACTIVE}
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Deactivate
                </Button>
                <Button
                  onClick={() => {
                    handleChangeStatus(
                      selectedUser._id,
                      IsActiveValues.BLOCKED
                    );
                    setIsViewModalOpen(false);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold"
                  disabled={selectedUser.isActive === IsActiveValues.BLOCKED}
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

export default AllUser;
