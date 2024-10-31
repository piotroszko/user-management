import { useUserQuery } from "@/api/query/useUserQuery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    query: { data, isLoading },
  } = useUserQuery(parseInt(id || ""));

  const getLoadingSkeletonIfLoading = (children: ReactNode) => {
    return isLoading ? <Skeleton className="h-8 w-4/5 mx-auto" /> : children;
  };
  return (
    <div className="h-screen">
      <div className="flex-row p-8 flex w-full justify-center gap-2">
        <Button
          variant={"secondary"}
          onClick={() => {
            navigate("/");
          }}>
          <MoveLeft />
        </Button>
        <Card className="w-[350px]">
          <CardHeader className="text-center">
            <CardTitle>Szczegóły użytkownika</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 gap-2">
                {getLoadingSkeletonIfLoading(
                  <>
                    <Label htmlFor="name">Nazwa</Label>
                    <Input id="name" disabled value={data?.data.name}></Input>
                  </>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 gap-2">
                {getLoadingSkeletonIfLoading(
                  <>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" disabled value={data?.data.email}></Input>
                  </>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 gap-2">
                {getLoadingSkeletonIfLoading(
                  <>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" disabled value={data?.data.phone}></Input>
                  </>
                )}
              </div>
              <div className="flex flex-col space-y-1.5 gap-2">
                {getLoadingSkeletonIfLoading(
                  <>
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      disabled
                      value={data?.data.address}></Input>
                  </>
                )}
              </div>
              <div className="flex flex-col space-y-1.5 gap-2">
                {getLoadingSkeletonIfLoading(
                  <>
                    <Label htmlFor="createdDate">Data utworzenia</Label>
                    <Input
                      id="createdDate"
                      disabled
                      value={new Date(
                        data?.data.createdDate || ""
                      ).toLocaleDateString()}></Input>{" "}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
